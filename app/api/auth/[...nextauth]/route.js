import User from "@models/User";
import { connectToDB } from "@mongodb/database";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials, req) {
        await connectToDB();

        /*Check if user exists*/
        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("Invelid email or password");
        }

        /*Compare password*/
        const isMatch = await compare(credentials.password, user.password);

        if (!isMatch) {
          throw new Error("Invelid email or password");
        }
        return user;
      },
    }),
  ],

  secret: process.env.NEXT_AUTH_SECRET,

  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
    },

    async signIn({ account, profile }) {
      if (account.provider === "google") {
        try {
          await connectToDB();

          /*Check if user exists*/
          let user = await User.findOne({ email: profile.email });

          if (!user) {
            user = await User.create({
              email: profile.email,
              username: profile.name,
              profileImagePath: profile.picture,
              wishlist: [],
              cart: [],
              order: [],
              work: [],
            });
          }

          return user;
        } catch (error) {
          console.log("Error checking if user exists", error.message);
        }
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
  },
});

export { handler as GET, handler as POST };
