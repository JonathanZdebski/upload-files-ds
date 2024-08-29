// src/app/api/auth-status/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@/auth'; // Ajuste o caminho conforme necessário
import { MongoClient } from 'mongodb';

const MONGO_URI = process.env.MONGODB_URI!;

if (!MONGO_URI) {
  throw new Error("A variável de ambiente MONGODB_URI não está definida.");
}

async function fetchUserData(email: string) {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  const db = client.db("UsersAuthenticated");
  const user = await db.collection("users").findOne({ email });
  await client.close(); // Fechar a conexão com o banco de dados
  return user;
}

export async function GET() {
  try {
    const session = await auth();
    
    if (session && typeof session.user?.email === 'string') {
      const user = await fetchUserData(session.user.email);
      return NextResponse.json({ hasPaid: user?.hasPaid ?? false });
    }

    return NextResponse.json({ hasPaid: false }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
