import { cn } from "@/lib/utils"
import Instagram from "@/public/common/instagram.svg"
import TikTok from "@/public/common/tiktok.svg"
import Twitter from "@/public/common/twitter.svg"
import YouTube from "@/public/common/youTube.svg"
import Image from "next/image"
import Link from "next/link"

const mediaLinks = [
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@pdfai",
    icon: <TikTok width={24} height={24} />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/pdfdotai/",
    icon: <Instagram width={24} height={24} />,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@pdfai",
    icon: <YouTube width={24} height={24} />,
  },
  {
    label: "Twitter",
    href: "https://twitter.com/pdfdotai",
    icon: <Twitter width={24} height={24} />,
  },
]

export function Footer({ className }: { className?: string }) {
  return (
    <footer className={cn(className)}>
      <h2 className="sr-only">Footer</h2>
      <div className="h-8 w-full sm:h-12 lg:h-16" />
      <div className="mx-auto size-full max-w-7xl border-t border-gray-900/10 px-6 pb-8 pt-16 lg:px-8">
        <div className="grid grid-cols-1 gap-16 xl:grid-cols-2 xl:gap-8">
          <section className="space-y-8">
            <Image width={28} height={28} src={"/favicon.ico"} alt="logo" />
            <div className="text-sm leading-6 text-gray-600">
              Chat with any PDF: ask questions, get summaries, find information,
              and more.
            </div>
            <div className="flex flex-row gap-6">
              {mediaLinks.map((link) => (
                <Link
                  href={link.href}
                  key={link.label}
                  target="_blank"
                  className="text-gray-400"
                >
                  <span className="sr-only">{link.label}</span>
                  {link.icon}
                </Link>
              ))}
            </div>
          </section>
          <section className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
            <div>
              <h3 className="text-sm font-semibold leading-6 text-gray-900">
                Products
              </h3>
              <ul
                role="list"
                className="mt-6 list-none space-y-4 p-0 text-sm text-gray-600 *:inset-0 *:leading-6 *:hover:text-gray-900"
              >
                <li>
                  <Link href="/use-cases">Use cases</Link>
                </li>
                <li>
                  <Link href="/chrome-extension">Chrome extension</Link>
                </li>
                <li>
                  <Link href="https://api.pdf.ai/">API docs</Link>
                </li>
                <li>
                  <Link href="https://pdf.ai/pricing">Pricing</Link>
                </li>
                <li>
                  <Link href="https://pdf.ai/tutorials">Video tutorials</Link>
                </li>
                <li>
                  <Link href="https://pdf.ai/resources">Resources</Link>
                </li>
                <li>
                  <Link href="https://pdf.ai/blog">Blog</Link>
                </li>
                <li>
                  <Link href="/faq">FAQ</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold leading-6 text-gray-900">
                We also built
              </h3>
              <ul
                role="list"
                className="mt-6 list-none space-y-4 p-0 text-sm text-gray-600 *:inset-0 *:leading-6 *:hover:text-gray-900"
              >
                <li>
                  <Link href="https://pdf.ai/tools/resume-ai-scanner">
                    Resume AI Scanner
                  </Link>
                </li>
                <li>
                  <Link href="https://pdf.ai/tools/invoice-ai-scanner">
                    Invoice AI Scanner
                  </Link>
                </li>
                <li>
                  <Link href="https://pdf.ai/tools/quiz-ai-generator">
                    AI Quiz Generator
                  </Link>
                </li>
                <li>
                  <Link href="https://quickyai.com">QuickyAI</Link>
                </li>
                <li>
                  <Link href="https://docsium.com">Docsium</Link>
                </li>
                <li>
                  <Link href="https://pdf.ai/gpts">PDF GPTs</Link>
                </li>
                <li>
                  <Link href="https://pdfgen.com">PDF AI generator</Link>
                </li>
                <li>
                  <Link href="https://pdf.ai/tools">Other PDF tools</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold leading-6 text-gray-900">
                Company
              </h3>
              <ul
                role="list"
                className="mt-6 list-none space-y-4 p-0 text-sm text-gray-600 *:inset-0 *:leading-6 *:hover:text-gray-900"
              >
                <li>
                  <Link href="/compare/chatpdf-alternative">
                    PDF.ai vs ChatPDF
                  </Link>
                </li>
                <li>
                  <Link href="/compare/adobe-acrobat-reader-alternative">
                    PDF.ai vs Acrobat Reader
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy">Legal</Link>
                </li>
                <li>
                  <Link href="/affiliate-program">Affiliate program 💵</Link>
                </li>
                <li>
                  <Link href="/investor">Investor</Link>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </footer>
  )
}
