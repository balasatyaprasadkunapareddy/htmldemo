import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/layouts/Navigation";
import { LiquidGlassEffects } from "@/components/ui/LiquidGlassEffects";

export const metadata: Metadata = {
  title: "CivicPro - Transform Your Community",
  description: "Report civic issues, track progress, and make a difference in your neighborhood",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Navigation />
        <main className="flex-1">{children}</main>
        <LiquidGlassEffects />
      </body>
    </html>
  );
}
