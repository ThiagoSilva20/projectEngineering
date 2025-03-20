import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import  CredentialsProvider  from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { prisma } from "../database";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/sign-in",
    signOut: "/auth/sign-in",
    error: "/auth/sign-in",
    verifyRequest: "/auth/sign-in",
    newUser: "/app",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          // Check if credentials exist
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email e senha são obrigatórios");
          }
  
          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string },
          });
  
          if (!user) {
            throw new Error("Usuário não encontrado");
          }
  
          // Compare the provided password with the stored hashed password
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password as string,
            user.password
          );
  
          if (!isPasswordCorrect) {
            throw new Error("Senha incorreta");
          }
  
          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        },
      }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.user = {
        ...session.user,
        id: user.id,
      };
      return session;
    },
  },
  cookies: {
    sessionToken: {
      name: process.env.SESSION_COOKIE_NAME || "authenticationjs.session-token",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Definir como true em produção
        sameSite: "lax",
      },
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
});