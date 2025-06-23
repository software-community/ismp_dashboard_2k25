"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Form() {
  const [name, setName] = useState("");
  const [entryNumber, setEntryNumber] = useState("");
  const [status, setStatus] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, entryNumber }),
    });
    const data = await res.json();
    if (data.success) {
      setStatus("Registration successful!");
      setName("");
      setEntryNumber("");
      if (typeof window !== 'undefined') {
        localStorage.setItem('userName', name);
      }
      router.push("/dashboard");
    } else {
      setStatus(data.error || "Registration failed.");
    }
  };

  return (
    <div className="w-[85vw] min-h-[79.7vh] flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center max-w-md mx-auto p-16 bg-white rounded-xl shadow-md flex-col gap-6 text-black"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-black">
          Register for the Session{" "}
        </h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          placeholder="Entry Number"
          value={entryNumber}
          onChange={(e) => setEntryNumber(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Register
        </button>
        {status && <div className="text-center text-sm mt-2">{status}</div>}
      </form>
    </div>
  );
}
