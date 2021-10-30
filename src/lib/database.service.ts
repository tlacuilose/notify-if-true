import * as mongoDB from "mongodb";

export const collections: { transactions?: mongoDB.Collection } = {}

export async function connectToDataBase() {
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(import.meta.env.VITE_DB_CONN_STRING);
    await client.connect();

    const db: mongoDB.Db = client.db(import.meta.env.VITE_DB_NAME);

    const transactionsColl: mongoDB.Collection = db.collection(import.meta.env.VITE_TRANSACTIONS_COLLECTION_NAME);

    collections.transactions = transactionsColl;
    
    console.log('Connected to mongodb');
}