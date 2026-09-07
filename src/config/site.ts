import type { Route } from "next"

import type { NavItem } from "@/types/nav"
import { SOCIAL } from "@/features/portfolio/data/social-links"
import { USER } from "@/features/portfolio/data/user"

export const SITE_INFO = {
  name: USER.displayName,
  url: process.env.NEXT_PUBLIC_APP_URL || "https://youssefkandeel.com",
  ogImage: USER.ogImage,
  description: USER.bio,
  keywords: USER.keywords,
}

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
}

export const MAIN_NAV: NavItem<Route>[] = []

export const MOBILE_NAV: NavItem<Route>[] = [
  {
    title: "Home",
    href: "/",
  },
  ...MAIN_NAV,
]

export const GITHUB_USERNAME = SOCIAL.github.handle
export const SOURCE_CODE_GITHUB_REPO = "youssefkandeel/youssefkandeel.com"
export const SOURCE_CODE_GITHUB_URL =
  "https://github.com/youssefkandeel/youssefkandeel.com"

export const SPONSORSHIP_URL = "https://github.com/sponsors/youssefkandeel"

export const UTM_PARAMS = {
  utm_source: "youssefkandeel.com",
}
