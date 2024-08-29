// src/app/api/update-payment/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import { auth } from '@/auth'; // Ajuste o caminho conforme necessário

const MONGO_URI = process.env.MONGODB_URI!;

if (!MONGO_URI) {
  throw new Error("A variável de ambiente MONGODB_URI não está definida.");
}

async function updateUserPaymentStatus(email: string) {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  const db = client.db("UsersAuthenticated");
  const result = await db.collection("users").updateOne(
    { email },
    { $set: { hasPaid: true } }
  );
  await client.close();
  return result.modifiedCount > 0;
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (session && typeof session.user?.email === 'string') {
      const updated = await updateUserPaymentStatus(session.user.email);
      if (updated) {
        return NextResponse.json({ success: true });
      }
    }

    return NextResponse.json({ success: false }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
