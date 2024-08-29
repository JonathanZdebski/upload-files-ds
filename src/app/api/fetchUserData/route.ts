// src/pages/api/fetchUserData.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  throw new Error("A variável de ambiente MONGODB_URI não está definida.");
}

const fetchUserData = async (email: string) => {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  const db = client.db("UsersAuthenticated");
  const user = await db.collection("users").findOne({ email });
  return user;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.query;

  if (typeof email !== 'string') {
    return res.status(400).json({ error: 'Invalid email' });
  }

  try {
    const user = await fetchUserData(email);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
