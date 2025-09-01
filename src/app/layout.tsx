import localFont from "next/font/local"
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";

import "./globals.css";
import Header from "@/components/Header";

const Khand = localFont({
  src: '../../public/fonts/Khand-Variable.woff2',
  display: 'swap',
  weight: "100 900",
  variable: "--font-khand"
})

const Switzer= localFont({
  src: '../../public/fonts/Switzer-Variable.woff2',
  display: 'swap',
  weight: "100 900",
  variable: "--font-switzer"
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${Khand.variable}`}>
      <body className="overflow-x-hidden bg-[#020202]">
        <Header />
        <main>
        {children}
        </main>
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
