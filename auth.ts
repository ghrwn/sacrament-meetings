import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { z } from "zod";
import authConfig from "./auth.config";

const credentialsSchema = z.object({
  username: z.string().trim().min(1).max(100),
  password: z.string().min(1).max(128),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "Bishopric account",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const configuredUsername = process.env.AUTH_ADMIN_USERNAME?.trim();
        const passwordHash = process.env.AUTH_ADMIN_PASSWORD_HASH;
        if (!configuredUsername || !passwordHash) {
          console.error("Auth.js credentials are not configured in the environment.");
          return null;
        }

        if (parsed.data.username.toLowerCase() !== configuredUsername.toLowerCase()) {
          return null;
        }

        const passwordMatches = await compare(parsed.data.password, passwordHash);
        if (!passwordMatches) return null;

        return {
          id: configuredUsername.toLowerCase(),
          name: "Bishopric Administrator",
        };
      },
    }),
  ],
});
