"use client";
import Link from "next/link";
import { Avatar } from "./avatar";
import { signOut } from "next-auth/react";
import NewButton from "../new-button";

export default function TopRightGroup() {
  return (
    <div className="flex flex-row gap-4 sticky top-5 right-5 float-end z-[1]">
      <NewButton />
      <div key={"profile"} className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <Avatar />
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 bg-base-300"
        >
          <li>
            <a className="justify-between">
              Profile
              <span className="badge">New</span>
            </a>
          </li>
          <li>
            <Link href={"/settings"}>Settings</Link>
          </li>
          <li
            onClick={async () => {
              await signOut({ redirect: true, callbackUrl: "/" });
            }}
          >
            <a>Logout</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
