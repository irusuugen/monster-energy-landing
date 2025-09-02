import localFont from "next/font/local"
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";

import "./globals.css";
import Header from "@/components/Header";
import ViewCanvas from "@/components/ViewCanvas";

const Khand = localFont({
  src: '../../public/fonts/Khand-Variable.woff2',
  display: 'swap',
  weight: "100 900",
  variable: "--font-khand"
})

const ClashDisplay= localFont({
  src: '../../public/fonts/ClashDisplay-Variable.woff2',
  display: 'swap',
  weight: "100 900",
  variable: "--font-clashdisplay"
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${Khand.variable} ${ClashDisplay.variable}`}>
      <body className="overflow-x-hidden bg-[#020202] text-[#DAD7CD] font-body">
        <Header />
        <main>
        {children}
        <ViewCanvas/>
        </main>
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
