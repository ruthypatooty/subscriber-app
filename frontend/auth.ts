import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";

console.log("NextAuth handlers loaded");
console.log("NextAuth import:", NextAuth);
export const authOptions: NextAuthOptions= {
  ...authConfig,
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        userName: { label: "UserName", type: "text", placeholder: "User Name" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials, req) {
        try {
          if (!credentials) {
            throw new Error("Credentials are required");
          }
          const { userName, password } = credentials;

          const res = await fetch("http://localhost:3001/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userName, password }),
          });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Failed to authorize");
            }
            console.log("Response from login API:", res);
            // Assuming the response contains user data
            const data = await res.json();
            console.log("Data from login API:", data);
            if (!data || !data.user) {
                throw new Error("No user data returned from login API");
                }
            // Check if the user exists in the database
            const user = data.user;

          return {
            id: user.userId.toString(), // NextAuth.js expects 'id' as string
            userId: user.userId, // Your custom numeric ID
            userName: user.userName,
            role: user.role,
            routePath: user.routePath,
            userStatus: user.userStatus || null,

          };

        } catch (error) {
          console.error("Error in authorize:", error);
          throw new Error("Authorization failed");
        }
        // return {
        //   id: "1", // NextAuth.js expects 'id' as string
        //   userId: 1,
        //   userName: "John Doe",
        //   userStatus: "active",
        //   role: 1, // Assuming role is a number
        // };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.userId = user.userId; // Keep original userId as number
        token.userName = user.userName;
        token.userStatus = user.userStatus;
        token.role = user.role;
        token.routePath = user.routePath;

      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.userId = token.userId as number; // Original userId as number
        session.user.userStatus = token.userStatus as string;
        session.user.role = token.role as number; // Role as number
        session.user.routePath = token.routePath as string;
      }

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  logger: {
    error(code, metadata) {
      console.error("NextAuth error:", code, metadata);
    },
  },
};

export const handler = NextAuth(authOptions);
console.log("GET Handler is:", typeof handler.GET); // should be "function"

export const GET = handler.GET;
export const POST = handler.POST;
