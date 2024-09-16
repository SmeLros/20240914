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
          // 常规来说开启prefetch会提升性能，但这里因为并未实现这些路由，所以关闭prefetch
          prefetch={false}
        >
          {link.label}
        </Link>
      ))}
    </>
  )
}
