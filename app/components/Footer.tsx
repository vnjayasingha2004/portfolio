export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 text-sm text-slate-400 sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} Vinira Jayasingha</p>
        <p>Built with Next.js, Tailwind CSS, and Motion.</p>
      </div>
    </footer>
  );
}