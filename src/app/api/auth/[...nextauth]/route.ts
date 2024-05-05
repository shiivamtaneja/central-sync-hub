import prisma from '@/lib/prisma';
import NextAuth, { NextAuthOptions } from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async authorize(credentials: any) {
        try {
          const user = await prisma.user.findFirst({
            where: {
              email: credentials.email
            }
          });

          if (!user) {
            throw new Error('User not found!');
          }

          if (!user.verified) {
            throw new Error('User not verified!');
          }

          return user;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          throw new Error(error);
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user && user.email) {
        const userDetails = await prisma.user.findFirst({
          where: {
            email: user.email
          }
        });

        if (userDetails) {
          token.user = {
            first_name: userDetails.first_name,
            id: userDetails.id,
            email: userDetails.email
          };
        }
      }

      return Promise.resolve(token);
    },
    session({ session, token }) {
      session.user = token.user;

      return Promise.resolve(session);
    }
  }
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

