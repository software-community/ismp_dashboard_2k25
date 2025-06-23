'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/api/me');
        const json = await res.json();
        if (json.user && json.user.name) {
          setUserName(json.user.name);
        } else {
          setUserName(null);
        }
      } catch {
        setUserName(null);
      }
    }
    fetchUser();
  }, []);

  return (
    <nav className="w-full px-6 py-4 bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="neumorphic-logo-container">
            <Image
              src="/logo.png"
              alt="Logo"
              width={50}
              height={50}
              className="rounded-lg"
            />
          </div>
          <h1 className="text-xl font-bold text-gray-800"></h1>
        </div>

        {/* User Name Section */}
        {userName && (
          <div className="text-lg font-semibold text-gray-700 mr-4">
            {userName}
          </div>
        )}

        {/* Leaderboard Section */}
        <div className="relative">
          <Link href="/leaderboard">
            <button className="neumorphic-button flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95">
              <span className="text-2xl">🏆</span>
              <span className="font-semibold text-gray-700">Leaderboard</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Neumorphic Styles */}
      <style jsx>{`
        .neumorphic-logo-container {
          background: linear-gradient(145deg, #e6e6e6, #ffffff);
          border-radius: 12px;
          padding: 8px;
          box-shadow: 
            8px 8px 16px #d1d1d1,
            -8px -8px 16px #ffffff;
        }

        .neumorphic-button {
          background: linear-gradient(145deg, #e6e6e6, #ffffff);
          box-shadow: 
            8px 8px 16px #d1d1d1,
            -8px -8px 16px #ffffff;
          border: none;
          color: #4a5568;
          cursor: pointer;
        }

        .neumorphic-button:hover {
          box-shadow: 
            4px 4px 8px #d1d1d1,
            -4px -4px 8px #ffffff;
        }

        .neumorphic-button:active {
          box-shadow: 
            inset 4px 4px 8px #d1d1d1,
            inset -4px -4px 8px #ffffff;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;