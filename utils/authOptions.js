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
      // 1. connect to database
      // 2. check if user exists
      // 3. if not, then add user to database
      // 4. return true to allow sign in
      if (account.provider === "google") {
        return profile.email_verified && profile.email.endsWith("@example.com");
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },

    // Modifies the session object
    async session({ session }) {
      // 1. Get user from database
      // 2. Assign the user id to the session
      // 3. Return the session
    },
  },
};
