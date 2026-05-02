import type { StackItem } from "@/lib/projects";

const logoMap: Record<string, string> = {
  "Next.js 16": "https://cdn.simpleicons.org/nextdotjs/ffffff",
  "Next.js": "https://cdn.simpleicons.org/nextdotjs/ffffff",
  TypeScript: "https://cdn.simpleicons.org/typescript/3178C6",
  React: "https://cdn.simpleicons.org/react/61DAFB",
  "Tailwind CSS": "https://cdn.simpleicons.org/tailwindcss/06B6D4",
  Tailwind: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
  Supabase: "https://cdn.simpleicons.org/supabase/3ECF8E",
  PostgreSQL: "https://cdn.simpleicons.org/postgresql/4169E1",
  "Gemini AI": "https://cdn.simpleicons.org/googlegemini/8E75B2",
  "ASP.NET Core MVC": "https://cdn.simpleicons.org/dotnet/512BD4",
  "ASP.NET": "https://cdn.simpleicons.org/dotnet/512BD4",
  "Entity Framework": "https://cdn.simpleicons.org/dotnet/512BD4",
  "Razor Views": "https://cdn.simpleicons.org/dotnet/512BD4",
  Identity: "https://cdn.simpleicons.org/auth0/EB5424",
  "C#": "https://cdn.simpleicons.org/csharp/512BD4",
  "SQL Server": "https://cdn.simpleicons.org/microsoftsqlserver/CC2927",
  Flutter: "https://cdn.simpleicons.org/flutter/02569B",
  Dart: "https://cdn.simpleicons.org/dart/0175C2",
  Firebase: "https://cdn.simpleicons.org/firebase/FFCA28",
  Firestore: "https://cdn.simpleicons.org/firebase/FFCA28",
  "Firebase Auth": "https://cdn.simpleicons.org/firebase/FFCA28",
  "Cloud Storage": "https://cdn.simpleicons.org/googlecloud/4285F4",
  "Push Notifications": "https://cdn.simpleicons.org/firebase/FFCA28",
  Notifications: "https://cdn.simpleicons.org/firebase/FFCA28",
  "Auth Rules": "https://cdn.simpleicons.org/firebase/FFCA28",
  Maps: "https://cdn.simpleicons.org/googlemaps/4285F4",
  "Node.js": "https://cdn.simpleicons.org/nodedotjs/5FA04E",
  "Express.js": "https://cdn.simpleicons.org/express/ffffff",
  Electron: "https://cdn.simpleicons.org/electron/47848F",
  JavaScript: "https://cdn.simpleicons.org/javascript/F7DF1E",
  HTML: "https://cdn.simpleicons.org/html5/E34F26",
  CSS: "https://cdn.simpleicons.org/css3/1572B6",
  SQLite: "https://cdn.simpleicons.org/sqlite/003B57",
  Git: "https://cdn.simpleicons.org/git/F05032",
};

function fallback(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

export function TechIcon({ item }: { item: StackItem }) {
  const src = logoMap[item.name];

  return (
    <span className="tech-logo" aria-hidden="true">
      {src ? (
        <img src={src} alt="" loading="lazy" draggable={false} referrerPolicy="no-referrer" />
      ) : (
        <span className="tech-logo-fallback">{fallback(item.name)}</span>
      )}
    </span>
  );
}
