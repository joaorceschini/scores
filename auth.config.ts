import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnProfile = nextUrl.pathname.startsWith("/profile");
      const isImage = nextUrl.pathname.endsWith(".jpg");

      if (isImage) return true;

      if (!isLoggedIn) return false;

      if (isOnProfile) return true;

      if (!isOnDashboard)
        return Response.redirect(new URL("/dashboard", nextUrl));

      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
