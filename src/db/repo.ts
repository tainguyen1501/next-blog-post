import clientPromise from "./mongodb"

const repo = {
    getClient: async () => {
        let client = await clientPromise
        return  client.db(process.env.NEXT_PUBLIC_MONGODB_DATABASE_NAME);
    },
    insertOne: async (collectionName: string, data: any) => {
        const client =  await repo.getClient()
        const collection = client.collection(collectionName);
        return await collection.insertOne(data);//acknowledged, insertedId
    }
}
export default repo