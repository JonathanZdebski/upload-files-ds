import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { connectToUsersAuthenticatedDB } from '../src/lib/mongodb';
import User from './app/models/User';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user }) {

      if (!(globalThis as any)._mongoose) {
        (globalThis as any)._mongoose = await connectToUsersAuthenticatedDB();
      }
      

      const mongoose = (globalThis as any)._mongoose;
      


      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {

        const newUser = new User({
          name: user.name,
          email: user.email,
          image: user.image,
          permissions: ["canAccessComponent"],
        });
        await newUser.save();
        console.log('Novo usuário registrado:', newUser);
      } else {

        const currentDate = new Date();
        if (!existingUser.lastLogin || existingUser.lastLogin.getTime() !== currentDate.getTime()) {
          existingUser.lastLogin = currentDate;
          await existingUser.save();
          console.log('Usuário atualizado:', existingUser);
        } else {
          console.log('Usuário já registrado:', existingUser);
        }
      }

      return true;
    },

    async session({ session }) {

      if (!session.user.id) {
        const currentUser = await User.findOne({ email: session.user.email });
        if (currentUser) {
          session.user.id = currentUser._id.toString(); // Armazena o ID do usuário na sessão
        }
      }

      if (typeof window !== 'undefined' && !localStorage.getItem('nextAuthSession')) {
        localStorage.setItem('nextAuthSession', JSON.stringify(session));
      }

      return session;
    },
  },

  events: {
    async signOut() {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('nextAuthSession');
      }
    }
  },

  session: {
    strategy: 'jwt', 
    maxAge: 24 * 60 * 60, 
  },
});
