import type { Metadata } from "next";
import "./globals.css";
import { inter } from "../app/ui/fonts";

export const metadata: Metadata = {
  title: {
    template: "%s | sigscores",
    default: "sigscores",
  },
  description: "app to save scores",
  metadataBase: new URL("https://sigscores.vercel.app/"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
