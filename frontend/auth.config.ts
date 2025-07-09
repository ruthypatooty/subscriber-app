import { signIn } from "next-auth/react";
import type { NextAuthOptions} from "next-auth";

export const authConfig: NextAuthOptions = {
  pages: {
    signIn: "/loginpage",
  },
  secret: process.env.AUTH_SECRET ||process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },

  providers: [],
};