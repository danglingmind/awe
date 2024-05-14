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

      const protectedPathsPrefix = ["/dashboard"];
      protectedPathsPrefix.forEach((prefix) => {
        if (pathname.startsWith(prefix)) {
          isProtected = true;
        }
      });
      if (isProtected) return !!auth;
      return true;
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = String(token.sub);
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [github, google],
} satisfies NextAuthConfig;
