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
    // Map to leaderboard format: sum TimeTaken from lvl1, lvl2, lvl3 and count levels completed
    const leaderboard = allUsers.map(user => {
      const lvl1Time = user.lvl1?.TimeTaken || 0;
      const lvl2Time = user.lvl2?.TimeTaken || 0;
      const lvl3Time = user.lvl3?.TimeTaken || 0;
      const totalTime = lvl1Time + lvl2Time + lvl3Time;
      // Count completed levels
      const levelsCompleted = [user.lvl1?.complete, user.lvl2?.complete, user.lvl3?.complete].filter(Boolean).length;
      return {
        ...user,
        TimeTaken: totalTime > 0 ? totalTime : null, // null if not played any level
        levelsCompleted
      };
    })
    // Only include users who have played at least one level
    .filter(u => u.TimeTaken !== null)
    // Sort: first by levelsCompleted (desc), then by TimeTaken (asc)
    .sort((a, b) => {
      if (b.levelsCompleted !== a.levelsCompleted) {
        return b.levelsCompleted - a.levelsCompleted;
      }
      return a.TimeTaken - b.TimeTaken;
    });
    await client.close();
    return NextResponse.json({ success: true, data: leaderboard, total: leaderboard.length });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
