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
    
    // Fetch all users
    const allUsers = await users.find({}).toArray();
    // Map to leaderboard format: sum TimeTaken from lvl1, lvl2, lvl3
    const leaderboard = allUsers.map(user => {
      const lvl1Time = user.lvl1?.TimeTaken || 0;
      const lvl2Time = user.lvl2?.TimeTaken || 0;
      const lvl3Time = user.lvl3?.TimeTaken || 0;
      const totalTime = lvl1Time + lvl2Time + lvl3Time;
      return {
        ...user,
        TimeTaken: totalTime > 0 ? totalTime : null // null if not played any level
      };
    })
    // Only include users who have played at least one level
    .filter(u => u.TimeTaken !== null)
    // Sort by total TimeTaken ascending
    .sort((a, b) => a.TimeTaken - b.TimeTaken);
    await client.close();
    return NextResponse.json({ success: true, data: leaderboard, total: leaderboard.length });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
