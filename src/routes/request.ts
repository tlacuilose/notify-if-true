import type { RequestHandler } from '@sveltejs/kit';

interface Comparison {
	op: string;
	val: string;
}

const AVAILABLE_OP = new Set(['>', '<', '>=', '<=', '=', '!=']);

// GET /request
export const post: RequestHandler<null, FormData> = async (request) => {
	const endpoint = request.body.get('endpoint');

	const response = await fetch(endpoint, {
		method: 'get',
		headers: {
			'content-type': 'application/json'
		}
	});

	if (!response.ok) {
		return {
			status: 400,
			body: endpoint
		};
	}

	const json = await response.json();
    const comparisons = request.body.get('validated_fields').split(',').slice(0,-1);
	let allTrue = runComparisons(comparisons, json);

	if (!allTrue) {
		return {
			status: 400,
			body: 'failed'
		};
	}

	return {
		status: 200,
		body: {
			transaction_id: 'SUCCESSFULL_COMPARISON'
		}
	};
};

function runComparisons(comparisons: string[], obj: any): boolean {
    for (const c of comparisons) {
        const elems = c.split('|');
        const res = evalComparison(elems[0], elems[1], obj);
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
            return realValue > comparison.val;
            break;
        case '<':
            return realValue < comparison.val;
            break;
        case '>=':
            return realValue >= comparison.val;
            break;
        case '<=':
            return realValue <= comparison.val;
            break;
        case '=':
            console.log('thisone');
            return realValue == comparison.val;
            break;
        case '!=':
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
