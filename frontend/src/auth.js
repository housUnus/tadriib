import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { authConfig } from "./auth.config";
import { jwtDecode } from "jwt-decode";
import { refreshAccessToken, get_me } from "@/lib/auth/authentication";

const SIGN_IN_HANDLERS = {
  credentials: async (user, account, profile, email, credentials) => {
    return true;
  },
  google: async (user, account, profile, email, credentials) => {
    try {
      const response = await fetch(
        process.env.AUTH_SERVER_BASE_URL + "/dj-auth/google/",
        {
          method: "POST",
          body: JSON.stringify({
            access_token: account["access_token"],
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      account.meta = data;
      return true;
    } catch (error) {
      return false;
    }
  },
};
const SIGN_IN_PROVIDERS = Object.keys(SIGN_IN_HANDLERS);
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials === null) return null;
        try {
          const res = await fetch(
            `${process.env.AUTH_SERVER_BASE_URL}/dj-auth/login/`,
            {
              method: "POST",
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
              headers: { "Content-Type": "application/json" },
            }
          );
          if (res.ok) {
            const token = await res.json();
            return {
              ...token,
              expiry: {
                access: jwtDecode(token.access).exp * 1000,
                refresh: jwtDecode(token.refresh).exp * 1000,
              },
            };
          }
        } catch (error) {
          console.log("🚀 ~ error:", error);
          // console.error(error);
        }
        return null;
      },
    }),
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
    async signIn({ user, account, profile, email, credentials }) {
      if (!SIGN_IN_PROVIDERS.includes(account.provider)) return false;
      return SIGN_IN_HANDLERS[account.provider](
        user,
        account,
        profile,
        email,
        credentials
      );
    },
    jwt: async ({ user, token, account }) => {
      if (account && user) {
        let backendResponse =
          account.provider === "credentials" ? user : account.meta;
        return {
          ...token,
          access_token: backendResponse.access,
          refresh_token: backendResponse.refresh,
          expiry: backendResponse.expiry,
          user: backendResponse.user,
        };
      }

      // Token is still valid
      if (token.expiry.access > Date.now()) {
        return token;
      }

      // Token is not valid && refresh token is still valid
      if (token.expiry.refresh > Date.now()) {
        const new_token = await refreshAccessToken(token);
        return new_token;
      }

      // Token is not valid && refresh token is not valid
      return { ...token, error: "RefreshTokenExpired" };
    },
    session: async ({ session, token }) => {
      if (token) {
        session.access_token = token.access_token;
        session.user = token.user;
      }
      // session.refresh_token = token.refresh_token;
      // session.expiry = token.expiry;
      return session;
    },
  },

  pages: {
    signIn: "/auth/main/login", // CUSTOM SIGN IN PAGE
  },
});
