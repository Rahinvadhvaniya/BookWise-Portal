import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth/password";

export const authConfig: NextAuthConfig = {
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Email + Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = z
          .object({
            email: z.string().email(),
            password: z.string().min(8),
          })
          .safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email.toLowerCase() },
        });

        if (!user || !user.passwordHash) {
          return null;
        }

        const isPasswordValid = await verifyPassword(parsed.data.password, user.passwordHash);
        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "google" || !user.email) {
        return true;
      }

      const ensuredUser = await prisma.user.upsert({
        where: { email: user.email.toLowerCase() },
        update: {
          name: user.name ?? "BookWise User",
          image: user.image,
        },
        create: {
          name: user.name ?? "BookWise User",
          email: user.email.toLowerCase(),
          image: user.image,
          role: "USER",
        },
      });

      user.id = ensuredUser.id;
      user.role = ensuredUser.role;

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.role = (token.role as "USER" | "ADMIN") ?? "USER";
      }

      return session;
    },
  },
};
