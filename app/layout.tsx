import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import { Providers } from "@/components/layout/Providers";
import { Navbar } from "@/components/layout/Navbar";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap", 
});


export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#5865f2" },
    { media: "(prefers-color-scheme: dark)", color: "#5865f2" },
  ],
};

export const metadata: Metadata = {
  title: "Discord Widgets",
  description: "Create SVG Invite widgets inspired by the Discord Client UI.",
  keywords: ["Discord", "Discord Invite", "Server Invite Widget", "Discord Widgets"],
  authors: [{ name: "Aniket", url: "https://github.com/aniket091" }],
  creator: "Aniket",
  twitter: {
    card: "summary_large_image",
    title: "Discord Widgets",
    description: "Create SVG Invite widgets inspired by the Discord Client UI.",
  },
  icons: {
    icon: "/favicon.ico"
  }
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={`${outfit.variable} antialiased`}
      >
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}