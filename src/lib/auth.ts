import NextAuth from "next-auth";
import { v4 as uuid } from "uuid";
import { encode as defaultEncode } from "next-auth/jwt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const adapter = PrismaAdapter(prisma);
const SESSION_DUR_HOURS = 3;

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email and password are required");
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });
        if (!user) {
          throw new Error("No user found with this email");
        }
        const isValidPassword = await bcrypt.compare(
          credentials.password as string,
          user.password
        );
        if (!isValidPassword) {
          throw new Error("Invalid password");
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _password, ...userData } = user;
        return {
          ...userData,
          id: String(user.id),
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider === "credentials" && user) {
        token.credentials = true;
        token.id = user.id;
        token.username = user.username;
        token.sub = user.id;
      }
      return token;
    },

    async session({ session, user }) {
      if (user) {
        session.user.id = String(user.id);
        session.user.username = String(user.username);
      }
      return session;
    },
  },

  session: {
    maxAge: SESSION_DUR_HOURS * 60 * 60,
    updateAge: 60 * 60,
  },

  jwt: {
    encode: async function (params) {
      if (params.token?.credentials) {
        const sessionToken = uuid();

        if (!params.token.sub) {
          throw new Error("No user ID found in token");
        }

        const createdSession = await adapter?.createSession?.({
          sessionToken: sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + SESSION_DUR_HOURS * 60 * 60 * 1000),
        });

        if (!createdSession) {
          throw new Error("Failed to create session");
        }

        return sessionToken;
      }
      return defaultEncode(params);
    },
  },
  secret: process.env.AUTH_SECRET,
});
