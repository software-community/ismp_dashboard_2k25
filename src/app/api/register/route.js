import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'ismp_dashboard';
const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

export async function POST(request) {
  try {
    const { name, entryNumber } = await request.json();
    if (!name || !entryNumber) {
      return NextResponse.json({ error: 'Name and entry number are required.' }, { status: 400 });
    }
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);
    const users = db.collection('users');
    // Check if user exists
    const existing = await users.findOne({ entryNumber });
    let user;
    if (existing) {
      // If name matches, sign in
      if (existing.name === name) {
        user = existing;
      } else {
        await client.close();
        return NextResponse.json({ error: 'Entry number already registered with a different name.' }, { status: 400 });
      }
    } else {
      // Register new user
      await users.insertOne({ name, entryNumber });
      user = { name, entryNumber };
    }
    await client.close();
    // Create JWT
    const token = jwt.sign({ name: user.name, entryNumber: user.entryNumber }, JWT_SECRET, { expiresIn: '7d' });
    // Set cookie
    const response = NextResponse.json({ success: true, user: { name: user.name, entryNumber: user.entryNumber } });
    response.cookies.set('token', token, { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 * 7 });
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
