import { collections, connectToDataBase } from '$lib/database.service';
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

// GET /request
export const post: RequestHandler<null, FormData> = async (request) => {
	const endpoint = request.body.get('endpoint');
    const validatedFields = request.body.get('validated_fields');
	const email = request.body.get('email');

    await connectToDataBase()
	try {
		const newTransaction = new Transaction(endpoint, validatedFields, email);
		const result = await collections.transactions.insertOne(newTransaction);

		if (result) {
			return { status: 200, body:{ transaction_id: result.insertedId}}
		} else {
			return { status: 400, body: 'a'};
		}
	} catch(error) {
		console.error(error);
		return { status: 400, body: 'a'};
	}
};