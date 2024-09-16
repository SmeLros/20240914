import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-6 px-12">
      <h1 className="text-4xl font-bold underline">Welcome !</h1>
      <p className="text-sm font-medium text-gray-600">
        We built the ultimate ChatPDF app that allows you to chat with any PDF:
        ask questions, get summaries, find anything you need!
      </p>
      <div>
        <Link href={"/tools/rotate-pdf"} legacyBehavior>
          <Button className="mx-auto">Quick start</Button>
        </Link>
      </div>
    </div>
  )
}
