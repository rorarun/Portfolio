import type { Experience } from "./types";
export const experience: Experience[] = [
  {
    id: "nova",
    company: "Nova Data Solutions",
    role: "Data Entry Assistant",
    location: "Halifax, NS",
    startDate: "October 2024",
    endDate: "January 2025",
    description: "Data quality and Python-based workflow automation.",
    achievements: [
      "Eliminated 60% of manual validation effort with automated Python data processing workflows.",
      "Authored integration tests and diagnostics for API reliability and ingestion failures.",
      "Contributed technical documentation, onboarding guides, and troubleshooting runbooks.",
    ],
    technologies: ["Python", "Data validation", "Integration testing"],
    published: true,
    displayOrder: 0,
  },
  {
    id: "labatt",
    company: "Labatt Brewery",
    role: "Summer Student Warehouse Operator",
    location: "Halifax, NS",
    startDate: "Summers 2025",
    endDate: "2026",
    description: "High-volume warehouse logistics and distribution operations.",
    achievements: [
      "Maintained inventory tracking precision through data logging and verification audits.",
      "Followed industrial safety procedures with a zero-incident record.",
      "Worked with supervisors and equipment operators to identify bottlenecks and streamline throughput.",
    ],
    technologies: ["Inventory operations", "Teamwork", "Process improvement"],
    published: true,
    displayOrder: 1,
  },
];
