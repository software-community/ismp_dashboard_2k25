'use client';

import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function LeaderboardPage() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [totalPlayers, setTotalPlayers] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      setLoading(true);
      try {
        const res = await fetch('/api/leaderboard');
        const json = await res.json();
        if (json.success) {
          setLeaderboardData(json.data);
          setTotalPlayers(json.total);
        }
      } catch (e) {
        // handle error
      }
      setLoading(false);
    }
    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen p-8 font-[family-name:var(--font-geist-sans)] relative pb-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/dashboard" className="inline-block mb-4">
            <button className="neumorphic-back-button px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 ">
              Back to Home
            </button>
          </Link>
          <div className="neumorphic-header rounded-3xl p-8">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <span className="text-4xl">🏆</span>
              <h1 className="text-4xl font-bold text-gray-800">Leaderboard</h1>
              <span className="text-4xl">🏆</span>
            </div>
            <p className="text-gray-600 text-lg">Top performers</p>
            <p className="text-gray-600 text-md mt-2">Total Players: {totalPlayers}</p>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="neumorphic-container rounded-3xl p-8">
          {loading ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : (
            <div className="space-y-4">
              {leaderboardData.length === 0 ? (
                <div className="text-center text-gray-500">No players found.</div>
              ) : (
                leaderboardData.map((player, index) => (
                  <div
                    key={player._id || player.entryNumber || index}
                    className={`neumorphic-player-card flex items-center justify-between p-6 rounded-2xl transition-all duration-200 hover:scale-105 ${
                      index === 0 ? 'border-2 border-yellow-400' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`text-2xl font-bold ${
                        index === 0 ? 'text-yellow-500' : 
                        index === 1 ? 'text-gray-400' : 
                        index === 2 ? 'text-amber-600' : 'text-gray-600'
                      }`}>
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index+1}`}
                      </div>
                      <div className="text-3xl">👤</div>
                      <div>
                        <div className="font-semibold text-gray-800 text-lg">{player.name || '-'}</div>
                        <div className="text-sm text-gray-600">{player.department || ''}</div>
                        <div className="text-xs text-gray-500">{player.entryNumber ?? 'N/A'}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-800">{player.TimeTaken ?? 'N/A'}</div>
                      <div className="text-sm text-gray-600">Time Taken</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>


      {/* Neumorphic Styles */}
      <style jsx>{`
        .neumorphic-back-button {
          background: linear-gradient(145deg, #e6e6e6, #ffffff);
          box-shadow: 
            8px 8px 16px #d1d1d1,
            -8px -8px 16px #ffffff;
          border: none;
          color: #4a5568;
          cursor: pointer;
          font-weight: 600;
        }

        .neumorphic-back-button:hover {
          box-shadow: 
            4px 4px 8px #d1d1d1,
            -4px -4px 8px #ffffff;
        }

        .neumorphic-back-button:active {
          box-shadow: 
            inset 4px 4px 8px #d1d1d1,
            inset -4px -4px 8px #ffffff;
        }

        .neumorphic-header {
          background: linear-gradient(145deg, #f0f0f0, #ffffff);
          box-shadow: 
            12px 12px 24px #d1d1d1,
            -12px -12px 24px #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .neumorphic-container {
          background: linear-gradient(145deg, #f0f0f0, #ffffff);
          box-shadow: 
            12px 12px 24px #d1d1d1,
            -12px -12px 24px #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .neumorphic-player-card {
          background: linear-gradient(145deg, #e6e6e6, #ffffff);
          box-shadow: 
            6px 6px 12px #d1d1d1,
            -6px -6px 12px #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .neumorphic-player-card:hover {
          box-shadow: 
            8px 8px 16px #d1d1d1,
            -8px -8px 16px #ffffff;
        }
      `}</style>
    </div>
  );
}