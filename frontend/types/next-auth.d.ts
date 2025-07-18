// types/next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      userId: number;
      userName: string;
      id: string; // Match the ID from JWT
      subscriberName?: string;
      userStatus?: string;
      role: number;
      routePath?: string;
    }& DefaultSession["user"];
  }
  interface User {
    id: string; // Match the ID from JWT
    userId: number; // Your custom numeric ID
    userName: string; // Your custom username
    subscriberName?: string;
    userStatus?: string;
    role: number; // Role as a number
    routePath?: string; // Route path based on role
  }

}
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    id: string; // Match the ID from User
    userId: number; // Your custom numeric ID
    userName: string; // Your custom username
    subscriberName?: string;
    userStatus?: string;
    role: number;
    routePath?: string;

  }
}