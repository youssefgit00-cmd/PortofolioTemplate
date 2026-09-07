"use client"

import Link from "next/link"
import { copyText } from "@/utils/copy"
import { useTiks } from "@rexa-developer/tiks/react"
import { ArrowUpRight, SquareDashed, Type } from "lucide-react"
import { toast } from "sonner"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/base/ui/context-menu"

import { YKMark, getMarkSVG } from "./yk-mark"
import { getWordmarkSVG } from "./yk-wordmark"

export function BrandContextMenu({ children }: { children: React.ReactNode }) {
  const { success } = useTiks()

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>

      <ContextMenuContent className="w-fit">
        <ContextMenuItem
          render={
            <a href="/" target="_blank">
              <ArrowUpRight />
              Open Link in New Tab
            </a>
          }
        />

        <ContextMenuSeparator />

        <ContextMenuItem
          onClick={() => {
            copyText(getMarkSVG())
            toast.success("Mark as SVG copied")
            success()
          }}
        >
          <YKMark />
          Copy Mark as SVG
        </ContextMenuItem>

        <ContextMenuItem
          onClick={() => {
            copyText(getWordmarkSVG())
            toast.success("Logotype as SVG copied")
            success()
          }}
        >
          <Type />
          Copy Logotype as SVG
        </ContextMenuItem>

        <ContextMenuSeparator />

        <ContextMenuItem
          render={
            <Link href="/blog/yk-brand">
              <SquareDashed />
              Brand Guidelines
            </Link>
          }
        />
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default BrandContextMenu
