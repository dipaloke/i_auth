import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";

import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

import axios from "axios";


interface Session {
  user: {
    id: string;
    email: string;
    access_token?: string;
  };
}

interface User {
  id: string;
  email: string;
  access_token?: string;
}

const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    Github({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@examplemail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Invalid credentials");
        }

        //api call
        try {
          const response = await axios.post(
            `${process.env.SITE_URL}/api/v1/auth-service/auth/login`,
            {
              email: credentials?.email,
              password: credentials.password,
            }
          );
          const { data } = response;
          console.log(data);
          return {
            id: data.userId,
            email: data.email,
            access_token: data.access_token,
            key: "Hey cool",
          };
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async session({ session, token }) {
      console.log(`session: ${{ session }}, token: ${{ token }}`);
      return {
        ...session,
        user: {
          ...session.user,
          access_token: token.access_token,
        },
      };
    },
    async jwt({ token, user }) {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          access_token: u.access_token,
        };
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
