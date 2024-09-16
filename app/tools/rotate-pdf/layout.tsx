import { PDFViewerProvider } from "@/components/tools/rotate-pdf/usePDFViewer"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free PDF Page Rotator - Rotate Individual or All Pages",
  description:
    "Rotate individual or all pages in your PDF effortlessly. No downloads or sign-ups. Fast, secure, and user-friendly. Try now!",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PDFViewerProvider>{children}</PDFViewerProvider>
}
