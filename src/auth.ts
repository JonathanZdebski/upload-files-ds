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
      // Conecta ao MongoDB
      await connectToUsersAuthenticatedDB();

      // Verifica se o usuário já está registrado
      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        // Registra um novo usuário se ele não estiver registrado
        const newUser = new User({
          name: user.name,
          email: user.email,
          image: user.image,
          permissions: ["canAccessComponent"],  
        });
        await newUser.save();
        console.log('Novo usuário registrado:', newUser);
      } else {
        console.log('Usuário já registrado:', existingUser);
      }

      return true;
    },
  
}});

