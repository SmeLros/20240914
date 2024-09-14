import { Footer } from "@/components/common/Footer"
import { NavHeader } from "@/components/common/NavHeader"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import localFont from "next/font/local"
import "./globals.css"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PDF.ai | Chat with your PDF documents",
  description:
    "We built the ultimate ChatPDF app that allows you to chat with any PDF: ask questions, get summaries, find anything you need!",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.className} flex h-screen w-screen flex-col overflow-auto antialiased`}
      >
        <NavHeader className="shrink-0" />
        <main className="flex-1">{children}</main>
        <Footer className="shrink-0" />
      </body>
    </html>
  )
}
