"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { useRef, useState } from "react";
import { useScrollAnimation } from "../components/useScrollAnimation";
import Footer from "../components/Footer";

export default function Dashboard() {
  // Animation states for each section
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const ref1 = useScrollAnimation(() => setShow1(true));
  const ref2 = useScrollAnimation(() => setShow2(true));
  const ref3 = useScrollAnimation(() => setShow3(true));

  const handleLvl1Click = async () => {
    try {
      await fetch("/api/start/1", { method: "POST" });
    } catch (e) {
      // Optionally handle error
    }
    window.open("/webGL builds/lvl1/index.html", "_blank");
  };
  const handleLvl2Click = async () => {
    try {
      await fetch("/api/start/2", { method: "POST" });
    } catch (e) {
      // Optionally handle error
    }
    window.open("/webGL builds/lvl2/index.html", "_blank");
  };
  const handleLvl3Click = async () => {
    try {
      await fetch("/api/start/3", { method: "POST" });
    } catch (e) {
      // Optionally handle error
    }
    window.open("/webGL builds/lvl3/index.html", "_blank");
  };

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
            🌲 Welcome to Frontend Forest!🌲
          </h1>
          {/* LEVEL 1 DESCRIPTION */}
          <div className="text-lg md:text-2xl text-white mb-8 max-w-2xl drop-shadow ">
            <p className="mb-4" style={{ whiteSpace: 'pre-line' }}>
              <Typewriter
                words={[
                  "You are a young coder on a journey through a mysterious forest where code grows wild and spike traps are everywhere. In Frontend Forest, your goal is to find and collect broken HTML tags and move forward. Spikes are everywhere, so move carefully! \n 🧠 Think smart. \n 🦶 Jump fast. \n💻 Fix the forest.",
                ]}
                loop={1}
                typeSpeed={50}
                deleteSpeed={150}
                delaySpeed={10}
              />
              </p>
          </div>

          <button
            onClick={handleLvl1Click}
            href="/webGL builds/lvl1/index.html"
            target="_blank"
            className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white text-xl font-semibold rounded-full shadow-lg transition-all duration-300 flex items-center justify-center relative overflow-hidden"
          >
            <span className="z-10 relative">Enter the Forest</span>
            {/* Liquid fill effect */}
            <span
              className="absolute left-0 top-0 w-full h-full bg-green-400 opacity-30 animate-liquidFill"
              style={{ zIndex: 1 }}
            />
          </button>
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
            🧱 Welcome to Firewall Fortress! 🔥
          </h2>
          <p className="text-lg md:text-2xl text-white mb-8 max-w-2xl drop-shadow" style={{ whiteSpace: 'pre-line' }}>
            <Typewriter
              words={["The system is under attack and only you can save it. Your mission: infiltrate the firewall, neutralize the threats, and unlock the system.\n\n 🦠 Evade the Enemies\n Jump past rogue viruses and dodge malware-infested platforms as you navigate the collapsing codebase. \n\n 🛑 Decode the Firewall \n At the final gate, you’ll face a Caesar cipher challenge. Crack the code using clues you’ve found—and unlock the core. \n\n 🧠 Think sharp.\n 🦶 Move fast. \n 🔐 Crack the code."
              ]}
              loop={1}
              cursor
              typeSpeed={50}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </p>
          <button
            onClick={handleLvl2Click}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold rounded-full shadow-lg transition-all duration-300 flex items-center justify-center relative overflow-hidden"
          >
            <span className="z-10 relative">Break the wall</span>
            <span
              className="absolute left-0 top-0 w-full h-full bg-blue-400 opacity-30 animate-liquidFill"
              style={{ zIndex: 1 }}
            />
          </button>
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
            🪨 Welcome to Crypto Caverns! 💰
          </h2>
          <p className="text-lg md:text-2xl text-white mb-8 max-w-2xl drop-shadow" style={{ whiteSpace: 'pre-line' }}>
            <Typewriter
              words={[" Deep underground lies a hidden cave filled with glowing crystals, fake dig sites, and ancient crypto blocks. In Crypto Caverns, you're a brave explorer mining for digital treasure in a mysterious maze of mines and clues.\n\n Mine Smart ⛏️ \n There are 10 crypto blocks hidden across the cavern—but not every mining spot is real! Use your eyes and your brain, hints scattered around the cave will help you spot the fakes and avoid wasting time!\n\n Complete the Blockchain 💸\n Once you've found all 10 blocks, it’s time to chain them together. Match each block’s prehash value to the hash value of the one before it. The first and last blocks are already locked in place—can you figure out the rest? \n💡 Use the hints.\n ⚡ Speed through the cave. \n 🔗 Complete the blockchain."
              ]}
              loop={1}
              cursor
              typeSpeed={50}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </p>
          <button
            onClick={handleLvl3Click}
            href="/webGL builds/lvl3/index.html"
            target="_blank"
            className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white text-xl font-semibold rounded-full shadow-lg transition-all duration-300 flex items-center justify-center relative overflow-hidden"
          >
            <span className="z-10 relative">Mine the Blocks</span>
            <span
              className="absolute left-0 top-0 w-full h-full bg-purple-400 opacity-30 animate-liquidFill"
              style={{ zIndex: 1 }}
            />
          </button>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
