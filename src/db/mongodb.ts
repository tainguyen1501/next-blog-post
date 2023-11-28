import { MongoClient } from "mongodb";

const options = {};
let client;
let clientPromise : any;

if (!process.env.NEXT_PUBLIC_MONGODB_URI)
  throw new Error("Please add your Mongo URI to .env");

client = new MongoClient(process.env.NEXT_PUBLIC_MONGODB_URI, options);
clientPromise = client.connect();
export default clientPromise;