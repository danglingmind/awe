"use client";
import { signIn, signOut } from "next-auth/react";

export function SignInButton() {
  return (
    <form
      action={async () => {
        await signIn();
      }}
    >
      <button className="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900">
        SiginIn
      </button>
    </form>
  );
}

export function SignOutButton() {
  return (
    <form
      action={async () => {
        await signOut({ redirect: true, callbackUrl: "/" });
      }}
    >
      <button className="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900">
        SiginOut
      </button>
    </form>
  );
}
