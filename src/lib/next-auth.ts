import { AuthOptions, getServerSession } from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { createUser, findUser } from "@/app/utils/database/user.query";
import { compareHash } from "@/app/utils/bcrypt";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      email: string;
      name: string;
      image:string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    email: string;
    name: string;
  }
}

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "user@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "********",
        },
      },
      async authorize(credentials) {
        try {
          const user = await findUser({ email: credentials?.email });
          if (!user) return null;
          if (!credentials?.password) return null;

          const comparePassword = await compareHash(
            credentials?.password,
            user.password!,
          );

          if (!comparePassword) return null;

          const payload = {
            id: user.id,
            email: user.email,
            name: user.name,
          };
          return payload;
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      const redirectUrl = url.startsWith("/")
        ? new URL(url, baseUrl).toString()
        : url;
      return redirectUrl;
    },

    async signIn({ user, profile }) {
      if (user.email) {
        const userdb = await findUser({ email: user.email });
        if (!userdb) {
          await createUser({
            email: user.email,
            name: user.name || profile?.name || "",
          });
        }
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user?.email) {
        const userdb = await findUser({ email: user.email });
        if (!userdb) return token;
        token.id = userdb.id;
        token.email = userdb.email;
        token.name = userdb.name;
        token.picture = userdb.profile_picture_url;
      }
      return token;
    },

    async session({ session, token }) {
      if (token.email && session.user) {
        const userdb = await findUser({ id: token.id as string });
        session.user.id = userdb?.id as string;
        session.user.name = userdb?.name as string;
        session.user.email = userdb?.email as string;
        session.user.image = userdb?.profile_picture_url as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
};

export const nextGetServerSession = () => getServerSession(authOptions);
