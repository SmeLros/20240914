"use client"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import Menu from "@/public/common/menu.svg"
import { X } from "lucide-react"
import { useState } from "react"
import { NavMenuItems } from "./NavMenuItems"

export function NavToggleMenu({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <Collapsible open={isOpen}>
        <CollapsibleTrigger asChild className="md:hidden">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => {
              setIsOpen((prev) => !prev)
            }}
            className={className}
            title="menu"
          >
            {isOpen ? <X className="w-full" /> : <Menu className="w-full" />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="absolute left-0 top-[70px] w-full border-t border-[#e5e3da] font-medium md:hidden">
          <div className="grid bg-white p-2.5">
            <NavMenuItems />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </>
  )
}
