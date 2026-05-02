import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-slate-950/60 px-5 py-8 text-sm text-slate-400 backdrop-blur-xl sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Vinira Jayasingha. Designed for product clarity.</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/projects" className="transition hover:text-white">Projects</Link>
          <a href="https://github.com/vnjayasingha2004" target="_blank" rel="noreferrer" className="transition hover:text-white">GitHub</a>
          <a href="mailto:viniraj20040806@gmail.com" className="transition hover:text-white">Email</a>
        </div>
      </div>
    </footer>
  );
}
