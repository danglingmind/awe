"use client";
import { useContext } from "react";
import { CounterContext } from "./(context)/context/sample";
import { SignInButton, SignOutButton } from "./components/auth/auth-components";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { count } = useContext(CounterContext);
  const session = useSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <h1>Home</h1>
      <SignInButton />
      <Link href={"/dashboard"}>
        {" "}
        <button className="btn btn-primary">Dashboard</button>{" "}
      </Link>
      <div className="card border border-black">
        <div className="card-body">
          <h2 className="card-title">Welcome, {session?.data?.user?.name}</h2>

          <SignOutButton />
        </div>
      </div>
    </main>
  );
}
