import mongoose from "mongoose";
import app from "../server/src/app.js";

let isConnected = false;

async function connectDb() {
  if (isConnected) return;

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI environment variable is not set");

  await mongoose.connect(uri);
  isConnected = true;
}

export default async function handler(req: any, res: any) {
  await connectDb();
  return app(req, res);
}
