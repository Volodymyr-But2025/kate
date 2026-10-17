import type { Metadata } from "next";
import { Comfortaa, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-manrope",
});

const comfortaa = Comfortaa({
  subsets: ["latin", "cyrillic"],
  weight: ["600", "700"],
  variable: "--font-comfortaa",
});

export const metadata: Metadata = {
  title: "З Днем Народження, Катю! 🎉",
  description: "Особливе привітання з інтерактивними картками та салютом.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk" className={`${manrope.variable} ${comfortaa.variable}`}>
      <body className={manrope.className}>{children}</body>
    </html>
  );
}
