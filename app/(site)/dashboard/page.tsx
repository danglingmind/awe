"use client";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const session = useSession();

  return (
    <div>
      <div className="text-4xl">{`Hello! ${session.data?.user?.name}`}</div>
    </div>
  );
}
