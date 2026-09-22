import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "The Analysis Layer",
  description: "Signals. Context. Decisions. Thought leadership."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
