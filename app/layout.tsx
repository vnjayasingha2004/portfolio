import type { Metadata, Viewport } from "next";
import "./globals.css";
import { GalaxyBackground } from "@/components/GalaxyBackground";

export const metadata: Metadata = {
  title: "Vinira Jayasingha - Software Developer",
  description:
    "Portfolio of Vinira Jayasingha: product-minded software developer building full-stack, mobile, desktop, and AI-powered applications.",
  keywords: ["Vinira Jayasingha", "software developer", "portfolio", "Next.js", "Flutter", "ASP.NET Core"],
  authors: [{ name: "Vinira Jayasingha" }],
  openGraph: {
    title: "Vinira Jayasingha - Software Developer",
    description: "Product-minded developer building real systems with clean design and useful motion.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050506",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body><GalaxyBackground />{children}</body>
    </html>
  );
}
