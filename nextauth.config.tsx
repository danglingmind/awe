import type { NextAuthConfig } from "next-auth";
import github from "next-auth/providers/github";
import google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/app/lib/prismaClient";

export const authConfig = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      let isProtected = false;

      const protectedPathsPrefix = ["/ui/"];
      protectedPathsPrefix.forEach((prefix) => {
        if (pathname.startsWith(prefix)) {
          isProtected = true;
        }
      });
      if (isProtected) return !!auth;
      return true;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [github, google],
} satisfies NextAuthConfig;
