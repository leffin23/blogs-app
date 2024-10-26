import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const {handlers, signIn, signOut, auth} = NextAuth({
    providers: [
        GoogleProvider({
          clientId: process.env.AUTH_GOOGLE_ID,
          clientSecret: process.env.AUTH_GOOGLE_SECRET
        })
      ],
      callbacks: {
        async signIn({ user, account }) {
            if (!account) {
                console.error('No account information available during sign-in.');
                return false; 
            }

          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! },
          });
    
          //if user does not exist, create new entry
          if (!existingUser) {
            await prisma.user.create({
              data: {
                clerkUserId: account.providerAccountId!,
                email: user.email!,
                name: user.name,
              },
            });
          }
          return true;
        },
        
        async session({ session }) {
    
          const dbUser = await prisma.user.findUnique({
            where: { email: session.user.email! },
          });
          if(dbUser){
            session.user.id = dbUser.clerkUserId; 
            return session;
          }
          return session;
        },

        async jwt({ token, user }) {
          if (user) {
            token.sub = user.id; 
          }
          return token;
        },
      }
    
    })

