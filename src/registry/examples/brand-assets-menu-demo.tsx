"use client"

import Link from "next/link"

import { BrandAssetsMenu } from "@/registry/transformed/components/brand-assets-menu"

export default function BrandAssetsMenuDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <BrandAssetsMenu
        logomark={<YKMark />}
        logomarkSVG={LOGOMARK_SVG}
        logotypeSVG={LOGOTYPE_SVG}
        brandGuidelinesURL="https://youssefkandeel.com/blog/yk-brand"
        brandAssetsURL="https://assets.chanhdai.com/chanhdai-brand.zip"
      >
        <Link href="/" aria-label="Home">
          <YKMark className="h-8 text-foreground" />
        </Link>
      </BrandAssetsMenu>

      <div className="text-sm text-muted-foreground">
        <span className="hidden pointer-fine:inline-block">
          Right-click the logo
        </span>
        <span className="hidden pointer-coarse:inline-block">
          Press & hold the logo
        </span>
      </div>
    </div>
  )
}

const LOGOMARK_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 256 160"><path fill="currentColor" d="M0 0h32v64h-32ZM64 0h32v64h-32ZM128 0h32v160h-32ZM224 0h32v32h-32ZM192 32h32v32h-32ZM32 64h32v96h-32ZM160 64h32v32h-32ZM192 96h32v32h-32ZM224 128h32v32h-32Z"/></svg>'

const LOGOTYPE_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 2280 320"><path fill="currentColor" d="M0 0h64v128h-64ZM128 0h64v128h-64ZM256 0h64v320h-64ZM448 0h64v64h-64ZM384 64h64v64h-64ZM64 128h64v192h-64ZM320 128h64v64h-64ZM384 192h64v64h-64ZM448 256h64v64h-64ZM640 0h40v120h-40ZM800 0h40v120h-40ZM680 120h40v40h-40ZM760 120h40v40h-40ZM720 160h40v160h-40ZM920 80h120v40h-120ZM880 120h40v160h-40ZM1040 120h40v160h-40ZM920 280h120v40h-120ZM1120 80h40v200h-40ZM1280 80h40v240h-40ZM1160 280h120v40h-120ZM1400 80h160v40h-160ZM1360 120h40v40h-40ZM1400 160h120v40h-120ZM1520 200h40v80h-40ZM1360 240h40v40h-40ZM1400 280h120v40h-120ZM1640 80h160v40h-160ZM1600 120h40v40h-40ZM1640 160h120v40h-120ZM1760 200h40v80h-40ZM1600 240h40v40h-40ZM1640 280h120v40h-120ZM1880 80h120v40h-120ZM1840 120h40v160h-40ZM2000 120h40v80h-40ZM1880 160h120v40h-120ZM2000 240h40v40h-40ZM1880 280h120v40h-120ZM2160 0h120v40h-120ZM2120 40h40v280h-40ZM2080 120h40v40h-40ZM2160 120h80v40h-80Z"/></svg>'

function YKMark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 512 320"
      aria-hidden
      {...props}
    >
      <path
        fill="currentColor"
        d="M0 0h64v128h-64ZM128 0h64v128h-64ZM256 0h64v320h-64ZM448 0h64v64h-64ZM384 64h64v64h-64ZM64 128h64v192h-64ZM320 128h64v64h-64ZM384 192h64v64h-64ZM448 256h64v64h-64Z"
      />
    </svg>
  )
}
