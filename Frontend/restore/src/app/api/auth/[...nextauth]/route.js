import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const response = await fetch(
        `https://re-store.onrender.com/users/${session.user.email}/email`
      );
      const sessionUser = await response.json();
      session.user.id = sessionUser._id;
      return session;
    },
    async signIn({ profile }) {
      const response = await fetch(
        `https://re-store.onrender.com/users/${profile.email}/email`
      );
      const user = await response.json();
      if (user.error) {
        const sign = {
          email: profile.email,
          nombre: profile.name,
        };

        await fetch('https://re-store.onrender.com/users/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sign),
        });
      }
      return true;
    },
  },
});
export { handler as GET, handler as POST };
