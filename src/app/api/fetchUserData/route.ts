import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (typeof email !== 'string') {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  try {
    const user = await fetchUserData(email);
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
