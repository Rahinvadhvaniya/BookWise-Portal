import Link from "next/link";

const navLinks = [
  { label: "Books", href: "/books" },
  { label: "Audiobooks", href: "/audiobooks" },
  { label: "Categories", href: "/books" },
  { label: "Best Sellers", href: "/books" },
  { label: "New Arrivals", href: "/books" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="font-semibold tracking-wide">
          BookWise Portal
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-[var(--muted)] md:flex">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className="transition hover:text-[var(--foreground)]">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button className="rounded-full border border-[var(--border)] px-4 py-2 text-sm">Login</button>
          <button className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm text-white">
            Cart (0)
          </button>
        </div>
      </div>
    </header>
  );
}
