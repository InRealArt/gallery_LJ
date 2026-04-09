import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LJ GALLERY | Galeries d'Art Internationales",
  description: "LJ Gallery s'efforce de créer un pont entre l'art classique et les expressions contemporaines les plus audacieuses.",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    apple: [
      { url: "/favicon.png", sizes: "32x32" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${montserrat.variable} ${playfairDisplay.variable} antialiased`}
    >
      <body className="bg-white text-[#1a1a1a] font-sans">
        {children}
      </body>
    </html>
  );
}
