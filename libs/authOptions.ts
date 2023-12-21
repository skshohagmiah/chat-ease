import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "./db";
import { use } from "react";

export const authOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      id: "credentials",
      // @ts-ignore
      pages: {
        signin: "/login",
      },
      //@ts-ignore
      session: {
        strategy: "jwt",
      },
      secret: process.env.NEXTAUTH_SECRET,
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "example@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(
        credentials: Record<"email" | "password", string> | undefined
      ) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        const isMatched = await bcrypt.compare(
          credentials.password,
          user?.password!
        );
        if (isMatched) {
          return user;
        }

        return null;
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  
  callbacks: {
    //@ts-ignore
    async signIn({ user, account }) {
      if (account.provider === "credentials") {
        return true;
      } else if (account.provider === "google") {
        const existingUser = await prisma.user.findFirst({
          where: {
            email: user?.email,
          },
        });

        if (existingUser) {
          return true;
        } else {
          const newUser = await prisma.user.create({
            data: {
              name: user?.name,
              email: user?.email,
              image: user?.image,
            },
          });
          if (newUser) return true;
        }
      } else if (account.provider === "github") {
        const existingUser = await prisma.user.findFirst({
          where: {
            email: user?.email,
          },
        });

        if (existingUser) {
          return true;
        } else {
          const newUser = await prisma.user.create({
            data: {
              name: user?.name,
              email: user?.email,
              image: user?.image,
            },
          });
          if (newUser) return true;
        }
      }
    },
  },
};
