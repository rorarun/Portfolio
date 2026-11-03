import type { Project } from "./types";
export const projects: Project[] = [
  {
    id: "stream",
    slug: "agritwinxr",
    title: "AgriTwinXR",
    shortDescription: "Real-time telemetry. Engineered to keep up.",
    fullDescription:
      "An asynchronous streaming telemetry platform that ingests high-frequency sensor events across distributed services, with operational dashboards for real-time monitoring.",
    technologies: ["Python", "FastAPI", "WebSockets", "Docker"],
    category: ["Backend", "Data"],
    date: "Summer 2026",
    image: "/visuals/stream.svg",
    gallery: [],
    highlights: [
      "40% lower end-to-end transmission and ingestion latency",
      "Resilient connection pooling, heartbeat monitors, and backpressure buffers",
      "Zero dropped packets under burst traffic in project testing",
    ],
    metrics: [
      {
        value: "40%",
        label: "lower ingestion latency",
      },
    ],
    problem:
      "High-frequency sensor events require low-latency ingestion and resilient delivery under burst traffic.",
    solution:
      "Non-blocking event loops and compact serialization reduce transmission and ingestion latency.",
    architecture:
      "Sensor events \u2192 asynchronous telemetry pipeline \u2192 distributed services \u2192 monitoring endpoints and operational dashboards.",
    challenges:
      "Managing backpressure, connection health, and burst traffic without losing packets.",
    featured: true,
    published: true,
    displayOrder: 0,
  },
  {
    id: "storage",
    slug: "relational-storage-engine",
    title: "Relational storage engine",
    shortDescription: "Half a million records. Sub-second answers.",
    fullDescription:
      "A high-volume relational transaction and storage engine with normalized schemas, ACID transactional consistency, and automated concurrency benchmarks.",
    technologies: ["SQL", "PostgreSQL", "Python", "Concurrency"],
    category: ["Data", "Backend"],
    date: "Winter 2026",
    image: "/visuals/storage.svg",
    gallery: [],
    highlights: [
      "Modeled more than 500,000 records",
      "Reduced analytical query latency from 2.5 seconds to under 1 second",
      "Profiled execution plans and buffer pools to eliminate full-table scans",
    ],
    metrics: [
      {
        value: "500k+",
        label: "records modeled",
      },
      {
        value: "<1s",
        label: "analytical queries",
      },
    ],
    problem:
      "Large relational datasets and concurrent read/write pressure can create query bottlenecks and deadlocks.",
    solution:
      "Normalized schemas, partition schemes, disk indexing, health checks, and connection pooling.",
    architecture:
      "Concurrent benchmark clients \u2192 connection pool \u2192 PostgreSQL transaction and storage layer.",
    challenges:
      "Maintaining ACID consistency while resolving deadlocks and isolating resource bottlenecks.",
    featured: true,
    published: true,
    displayOrder: 1,
  },
  {
    id: "cloud",
    slug: "cloud-native-microservices",
    title: "Cloud-native microservices",
    shortDescription: "From commit to container, with confidence.",
    fullDescription:
      "Modular backend microservices with declarative configuration and automated multi-stage delivery pipelines.",
    technologies: ["TypeScript", "Docker", "GitHub Actions", "AWS"],
    category: ["Cloud", "Backend", "Security"],
    date: "Winter 2025",
    image: "/visuals/cloud.svg",
    gallery: [],
    highlights: [
      "40% reduction in container image footprint",
      "CI/CD enforces unit tests, linting, and container security scans",
      "Health-check endpoints and structured logging support failure triage",
    ],
    metrics: [
      {
        value: "40%",
        label: "smaller container images",
      },
    ],
    problem:
      "Backend services need reproducible deployments and automated quality checks across environments.",
    solution:
      "Declarative configuration layers and multi-stage CI/CD pipelines.",
    architecture:
      "GitHub Actions \u2192 unit tests, linting, security scans \u2192 multi-stage Docker builds \u2192 deployment.",
    challenges:
      "Reducing image size while keeping deployments reproducible and failures diagnosable.",
    featured: false,
    published: true,
    displayOrder: 2,
  },
  {
    id: "agent",
    slug: "autonomous-agent-runtime",
    title: "Autonomous agent runtime",
    shortDescription: "Intelligent workflows. Isolated execution.",
    fullDescription:
      "An extensible autonomous reasoning runtime for multi-step tasks, with deterministic schema guardrails and sandboxed tooling.",
    technologies: ["Python", "Docker", "Linux", "Asyncio"],
    category: ["AI/ML", "Backend", "Security"],
    date: "Summer 2026",
    image: "/visuals/agent.svg",
    gallery: [],
    highlights: [
      "Sub-200ms execution loops",
      "Containerized tool execution for process isolation",
      "Quantitative evaluation harnesses for stability and latency",
    ],
    metrics: [
      {
        value: "<200ms",
        label: "execution loops",
      },
    ],
    problem:
      "Multi-step autonomous workflows need reliable execution boundaries and predictable performance.",
    solution:
      "Async I/O, lightweight serialization, context pruning, and containerized tool execution.",
    architecture:
      "Reasoning runtime \u2192 schema guardrails \u2192 Docker tool sandbox \u2192 quantitative evaluation harness.",
    challenges:
      "Balancing low execution latency with process isolation and operational stability.",
    featured: false,
    published: true,
    displayOrder: 3,
  },
];
