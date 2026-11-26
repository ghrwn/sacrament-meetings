import type { Metadata } from "next";
import { DM_Sans, Lora } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteDescription =
  "Plan, organize, review, and print sacrament meeting programs for your ward.";

export const metadata: Metadata = {
  metadataBase: new URL("https://sacrament-meetings-woad.vercel.app"),
  title: {
    default: "Sacrament Meeting Planner",
    template: "%s | Sacrament Meeting Planner",
  },
  description: siteDescription,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Sacrament Meeting Planner",
    title: "Sacrament Meeting Planner",
    description: siteDescription,
    images: [{
      url: "/opengraph-image",
      width: 1200,
      height: 630,
      alt: "A peaceful chapel prepared for sacrament meeting",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sacrament Meeting Planner",
    description: siteDescription,
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${dmSans.variable} ${lora.variable} flex min-h-screen flex-col bg-slate-50 font-sans text-slate-900 antialiased`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}