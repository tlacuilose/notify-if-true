import { collections, connectToDataBase } from '$lib/database.service';
import type { RequestHandler } from '@sveltejs/kit';
import type { ObjectId } from "mongodb";

class Transaction {
	constructor(public endpoint: string, public fields: string, public email: string, public id?: ObjectId) {}
}

// GET /get-pending
export const get: RequestHandler<null> = async (request) => {
    await connectToDataBase()
    try {
        const transactions = (await collections.transactions.find({}).toArray()) as Transaction[];
        return { status: 200, body: { transactions } };
    } catch(error) {
        console.error(error);
        return { status: 400, body: 'a'};
    }
}