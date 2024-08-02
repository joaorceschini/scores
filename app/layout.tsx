import type { Metadata } from "next";
import "./globals.css";
import { ibmplexmono } from "../app/ui/fonts";

export const metadata: Metadata = {
  title: {
    template: "%s | sigscores",
    default: "sigscores",
  },
  description: "app to save scores",
  metadataBase: new URL("https://sigscores.vercel.app/"),
  keywords: ["scores", "score", "save", "save score", "table", "stats"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ibmplexmono.className} antialiased`}>{children}</body>
    </html>
  );
}
