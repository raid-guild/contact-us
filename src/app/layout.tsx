import type { Metadata } from "next";
import { maziusDisplay, ebGaramond, alchemion } from "@/lib/fonts";
import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Contact Raid Guild",
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
        className={`${maziusDisplay.variable} ${ebGaramond.variable} ${alchemion.variable} font-body antialiased h-screen flex flex-col`}
      >
        <HeaderNav />
        <main className="flex-1 flex flex-col overflow-auto">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
