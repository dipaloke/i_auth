import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";

import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

import axios from "axios";

const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
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
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Invalid credentials");
        }
        //api call
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL as string}/auth/login`,
            {
              email: credentials?.email,
              password: credentials.password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const { data } = response;
          console.log("Response data:", data);
          if (data) {
            return {
              id: data.user.id,
              name: data.user.name,
              email: data.user.email,
              access_token: data.token,
            };
          }
          return null;
        } catch (error) {
          console.log("Error during authorization:", error);
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
      console.log(
        `session: ${JSON.stringify(session)}, token: ${JSON.stringify(token)}`
      );

      if (token) {
        session.user = {
          ...session.user,
          id: token.id as string,
          access_token: token.access_token as string,
        };
      }

      return session;
      // {
      //   ...session,
      //   user: {
      //     ...session.user,
      //     access_token: token.access_token,
      //   },
      // };
    },
    async jwt({ token, user }) {
      // if (!token.sub) return token;

      if (user) {
        // token.id = user.id;
        // token.access_token = user.access_token;
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
