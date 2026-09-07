import dynamic from "next/dynamic"

import { YKMark } from "@/components/yk-mark"
import { YKWordmark } from "@/components/yk-wordmark"

import { Panel, PanelHeader, PanelTitle } from "./panel"

const BrandContextMenu = dynamic(() =>
  import("@/components/brand-context-menu").then((mod) => mod.BrandContextMenu)
)

export function Brand() {
  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>Brand</PanelTitle>
      </PanelHeader>

      <BrandContextMenu>
        <div className="grid grid-cols-[2rem_1fr]">
          <div className="flex h-28 items-center justify-center border-r border-dashed border-line bg-background">
            <span className="rotate-270 text-sm text-muted-foreground select-none">
              Mark
            </span>
          </div>

          <div className="screen-line-bottom flex items-center justify-center pr-8 after:z-1">
            <YKMark className="h-8 w-auto sm:h-12" />
          </div>

          <div className="flex h-28 items-center justify-center border-r border-dashed border-line bg-background">
            <span className="rotate-270 text-sm text-muted-foreground select-none">
              Logotype
            </span>
          </div>

          <div className="screen-line-bottom flex items-center justify-center pr-8 after:z-1">
            <YKWordmark className="h-6 w-auto sm:h-10" />
          </div>
        </div>
      </BrandContextMenu>
    </Panel>
  )
}
