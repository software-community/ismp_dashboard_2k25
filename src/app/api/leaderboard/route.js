import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'ismp_dashboard';

export async function GET() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);
    const users = db.collection('users');
    
    const data = await users.find({ TimeTaken: { $exists: true } }).sort({ TimeTaken: 1 }).toArray();
    await client.close();
    return NextResponse.json({ success: true, data, total: data.length });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
