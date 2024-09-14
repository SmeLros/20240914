import { cn } from "@/lib/utils"
import Link from "next/link"

const navLinks = [
  {
    label: "Pricing",
    href: "/pricing",
  },
  {
    label: "Chrome extension",
    href: "/chrome-extension",
  },
  {
    label: "Use cases",
    href: "/use-cases",
  },
  {
    label: "Get started →",
    href: "/auth/sign-in",
  },
]

export function NavMenuItems({ className }: { className?: string }) {
  return (
    <>
      {navLinks.map((link) => (
        <Link
          href={link.href}
          key={link.href}
          className={cn(
            "p-2.5 text-[15px] font-medium text-black hover:underline",
            className,
          )}
        >
          {link.label}
        </Link>
      ))}
    </>
  )
}
