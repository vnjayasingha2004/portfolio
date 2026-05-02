export type ProjectLink = {
  label: string;
  href: string;
  kind?: "primary" | "secondary";
};

export type ProjectImage = {
  src: string;
  alt: string;
  caption: string;
};

export type Project = {
  slug: string;
  title: string;
  eyebrow: string;
  timeline: string;
  short: string;
  intro: string;
  story: string[];
  stack: string[];
  features: string[];
  outcomes: string[];
  role: string[];
  links: ProjectLink[];
  theme: {
    from: string;
    via: string;
    to: string;
    accent: string;
  };
  images: ProjectImage[];
  metrics: { label: string; value: string }[];
};

export const projects: Project[] = [
  {
    slug: "sprintflow-ai",
    title: "SprintFlow AI",
    eyebrow: "AI-powered project planning SaaS",
    timeline: "2026",
    short:
      "A modern project planning platform that turns prompts, files, and saved documents into structured project plans with AI support.",
    intro:
      "SprintFlow AI presents your SaaS work as a polished product: protected workspaces, AI planning flows, task detail pages, and a clean dashboard experience built for real project teams.",
    story: [
      "The goal was to make project planning feel faster and less manual. A user can start with a rough idea, upload or save context, then use AI assistance to shape that context into practical project structure.",
      "The redesigned case-study page frames the project like a professional SaaS product instead of just a code sample. It highlights authentication, planning flow, ownership boundaries, dashboards, and the AI chat experience.",
      "The UI direction uses crisp cards, energetic blue gradients, a command-center feel, and motion details that make the platform feel modern without sacrificing readability."
    ],
    stack: ["Next.js 16", "TypeScript", "React", "Tailwind CSS", "Supabase", "Gemini AI"],
    features: [
      "Protected authentication with Supabase Auth",
      "AI planner from prompt, file, or saved document",
      "Task detail page with built-in AI chat",
      "User-owned projects, tasks, documents, and storage",
      "Dashboard analytics, project boards, and responsive UI"
    ],
    outcomes: [
      "Turns a raw project idea into structured execution steps",
      "Shows full-stack SaaS thinking with product-level flows",
      "Creates a strong first impression for internship and junior roles"
    ],
    role: [
      "Designed the project experience, planning flow, and dashboard presentation",
      "Built authentication-protected product areas and AI-assisted planning interactions",
      "Organized data ownership for projects, documents, tasks, and stored content",
      "Focused the portfolio story around product clarity and real user value"
    ],
    links: [
      { label: "View repository", href: "https://github.com/vnjayasingha2004/sprintflow-ai", kind: "primary" },
      { label: "Ask about this project", href: "mailto:viniraj20040806@gmail.com?subject=SprintFlow%20AI%20project" }
    ],
    theme: {
      from: "#1d4ed8",
      via: "#0891b2",
      to: "#111827",
      accent: "#67e8f9"
    },
    images: [
      {
        src: "/projects/sprintflow-ai/hero.svg",
        alt: "SprintFlow AI dashboard mockup",
        caption: "Dashboard concept with planning states and AI guidance"
      },
      {
        src: "/projects/sprintflow-ai/planner.svg",
        alt: "SprintFlow AI planner mockup",
        caption: "Prompt-to-plan workflow with project generation details"
      },
      {
        src: "/projects/sprintflow-ai/detail.svg",
        alt: "SprintFlow AI task chat mockup",
        caption: "Task detail page with AI chat and execution notes"
      }
    ],
    metrics: [
      { label: "Build type", value: "SaaS platform" },
      { label: "Core flow", value: "AI planning" },
      { label: "Focus", value: "Auth + UX" }
    ]
  },
  {
    slug: "blindmatch-pas",
    title: "BlindMatch PAS",
    eyebrow: "Role-based academic workflow platform",
    timeline: "2026",
    short:
      "A project approval system for students, supervisors, module leaders, and admins with blind proposal submission and secure review workflows.",
    intro:
      "BlindMatch PAS is positioned as an enterprise-style academic workflow product with role separation, approvals, proposal attachments, validation, and secure administration.",
    story: [
      "Academic approval workflows can become slow and unclear when every role uses the same process. BlindMatch PAS separates responsibilities so students, supervisors, module leaders, and system admins each see the right dashboard and actions.",
      "The product story highlights blind proposal submission, review workflows, attachments, and administrative oversight. It also communicates that the project was built with a security-first mindset through identity, authorization, and controlled access.",
      "The new design gives it a serious enterprise feel: structured panels, status indicators, role cards, and review timeline visuals."
    ],
    stack: ["ASP.NET Core MVC", "C#", "SQL Server", "Entity Framework Core", "Identity"],
    features: [
      "Role-based dashboards for Student, Supervisor, Module Leader, and System Admin",
      "Blind proposal submission and review workflow",
      "Secure authentication and authorization with ASP.NET Core Identity",
      "Proposal attachments, validation, and admin oversight",
      "Structured approval states and workflow visibility"
    ],
    outcomes: [
      "Clarifies complex approval responsibilities",
      "Demonstrates enterprise workflow and secure data handling",
      "Shows backend discipline beyond simple CRUD screens"
    ],
    role: [
      "Mapped the approval workflow and user-role boundaries",
      "Implemented secure authentication and authorization patterns",
      "Designed dashboards that keep each role focused on relevant actions",
      "Structured proposal review, validation, attachment, and admin flows"
    ],
    links: [
      { label: "View repository", href: "https://github.com/vnjayasingha2004/BlindMatchPAS", kind: "primary" },
      { label: "Alternate repo", href: "https://github.com/vnjayasingha2004/BlindMatchPAS_" },
      { label: "Ask about this project", href: "mailto:viniraj20040806@gmail.com?subject=BlindMatch%20PAS%20project" }
    ],
    theme: {
      from: "#1e3a8a",
      via: "#312e81",
      to: "#0f172a",
      accent: "#93c5fd"
    },
    images: [
      {
        src: "/projects/blindmatch-pas/hero.svg",
        alt: "BlindMatch PAS dashboard mockup",
        caption: "Role-based dashboard concept for academic review workflows"
      },
      {
        src: "/projects/blindmatch-pas/review.svg",
        alt: "BlindMatch PAS review workflow mockup",
        caption: "Blind proposal review flow with approval states"
      },
      {
        src: "/projects/blindmatch-pas/admin.svg",
        alt: "BlindMatch PAS admin mockup",
        caption: "Admin oversight and validation screens"
      }
    ],
    metrics: [
      { label: "Roles", value: "4 user types" },
      { label: "Core flow", value: "Approvals" },
      { label: "Focus", value: "Security" }
    ]
  },
  {
    slug: "lawpoint",
    title: "LawPoint",
    eyebrow: "Full-stack legal services mobile platform",
    timeline: "2026",
    short:
      "A legal-tech app for lawyer verification, appointment booking, secure messaging, document locker features, case tracking, and multilingual knowledge access.",
    intro:
      "LawPoint is framed as a trust-focused legal services platform where clients can find verified lawyers, book appointments, communicate safely, and access legal knowledge in multiple languages.",
    story: [
      "Legal services depend on trust, privacy, and clarity. LawPoint brings those needs into a mobile-first product experience with lawyer verification, scheduling, messaging, and document handling.",
      "The case study explains the practical product flows: verified profiles, bookings, reminders, secure client-lawyer communication, legal locker features, and multilingual legal education.",
      "The redesigned visuals use a premium legal-tech look with deep blues, crisp cards, trust indicators, and mobile UI mockups that communicate the product quickly."
    ],
    stack: ["Flutter", "Node.js", "Express.js", "PostgreSQL", "Secure Storage"],
    features: [
      "Verified lawyer profiles and admin verification workflow",
      "Booking, scheduling, reminders, and client-lawyer messaging",
      "Legal locker with security-focused document handling",
      "Case tracking and profile management",
      "English, Sinhala, and Tamil knowledge hub support"
    ],
    outcomes: [
      "Presents a complete mobile product with trust and security flows",
      "Shows cross-platform mobile and backend integration skills",
      "Demonstrates attention to sensitive user data and multilingual access"
    ],
    role: [
      "Built mobile screens and core user journeys for clients and lawyers",
      "Designed secure verification, reset, and storage-oriented flows",
      "Connected app features with backend endpoints and data models",
      "Prioritized usability for appointments, messages, and legal resources"
    ],
    links: [
      { label: "View repository", href: "https://github.com/vnjayasingha2004/Lawpoint_App", kind: "primary" },
      { label: "Ask about this project", href: "mailto:viniraj20040806@gmail.com?subject=LawPoint%20project" }
    ],
    theme: {
      from: "#172554",
      via: "#0f766e",
      to: "#0f172a",
      accent: "#5eead4"
    },
    images: [
      {
        src: "/projects/lawpoint/hero.svg",
        alt: "LawPoint mobile app mockup",
        caption: "Mobile-first legal services and lawyer discovery experience"
      },
      {
        src: "/projects/lawpoint/booking.svg",
        alt: "LawPoint booking mockup",
        caption: "Booking and schedule flow for verified lawyers"
      },
      {
        src: "/projects/lawpoint/locker.svg",
        alt: "LawPoint legal locker mockup",
        caption: "Sensitive document and legal locker concept"
      }
    ],
    metrics: [
      { label: "Platform", value: "Mobile app" },
      { label: "Core flow", value: "Bookings" },
      { label: "Focus", value: "Trust" }
    ]
  },
  {
    slug: "safesound",
    title: "SafeSound",
    eyebrow: "Real-time hearing safety mobile app",
    timeline: "2026",
    short:
      "A mobile app that uses live microphone input to monitor sound exposure, detect sound scenes, and guide users with hearing-safety insights.",
    intro:
      "SafeSound turns environmental sound into useful safety feedback with real-time monitoring, exposure alerts, scene detection, saved sessions, and hearing profile controls.",
    story: [
      "The idea behind SafeSound is simple: people often do not know when sound exposure becomes unsafe. The app makes that hidden risk visible through live monitoring and user-friendly alerts.",
      "The product story communicates real-time monitoring, scene recognition, history, trends, CSV export, location tagging, and personalized thresholds. It is a strong mobile project because it uses device capabilities for practical impact.",
      "The redesign gives it a health-tech energy with green/cyan gradients, live meter visuals, and mobile analytics panels."
    ],
    stack: ["Flutter", "Dart", "Mobile Sensors", "Local Storage", "CSV Export"],
    features: [
      "Real-time live sound monitoring and unsafe exposure alerts",
      "Sound-scene detection for traffic, crowd, conversation, machinery, music/event, and quiet indoor",
      "History, trends, CSV export, location tagging, and coach summaries",
      "Personalized threshold settings and listening insights",
      "Saved sessions and hearing profile settings"
    ],
    outcomes: [
      "Shows mobile sensor usage with a meaningful safety purpose",
      "Turns live data into simple guidance for real users",
      "Demonstrates dashboards, history, export, and personalization"
    ],
    role: [
      "Designed the mobile monitoring experience and alert states",
      "Built sound-session history, data views, and export-oriented flows",
      "Worked on threshold settings and user profile personalization",
      "Focused copy and visuals around practical hearing safety"
    ],
    links: [
      { label: "View repository", href: "https://github.com/vnjayasingha2004/safesound-app", kind: "primary" },
      { label: "Ask about this project", href: "mailto:viniraj20040806@gmail.com?subject=SafeSound%20project" }
    ],
    theme: {
      from: "#14532d",
      via: "#0f766e",
      to: "#111827",
      accent: "#86efac"
    },
    images: [
      {
        src: "/projects/safesound/hero.svg",
        alt: "SafeSound monitoring mockup",
        caption: "Live sound exposure dashboard with alert states"
      },
      {
        src: "/projects/safesound/history.svg",
        alt: "SafeSound history mockup",
        caption: "Saved sessions, history trends, and export experience"
      },
      {
        src: "/projects/safesound/profile.svg",
        alt: "SafeSound profile mockup",
        caption: "Personal thresholds and hearing coach settings"
      }
    ],
    metrics: [
      { label: "Platform", value: "Flutter" },
      { label: "Core flow", value: "Live audio" },
      { label: "Focus", value: "Safety" }
    ]
  },
  {
    slug: "offline-hardware-pos",
    title: "Offline Hardware POS + Inventory System",
    eyebrow: "Desktop app built for a real business",
    timeline: "2026",
    short:
      "An offline desktop POS system for Sumith Hardware with billing, inventory management, barcode checkout, receipt printing, and local SQLite storage.",
    intro:
      "This project is presented as a real client product: an offline-first desktop POS and inventory system built for a hardware shop that needed reliable billing without depending on internet access.",
    story: [
      "Small businesses need software that works even when the internet does not. This POS system focuses on practical store operations: billing, barcode checkout, local stock tracking, receipt printing, and cash drawer support.",
      "Because it was built and sold as a real client project, the portfolio presents it as a practical product build rather than a public repository. The case study emphasizes reliability, offline storage, and desktop hardware integration.",
      "The redesigned page uses warmer colors and point-of-sale visuals to separate it from the SaaS and mobile projects while still matching the overall portfolio system."
    ],
    stack: ["Electron", "HTML", "CSS", "JavaScript", "SQLite", "Receipt Printing"],
    features: [
      "Offline-first billing and inventory tracking",
      "Barcode workflow, cart totals, and local SQLite storage",
      "Auto receipt printing and cash drawer support",
      "Secure Electron preload.js and IPC bridge approach",
      "Built and sold as a real client project"
    ],
    outcomes: [
      "Proves ability to build practical software for a real business",
      "Shows desktop app and local database engineering",
      "Highlights reliability and hardware-oriented product thinking"
    ],
    role: [
      "Designed the POS billing flow around shop counter speed",
      "Built offline inventory tracking with local SQLite storage",
      "Integrated receipt printing and desktop hardware assumptions",
      "Delivered a private client product focused on real daily use"
    ],
    links: [
      { label: "Private client project", href: "mailto:viniraj20040806@gmail.com?subject=Offline%20Hardware%20POS%20project", kind: "primary" },
      { label: "Ask about this project", href: "mailto:viniraj20040806@gmail.com?subject=Offline%20Hardware%20POS%20project" }
    ],
    theme: {
      from: "#78350f",
      via: "#92400e",
      to: "#111827",
      accent: "#fdba74"
    },
    images: [
      {
        src: "/projects/offline-hardware-pos/hero.svg",
        alt: "Offline Hardware POS checkout mockup",
        caption: "Checkout screen with cart, barcode, and totals"
      },
      {
        src: "/projects/offline-hardware-pos/inventory.svg",
        alt: "Offline Hardware POS inventory mockup",
        caption: "Inventory management and local stock control"
      },
      {
        src: "/projects/offline-hardware-pos/receipt.svg",
        alt: "Offline Hardware POS receipt mockup",
        caption: "Receipt printing and transaction summary concept"
      }
    ],
    metrics: [
      { label: "Build type", value: "Desktop POS" },
      { label: "Core flow", value: "Offline billing" },
      { label: "Focus", value: "Real client" }
    ]
  }
];

export const featuredProjects = projects.slice(0, 3);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
