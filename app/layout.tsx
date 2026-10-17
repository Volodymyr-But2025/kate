import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KATYA.EXE — Birthday Protocol",
  description: "A tiny birthday protocol built especially for Katya.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}