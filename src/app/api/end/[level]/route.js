import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'ismp_dashboard';
const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

export async function POST(request, { params }) {
  try {
    const { level } = params;
    if (!level) {
      return NextResponse.json({ error: 'Level not specified' }, { status: 400 });
    }
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
    // Find user
    const user = await users.findOne({ entryNumber });
    if (!user) {
      await client.close();
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    // Get lvl{level}.startTime
    const lvlKey = `lvl${level}`;
    const startTime = user[lvlKey]?.startTime;
    if (!startTime) {
      await client.close();
      return NextResponse.json({ error: `Level ${level} start time not set` }, { status: 400 });
    }
    const endTime = Date.now();
    const TimeTaken = endTime - startTime;
    // Update lvl{level} in DB
    await users.updateOne(
      { entryNumber },
      { $set: { [`${lvlKey}.endTime`]: endTime, [`${lvlKey}.TimeTaken`]: TimeTaken, [`${lvlKey}.complete`]: true } }
    );
    await client.close();
    return NextResponse.json({ success: true, [lvlKey]: { startTime, endTime, TimeTaken, complete: true } });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 