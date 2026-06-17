import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://theeverco.com"),
  title: {
    default: "The EverCo Cleveland — Premium Rentals on the West Side",
    template: "%s · The EverCo Cleveland",
  },
  description:
    "A family-run collection of thoughtfully renovated rental homes across Cleveland's western suburbs. Character-rich houses, modern comforts, and a landlord who actually answers the phone.",
  keywords: [
    "Cleveland rentals",
    "west side Cleveland apartments",
    "Lakewood rentals",
    "Rocky River homes for rent",
    "family-run property management",
  ],
  openGraph: {
    title: "The EverCo Cleveland",
    description:
      "Thoughtfully renovated rental homes across Cleveland's western suburbs.",
    type: "website",
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
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="bg-paper text-charcoal min-h-full flex flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
