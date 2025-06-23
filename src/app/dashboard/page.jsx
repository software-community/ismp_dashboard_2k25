"use client";
import Image from "next/image";
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { useRef, useState } from 'react';
import { useScrollAnimation } from '../components/useScrollAnimation';
import Footer from '../components/Footer';

export default function Dashboard() {
  // Animation states for each section
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const ref1 = useScrollAnimation(() => setShow1(true));
  const ref2 = useScrollAnimation(() => setShow2(true));
  const ref3 = useScrollAnimation(() => setShow3(true));

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen relative">
      {/* Level 1 Section */}
      <div
        ref={ref1}
        className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center relative"
        style={{ backgroundImage: "url('/lvl1.PNG')" }}
      >
        <div className="absolute inset-0 bg-black/40 z-0" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg text-center">
            Frontend Forest
          </h1>
          <p className="text-lg md:text-2xl text-white mb-8 max-w-2xl text-center drop-shadow">
            <Typewriter
              words={["Venture into the mysterious forest, where every step brings new challenges and hidden secrets. Prepare yourself for an immersive experience as you navigate through the dense trees and uncover the wonders of Level 1. Are you ready to begin your journey?"]}
              loop={2}
              cursor
              typeSpeed={50}
              deleteSpeed={150}
              delaySpeed={10000}
            />
          </p>
          <a
            href="/webGL builds/lvl2/index.html"
            target="_blank"
            className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white text-xl font-semibold rounded-full shadow-lg transition-all duration-300 flex items-center justify-center relative overflow-hidden"
          >
            <span className="z-10 relative">Enter the Forest</span>
            {/* Liquid fill effect */}
            <span className="absolute left-0 top-0 w-full h-full bg-green-400 opacity-30 animate-liquidFill" style={{ zIndex: 1 }} />
          </a>
        </div>
      </div>
      {/* Level 2 Section */}
      <div
        ref={ref2}
        className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center relative"
        style={{ backgroundImage: "url('/lvl2.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40 z-0" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg text-center">
            FIREWALL
          </h2>
          <p className="text-lg md:text-2xl text-white mb-8 max-w-2xl text-center drop-shadow">
            <Typewriter
              words={["Cross the Mystic River, where the currents test your skills and wit. Each ripple hides a new puzzle, and only the brave will reach the other side. Will you conquer the river's secrets?"]}
              loop={1}
              cursor
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </p>
          <a
            href="/webGL builds/lvl2/index.html"
            target="_blank"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold rounded-full shadow-lg transition-all duration-300 flex items-center justify-center relative overflow-hidden"
          >
            <span className="z-10 relative">cybersec</span>
            <span className="absolute left-0 top-0 w-full h-full bg-blue-400 opacity-30 animate-liquidFill" style={{ zIndex: 1 }} />
          </a>
        </div>
      </div>
      {/* Level 3 Section */}
      <div
        ref={ref3}
        className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center relative"
        style={{ backgroundImage: "url('/lvl3.PNG')" }}
      >
        <div className="absolute inset-0 bg-black/40 z-0" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg text-center">
            BLOCKCHAIN
          </h2>
          <p className="text-lg md:text-2xl text-white mb-8 max-w-2xl text-center drop-shadow">
            <Typewriter
              words={["Ascend to the Ancient Canopy, where the tallest trees guard the final mysteries. Only the most determined explorers will unveil the secrets hidden above. Are you ready for the ultimate challenge?"]}
              loop={1}
              cursor
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </p>
          <a
            href="/webGL builds/lvl3/index.html"
            target="_blank"
            className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white text-xl font-semibold rounded-full shadow-lg transition-all duration-300 flex items-center justify-center relative overflow-hidden"
          >
            <span className="z-10 relative">level 3</span>
            <span className="absolute left-0 top-0 w-full h-full bg-purple-400 opacity-30 animate-liquidFill" style={{ zIndex: 1 }} />
          </a>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
