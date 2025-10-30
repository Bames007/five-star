import type { Metadata, Viewport } from "next";
import {
  Geist,
  Geist_Mono,
  Poppins,
  Gantari,
  Playfair_Display,
  Bebas_Neue,
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const gantari = Gantari({
  variable: "--font-gantari",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: ["400"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fivestarrestaurant.com"),
  title: "5-Star Restaurant | Premium Dining in Maitama, Abuja",
  description:
    "Experience exceptional cuisine at Abuja's premier fine dining destination in Maitama. Master chefs, premium ingredients, unforgettable moments.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
    shortcut: "/logo.png",
  },
  openGraph: {
    title: "5-Star Restaurant | Premium Dining in Maitama, Abuja",
    description:
      "Experience exceptional cuisine at Abuja's premier fine dining destination in Maitama. Master chefs, premium ingredients, unforgettable moments.",
    images: ["/logo.png"],
    type: "website",
    locale: "en_US",
    siteName: "5-Star Restaurant",
  },
  twitter: {
    card: "summary_large_image",
    title: "5-Star Restaurant | Premium Dining in Maitama, Abuja",
    description:
      "Experience exceptional cuisine at Abuja's premier fine dining destination in Maitama.",
    images: ["/logo.png"],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#d4af37",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bebasNeue.variable} ${poppins.variable} ${playfair.variable} antialiased`}
      >
        {/* Background gradient */}
        <div className="fixed inset-0 bg-gradient-to-br from-amber-50 via-white to-amber-50/50 -z-10" />

        {/* Scrollable content */}
        <div className="relative">{children}</div>
      </body>
    </html>
  );
}
