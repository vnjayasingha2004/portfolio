import type { Metadata, Viewport } from "next";
import "@fontsource-variable/anybody/wdth.css";
import "@fontsource-variable/schibsted-grotesk";
import "./globals.css";
import { Mascot } from "@/components/Mascot";
import { Nav } from "@/components/Nav";
import { SmoothScroll } from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Vinira Jayasingha — Software developer",
  description:
    "Portfolio of Vinira Jayasingha, a software developer in Sri Lanka building full-stack, mobile, desktop and AI-powered products for real use.",
  keywords: ["Vinira Jayasingha", "software developer", "portfolio", "Next.js", "Flutter", "ASP.NET Core", "Sri Lanka"],
  authors: [{ name: "Vinira Jayasingha" }],
  openGraph: {
    title: "Vinira Jayasingha — Software developer",
    description: "Full-stack, mobile and desktop products, built for real use.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2734F5",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SmoothScroll />
        <Nav />
        {children}
        <Mascot />
      </body>
    </html>
  );
}
