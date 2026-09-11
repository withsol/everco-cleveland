import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://theevercocleveland.com"),
  title: {
    default:
      "The Ever Company — Rental Homes in Cleveland, Ohio",
    template: "%s · The Ever Company",
  },
  description:
    "Your forever home, for now. A family-owned collection of beautiful rental homes in the Cleveland, Ohio area — Rocky River, Bay Village, Avon Lake, and Strongsville. Furnished and unfurnished homes available.",
  keywords: [
    "Cleveland Ohio rentals",
    "Rocky River homes for rent",
    "Bay Village rentals",
    "Avon Lake homes for rent",
    "Strongsville rentals",
    "Westlake Ohio rentals",
    "furnished rentals Cleveland",
    "corporate housing Cleveland",
    "family-owned property management Cleveland",
  ],
  openGraph: {
    title: "The Ever Company — Rental Homes in Cleveland, Ohio",
    description:
      "Your forever home, for now. Family-owned rental homes across Rocky River, Bay Village, Avon Lake, and Strongsville, Ohio.",
    type: "website",
    locale: "en_US",
    siteName: "The Ever Company",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="bg-paper text-charcoal min-h-full flex flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
