import { IBaseQueryModel } from "@/models/common";
import clientPromise from "./mongodb";
import { ObjectId } from "mongodb";
import utils from "@/utils/utils";

const repo = {
  getClient: async () => {
    let client = await clientPromise;
    return client.db(process.env.NEXT_PUBLIC_MONGODB_DATABASE_NAME);
    //   client.close() //todo check this
  },
  findOne: async (collectionName: string, id: string) => {
    const client = await repo.getClient();
    const collection = client.collection(collectionName);
    var query = { _id: new ObjectId(id) };
    return await collection.findOne(query);
  },
  find: async (collectionName: string, query: IBaseQueryModel) => {
    const client = await repo.getClient();
    const collection = client.collection(collectionName);
    let sort = {};
    if (query.sort && query.sort.by)
      sort = {
        [query.sort.by]: query.sort.desc ? -1 : 1,
      };

    return await collection
      .find(query.filter || {}, {
        limit: query.size,
        skip: (query.page || 0) * (query.size || 10),
      })
      .sort(sort)
      .toArray();
  },
  insert: async (collectionName: string, data: any) => {
    const client = await repo.getClient();
    const collection = client.collection(collectionName);

    let random = Math.floor(Math.random() * 5);
    if (random === 0) random = 1;
    //todo: check slug  existing ...
    data = {
      ...data,
      image: `/images/banner${random}.webp`,
      slug: utils.string.slugify(data.title),
    };
    return await collection.insertOne(data); //acknowledged, insertedId
  },
  update: async (collectionName: string, data: any) => {
    var query = { _id: new ObjectId(data.id) };
    const options = { upsert: true };
    const updateData = {
      $set: {
        title: data.title,
        content: data.content,
        shortContent: data.shortContent,
        metaTitle: data.metaTitle,
        metaKeywords: data.metaKeywords,
        metaDescription: data.metaDescription,
        image: data.image,
      },
    };
    const client = await repo.getClient();
    const collection = client.collection(collectionName);
    return await collection.updateOne(query, updateData, options);
  },
  delete: async (collectionName: string, id: string) => {
    const client = await repo.getClient();
    const collection = client.collection(collectionName);
    return await collection.deleteOne({ _id: new ObjectId(id) });
  },
};
export default repo;
