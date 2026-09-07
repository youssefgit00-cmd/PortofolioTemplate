import type { User } from "@/features/portfolio/types/user"

// TODO: Values marked PLACEHOLDER are stand-ins so the site builds and renders.
// Replace them before publishing.
export const USER: User = {
  firstName: "Youssef",
  lastName: "Kandeel",
  displayName: "Youssef",
  username: "youssefkandeel",
  gender: "male", // PLACEHOLDER
  pronouns: "he/him", // PLACEHOLDER
  bio: "Utilising Intelligence to solve problems",
  flipSentences: ["Utilising Intelligence to solve problems", "Ai Engineer."],
  address: "Sydney", // PLACEHOLDER: e.g. "Cairo, Egypt"
  phoneNumberB64: "MDQ4MjA0NzMyOQ==", // PLACEHOLDER: E.164, base64 encoded
  emailB64: "eW91c3NlZi5rYW5kZWVsMDBAZ21haWwuY29tCg==", // PLACEHOLDER: hello@youssefkandeel.com
  website: "https://youssefkandeel.com",
  jobTitle: "Ai Engineer", // PLACEHOLDER
  jobs: [],
  about: `- I'm Youssef Kandeel, a software engineer.
- This section supports Markdown. Replace it with your own introduction.
`,
  avatar: "/images/avatar/light-off.svg",
  avatarVariants: {
    lightOff: "/images/avatar/light-off.svg",
    lightOn: "/images/avatar/light-on.svg",
    darkOff: "/images/avatar/dark-off.svg",
    darkOn: "/images/avatar/dark-on.svg",
  },
  ogImage:
    "/og/simple?title=Youssef%20Kandeel&description=Building%20for%20the%20web.",
  namePronunciationUrl: "",
  timeZone: "Africa/Cairo", // PLACEHOLDER
  keywords: [
    "youssefkandeel",
    "youssef kandeel",
    "youssef",
    "kandeel",
  ],
  dateCreated: "2026-09-06", // YYYY-MM-DD
}
