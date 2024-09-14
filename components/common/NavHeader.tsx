import { cn } from "@/lib/utils"
import Logo from "@/public/logo.svg"
import Link from "next/link"
import { NavMenuItems } from "./NavHeader/NavMenuItems"
import { NavToggleMenu } from "./NavHeader/NavToggleMenu"

export function NavHeader({ className }: { className?: string }) {
  return (
    <nav
      className={cn("flex h-[70px] flex-row justify-between p-2.5", className)}
    >
      <h2 className="sr-only">Header</h2>
      <div>
        <Link
          href="/"
          className="flex flex-row items-center p-2.5 font-serif text-xl font-bold"
        >
          <Logo width={32} height={18} />
          PDF.ai
        </Link>
      </div>
      <div className="hidden items-center md:grid md:grid-flow-col">
        <NavMenuItems />
      </div>
      <div className="grid items-center justify-center md:hidden">
        <NavToggleMenu className="size-10 p-2.5" />
      </div>
    </nav>
  )
}
