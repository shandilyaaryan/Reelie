import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "./db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Missing email and password.");
        }

        try {
          await connectToDatabase();
          const user = await User.findOne({ email: credentials.email });

          if (!user) {
            throw new Error("No user found!");
          }

          const isValidPass = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isValidPass) {
            throw new Error("Password Incorrect!");
          }

          return {
            id: user._id.toString(),
            email: user.email,
          };
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
};
