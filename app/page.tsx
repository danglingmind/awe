"use client";
import { useContext } from "react";
import { CounterContext } from "./(context)/context/sample";

export default function Home() {
  const { count } = useContext(CounterContext);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <h1>Home</h1>
      <p>{count}</p>
    </main>
  );
}
