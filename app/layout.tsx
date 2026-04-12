import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vinira Jayasingha | Portfolio",
  description:
    "Computer Science undergraduate and aspiring software engineer building modern mobile, desktop, and full-stack applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}