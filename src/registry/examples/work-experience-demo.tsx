import { CodeXmlIcon, LightbulbIcon } from "lucide-react"

import type { ExperienceItemType } from "@/registry/transformed/components/work-experience"
import { WorkExperience } from "@/registry/transformed/components/work-experience"

export default function WorkExperienceDemo() {
  return <WorkExperience className="w-full" experiences={WORK_EXPERIENCE} />
}

const WORK_EXPERIENCE: ExperienceItemType[] = [
  {
    id: "northwind",
    companyName: "Northwind Labs",
    companyLogo: "https://avatar.vercel.sh/northwind",
    companyWebsite: "https://example.com",
    positions: [
      {
        id: "2",
        title: "Design Engineer",
        employmentPeriod: {
          start: "03.2024",
        },
        employmentType: "Part-time",
        icon: <CodeXmlIcon />,
        description: `- Integrated VNPAY-QR for secure transactions.
- Registered the e-commerce site with [online.gov.vn](https://online.gov.vn) for compliance.
- Developed online ordering to streamline purchases.
- Built and maintained the docs site with Docusaurus.
- Shipped a browser extension across Chrome, Safari, Edge, and Firefox — 15,000+ active users.`,
        skills: [
          "Next.js",
          "Strapi",
          "Auth0",
          "VNPAY-QR",
          "Docker",
          "NGINX",
          "Google Cloud",
          "Docusaurus",
          "Extension",
          "Research",
          "Project Management",
        ],
        isExpanded: true,
      },
      {
        id: "1",
        title: "Founder",
        employmentPeriod: {
          start: "03.2024",
        },
        employmentType: "Part-time",
        icon: <LightbulbIcon />,
        skills: ["Business Ownership", "Business Law", "Business Tax"],
      },
    ],
    isCurrentEmployer: true,
  },
]
