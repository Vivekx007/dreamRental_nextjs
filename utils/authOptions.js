import connectDB from "@/config/database";
import User from "@/models/User";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
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
  ],

  callbacks: {
    // Invoked on successful sign in.

    async signIn({ account, profile }) {
      // console.log("profile", profile);
      // console.log("account", account);
      // 1. connect to database
      await connectDB();
      // 2. check if user exists
      const userExists = await User.findOne({ email: profile.email });
      // 3. if not, then add user to database
      if (!userExists) {
        // Truncate user name if it is too long
        const username = profile.name.slice(0, 20);

        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      // 4. return true to allow sign in
      return true;
    },

    // Modifies the session object
    async session({ session }) {
      // console.log("session", session);
      // 1. Get user from database
      const user = await User.findOne({ email: session.user.email });
      // 2. Assign the user id to the session
      session.user.id = user._id.toString();
      // 3. Return the session
      return session;
    },
  },
};
