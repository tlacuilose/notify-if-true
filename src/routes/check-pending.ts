import { collections, connectToDataBase } from '$lib/database.service';
import { sendMail } from '$lib/mailing.service';
import type { RequestHandler } from '@sveltejs/kit';
import type { ObjectId } from "mongodb";

interface Comparison {
	op: string;
	val: string;
}

class Transaction {
	constructor(public endpoint: string, public fields: string, public email: string, public id?: ObjectId) {}
}


const AVAILABLE_OP = new Set(['>', '<', '>=', '<=', '=', '!=']);

// GET /check-pending
export const get: RequestHandler<null> = async (request) => {

    connectToDataBase()
    .then(async () => {
        try {
            const transactions = (await collections.transactions.find({}).toArray()) as Transaction[];

            for (const transaction of transactions) {
                let resolved = await compareToAPI(transaction);
                if (resolved) {
                    await sendMail(transaction.email, transaction.endpoint, transaction.fields);
                    const query = { _id: transaction._id };
                    const result = await collections.transactions.deleteOne(query);
                }
            }

            return { status: 200, body: 'RAN COMPARISONS' }
        } catch(error) {
            console.error(error);
            return { status: 400, body: 'a'};
        }
    })
    .catch((error: Error) =>  {
        console.error("Database connection error", error);
        return { status: 400, body: 'a'};
    })
}

async function compareToAPI(transaction: Transaction): Promise<boolean> {
	const response = await fetch(transaction.endpoint, {
		method: 'get',
		headers: {
			'content-type': 'application/json'
		}
	});

	if (!response.ok) {
        return false;
	}

	const json = await response.json();
    const comparisons =  transaction.fields.split(',').slice(0,-1);
	let allTrue = runComparisons(comparisons, json);
    console.log('comparingapi' + comparisons + allTrue);

    return allTrue;
}

function runComparisons(comparisons: string[], obj: any): boolean {
    for (const c of comparisons) {
        const elems = c.split('|');
        const res = evalComparison(elems[0], elems[1], obj);
        console.log('comaring' + elems[0] + res);
        if (!res) {
            return false;
        }
    }
    return true;
}

function evalComparison(field: string, value: string, obj: any): boolean {
    let realValue = findValue(field, obj);
    const comparison =  extractComparison(value);
    console.log("Real Value: " + realValue);
    console.log("Comparison: " + comparison.op + ' to ' + comparison.val);
    switch (comparison.op) {
        case '>':
            console.log(realValue + '>' + comparison.val);
            return realValue > comparison.val;
            break;
        case '<':
            console.log(realValue + '<' + comparison.val);
            return realValue < comparison.val;
            break;
        case '>=':
            console.log(realValue + '>=' + comparison.val);
            return realValue >= comparison.val;
            break;
        case '<=':
            console.log(realValue + '<=' + comparison.val);
            return realValue <= comparison.val;
            break;
        case '=':
            console.log(realValue + '==' + comparison.val);
            return realValue == comparison.val;
            break;
        case '!=':
            console.log(realValue + '!=' + comparison.val);
            return realValue != comparison.val;
            break;
        default:
            return false;
    }
}

function findValue(squashedKey: string, obj: any): string {
	let first = squashedKey.split(':')[0];
	if (Array.isArray(obj)) {
		if (first[0] === '[') {
			let rest = squashedKey.split(/:(.+)/)[1];
			let i = first[1];
			return findValue(rest, obj[i]);
		}
		return null;
	} else if (typeof obj === 'object') {
		if (obj[first]) {
			let rest = squashedKey.split(/:(.+)/)[1];
			return findValue(rest, obj[first]);
		}
		return null;
	} else {
		return obj;
	}
}

function extractComparison(comparingValue: string): Comparison {
	let inparens = comparingValue.split(/[()]/);
	let op = inparens[0];
	let val = inparens[1];

	if (!op || !val || !AVAILABLE_OP.has(op)) {
		return null;
	}

	return {
		op: op,
		val: val
	};
}

