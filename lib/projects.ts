export type StackGroup =
  | "Frontend"
  | "Backend"
  | "Database"
  | "Mobile"
  | "Desktop"
  | "AI"
  | "Security"
  | "Tooling"
  | "Language";

export type StackItem = {
  name: string;
  group: StackGroup;
  note?: string;
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectImage = {
  src: string;
  alt: string;
};

export type Project = {
  slug: string;
  title: string;
  eyebrow: string;
  type: string;
  year: string;
  status: string;
  role: string;
  summary: string;
  short: string;
  problem: string;
  approach: string;
  result: string;
  stack: StackItem[];
  highlights: string[];
  architecture: string[];
  images: ProjectImage[];
  links: ProjectLink[];
};

export const projects: Project[] = [
  {
    slug: "sprintflow-ai",
    title: "SprintFlow AI",
    eyebrow: "AI-powered planning SaaS",
    type: "Full-stack SaaS",
    year: "2026",
    status: "Public repository",
    role: "Product engineering, auth, AI workflow, UI system",
    summary:
      "A modern SaaS-style planning platform that turns prompts, files, and saved documents into structured projects, tasks, and detail pages with AI assistance.",
    short:
      "An AI planning workspace with protected accounts, generated plans, saved documents, project boards, and task-level AI support.",
    problem:
      "Planning tools often make users do the hard work before they see value. SprintFlow AI starts from messy input and converts it into a usable project structure quickly.",
    approach:
      "I designed the product around one core moment: describe the project, receive a usable plan, then refine it inside a dashboard. The app separates authentication, generation, project ownership, document storage, and task discussion into clear flows.",
    result:
      "A polished full-stack project that demonstrates product thinking, protected data flows, AI integration, responsive UI, and real-world SaaS patterns.",
    stack: [
      { name: "Next.js 16", group: "Frontend", note: "App Router interface" },
      { name: "TypeScript", group: "Language", note: "Typed product logic" },
      { name: "React", group: "Frontend", note: "Composable dashboard UI" },
      { name: "Tailwind CSS", group: "Frontend", note: "Design system styling" },
      { name: "Supabase", group: "Backend", note: "Auth and data" },
      { name: "PostgreSQL", group: "Database", note: "Project storage" },
      { name: "Gemini AI", group: "AI", note: "Planning assistant" },
      { name: "Route Guards", group: "Security", note: "Protected workspaces" },
    ],
    highlights: [
      "Protected authentication with Supabase Auth",
      "AI planner from prompt, uploaded file, or saved document",
      "Task detail page with built-in AI chat",
      "User-owned projects, tasks, documents, and storage",
      "Dashboard analytics, project boards, and responsive UI",
    ],
    architecture: [
      "Auth boundary keeps every project attached to the signed-in user.",
      "Planner flow converts user input into a structured project model.",
      "Task pages work as focused workspaces instead of static detail screens.",
      "The UI is intentionally SaaS-like: simple navigation, fast scanning, and strong empty states.",
    ],
    images: [
  {
    src: "/projects/sprintflow-dashboard.png",
    alt: "SprintFlow AI dashboard",
  },
  {
    src: "/projects/sprintflow-board.png",
    alt: "SprintFlow AI project board",
  },
],
    links: [
      { label: "View repository", href: "https://github.com/vnjayasingha2004/sprintflow-ai" },
    ],
  },
  {
    slug: "blindmatch-pas",
    title: "BlindMatch PAS",
    eyebrow: "Role-based academic workflow platform",
    type: "Enterprise-style web platform",
    year: "2025",
    status: "Public repository",
    role: "Backend, role workflows, secure proposal management",
    summary:
      "A project approval system for students, supervisors, module leaders, and admins with blind proposal submission, dashboards, validation, and secure review workflows.",
    short:
      "An academic proposal approval platform with role-separated dashboards and blind review workflows.",
    problem:
      "Project approval workflows become difficult to manage when every role needs different access, different actions, and a traceable review process.",
    approach:
      "I built the platform around role clarity. Each user type gets a dashboard and workflow tailored to their responsibility while the system keeps authentication and authorization strict.",
    result:
      "A practical ASP.NET Core project showing enterprise workflow design, secure data handling, validation, and multi-role product structure.",
    stack: [
      { name: "ASP.NET Core MVC", group: "Backend", note: "Application framework" },
      { name: "C#", group: "Language", note: "Backend application language" },
      { name: "SQL Server", group: "Database", note: "Relational database and queries" },
      { name: "Entity Framework", group: "Backend", note: "ORM and data access" },
      { name: "Identity", group: "Security", note: "Authentication and authorization" },
      { name: "Razor Views", group: "Frontend", note: "Role dashboards" },
      { name: "Validation", group: "Security", note: "Proposal checks" },
    ],
    highlights: [
      "Role-based dashboards for Student, Supervisor, Module Leader, and System Admin",
      "Blind proposal submission and review workflow",
      "Secure authentication and authorization with ASP.NET Core Identity",
      "Proposal attachments, validation, and admin oversight",
    ],
    architecture: [
      "Role separation is the main product rule, not just a UI feature.",
      "Proposal state changes are designed as a workflow rather than a simple CRUD table.",
      "Identity handles secure access while controllers keep review actions explicit.",
      "Dashboards surface only the actions relevant to each role.",
    ],
    images: [
      { src: "/projects/BlindMatch-sup.png", alt: "BlindMatch PAS Supervisor Dashboard mockup" },
      { src: "/projects/BlindMatch-stu.png", alt: "BlindMatch PAS Student Dashboard mockup" },
    ],
    links: [
      { label: "View repository", href: "https://github.com/vnjayasingha2004/BlindMatchPAS" },
    ],
  },
  {
    slug: "lawpoint",
    title: "LawPoint",
    eyebrow: "Legal services mobile platform",
    type: "Mobile product",
    year: "2025",
    status: "Public repository",
    role: "Mobile app engineering, secure flows, product UX",
    summary:
      "A legal-tech mobile platform for verified lawyers, appointment booking, secure messaging, notifications, and case-related document handling.",
    short:
      "A lawyer discovery and appointment booking mobile app with secure client-lawyer communication.",
    problem:
      "Legal help can feel hard to access because people need trust, availability, clear communication, and document handling in one place.",
    approach:
      "I treated LawPoint like a service marketplace with trust at the center: verified profiles, appointment flow, messaging, notifications, and document support.",
    result:
      "A mobile-first product that communicates how I think through real service workflows, not only screens.",
    stack: [
      { name: "Flutter", group: "Mobile", note: "Cross-platform app" },
      { name: "Dart", group: "Language", note: "Mobile logic" },
      { name: "Firebase Auth", group: "Security", note: "User accounts" },
      { name: "Firestore", group: "Database", note: "Realtime data" },
      { name: "Cloud Storage", group: "Backend", note: "Documents" },
      { name: "Push Notifications", group: "Mobile", note: "Case updates" },
    ],
    highlights: [
      "Verified lawyer profiles and discovery flow",
      "Appointment booking and status updates",
      "Secure client-lawyer messaging",
      "Document handling for case-related files",
      "Mobile-first product structure",
    ],
    architecture: [
      "User trust is designed into the profile, booking, and communication flow.",
      "Firebase services keep authentication, realtime data, and documents connected.",
      "The mobile UI prioritizes quick decisions and simple status visibility.",
      "Notification moments are treated as part of the product experience.",
    ],
   images: [
  {
    src: "/projects/lawpoint-home.png",
    alt: "LawPoint home screen",
  },
  {
    src: "/projects/lawpoint-booking.png",
    alt: "LawPoint appointment booking screen",
  },
],
    links: [
      { label: "View repository", href: "https://github.com/vnjayasingha2004/Lawpoint_App" },
    ],
  },
  {
    slug: "safesound",
    title: "SafeSound",
    eyebrow: "Safety-focused mobile experience",
    type: "Mobile app",
    year: "2025",
    status: "Public repository",
    role: "Mobile development, emergency UX, location-aware flows",
    summary:
      "A personal safety mobile app concept focused on emergency actions, trusted contacts, alerts, and fast access to safety features.",
    short:
      "A safety mobile app that makes emergency actions and trusted contact flows easier to access.",
    problem:
      "Safety apps need to be fast, calm, and reliable. In stressful moments, the interface must reduce friction rather than add decisions.",
    approach:
      "I focused the experience around visible emergency actions, trusted contacts, simple states, and location-aware support so the user never has to search deeply.",
    result:
      "A mobile project that shows UX sensitivity, real-time thinking, and practical feature planning for safety-critical scenarios.",
    stack: [
      { name: "Flutter", group: "Mobile", note: "Cross-platform app" },
      { name: "Dart", group: "Language", note: "App logic" },
      { name: "Firebase", group: "Backend", note: "Realtime services" },
      { name: "Maps", group: "Mobile", note: "Location context" },
      { name: "Notifications", group: "Mobile", note: "Emergency updates" },
      { name: "Auth Rules", group: "Security", note: "User protection" },
    ],
    highlights: [
      "Emergency-focused mobile interface",
      "Trusted contacts and alert flows",
      "Location-aware product thinking",
      "Fast access interaction design",
    ],
    architecture: [
      "The emergency action sits at the center of the product hierarchy.",
      "Contacts, alerts, and location are modeled as connected safety signals.",
      "The interface keeps visual noise low for stressful-use scenarios.",
      "Firebase-style services support auth, alerts, and realtime state.",
    ],
    images: [
  {
    src: "/projects/safesound-dashboard.png",
    alt: "SafeSound dashboard",
  },
  {
    src: "/projects/safesound-meter.png",
    alt: "SafeSound safety meter",
  },
],
    links: [
      { label: "View repository", href: "https://github.com/vnjayasingha2004/safesound-app" },
    ],
  },
  {
    slug: "offline-hardware-pos",
    title: "Offline Hardware POS + Inventory System",
    eyebrow: "Desktop app built for a real business",
    type: "Desktop product",
    year: "2025",
    status: "Private client project",
    role: "Desktop engineering, inventory workflow, offline-first architecture",
    summary:
      "An offline desktop POS system designed for a hardware business with billing, local inventory management, barcode checkout, and receipt printing.",
    short:
      "A real business desktop POS with billing, stock tracking, barcode checkout, and receipt printing.",
    problem:
      "The business needed a practical system that could run locally, continue working offline, and support everyday checkout and stock management without complexity.",
    approach:
      "I designed it as an offline-first desktop app with local SQLite storage, barcode-based cart flow, inventory tracking, receipt printing, and safe Electron boundaries.",
    result:
      "A client-ready product that shows I can build software for real business constraints, not just public demo projects.",
    stack: [
      { name: "Electron", group: "Desktop", note: "Desktop shell" },
      { name: "JavaScript", group: "Language", note: "Application logic" },
      { name: "HTML", group: "Frontend", note: "Interface structure" },
      { name: "CSS", group: "Frontend", note: "Desktop UI" },
      { name: "SQLite", group: "Database", note: "Offline storage" },
      { name: "Barcode Flow", group: "Desktop", note: "Checkout speed" },
      { name: "Receipt Print", group: "Desktop", note: "Business output" },
      { name: "IPC Bridge", group: "Security", note: "Safe desktop boundary" },
    ],
    highlights: [
      "Offline-first billing and inventory tracking",
      "Barcode workflow, cart totals, and local SQLite storage",
      "Auto receipt printing and cash drawer support",
      "Secure Electron preload.js and IPC bridge approach",
    ],
    architecture: [
      "Local-first storage keeps the business operational without internet dependency.",
      "Checkout is optimized around speed: scan, quantity, cart, receipt.",
      "Electron IPC boundaries keep privileged actions away from the renderer layer.",
      "The project is presented as a private client build rather than a public repository.",
    ],
    images: [
      { src: "/projects/pos-billing.png", alt: "Offline Hardware POS billing mockup" },
      { src: "/projects/pos-dashbaord.png", alt: "Offline Hardware POS dashboard mockup" },
    ],
    links: [],
  },
];

const allStack = new Map<string, StackItem>();
projects.forEach((project) => {
  project.stack.forEach((item) => {
    if (!allStack.has(item.name)) allStack.set(item.name, item);
  });
});

export const globalStack: StackItem[] = Array.from(allStack.values()).slice(0, 22);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return projects[0];
  return projects[(index + 1) % projects.length];
}
