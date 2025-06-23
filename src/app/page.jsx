"use client";
import Image from "next/image";
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { useRef, useState } from 'react';
import { useScrollAnimation } from './components/useScrollAnimation';
import Form from './components/Form';
export default function Home() {
  return (
    <main className="w-full min-h-[75%] flex items-center justify-center">
      {/* <div className="h-[50%]"> */}

      <Form/>
      {/* </div> */}
      {/* <h1 className="text-4xl font-bold text-gray-800">Welcome to SoftCom!</h1> */}
    </main>
  );
}
