export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-8">
      <div className="container flex flex-col gap-2 text-sm text-[var(--muted)] md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} BookWise Portal</p>
        <p>Discover. Read. Listen. Order.</p>
      </div>
    </footer>
  );
}
