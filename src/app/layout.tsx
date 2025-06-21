import type { Metadata } from "next";
import Link from "next/link";
import { maziusDisplay, ebGaramond } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Raid Guild",
  description: "We are slaying Moloch, one web3 build at a time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${maziusDisplay.variable} ${ebGaramond.variable} antialiased`}
      >
        {children}
        <footer className="mt-16 w-full border-t border-border bg-background/80 py-6 text-center text-sm text-muted-foreground">
          <nav className="flex flex-wrap justify-center gap-6">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <Link
              href="/components"
              className="hover:text-foreground transition-colors"
            >
              Components
            </Link>
            <Link
              href="/navigation"
              className="hover:text-foreground transition-colors"
            >
              Navigation & Layout
            </Link>
            <Link
              href="/data-display"
              className="hover:text-foreground transition-colors"
            >
              Data Display
            </Link>
            <Link
              href="/advanced-components"
              className="hover:text-foreground transition-colors"
            >
              Advanced Components
            </Link>
          </nav>
          <div className="mt-2 opacity-60">A RaidGuild Campaign</div>
        </footer>
      </body>
    </html>
  );
}
