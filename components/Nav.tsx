import Link from "next/link";
import { profile } from "@/lib/profile";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/#stack", label: "Stack" },
  { href: "/#contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className="site-nav">
      <Link href="/" className="brand-mark" aria-label={`${profile.name} home`}>
        <span>{profile.initials}</span>
        <strong>{profile.name}</strong>
      </Link>
      <nav aria-label="Primary navigation">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
