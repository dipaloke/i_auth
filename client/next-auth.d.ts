import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      access_token?: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    id?: string;
    access_token: string;
  }
}
