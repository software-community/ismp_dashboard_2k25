import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'ismp_dashboard';
const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

export async function POST(request) {
  try {
    // Get JWT from cookies
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    // Decode JWT
    const decoded = jwt.verify(token, JWT_SECRET);
    const entryNumber = decoded.entryNumber;
    if (!entryNumber) {
      return NextResponse.json({ error: 'Invalid user' }, { status: 400 });
    }
    // Connect to DB
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);
    const users = db.collection('users');
    // Set start2 to current timestamp
    const now = Date.now();
    await users.updateOne(
      { entryNumber },
      { $set: { start2: now } }
    );
    await client.close();
    return NextResponse.json({ success: true, start2: now });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 