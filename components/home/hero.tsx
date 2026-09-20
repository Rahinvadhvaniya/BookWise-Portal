export function HeroSection() {
  return (
    <section className="container grid gap-6 py-16 md:grid-cols-[1.2fr_1fr] md:items-center">
      <div>
        <p className="mb-3 text-sm uppercase tracking-[0.25em] text-[var(--muted)]">Discover. Read. Listen. Order.</p>
        <h1 className="mb-4 text-4xl leading-tight md:text-5xl">Your Next Great Story Starts Here.</h1>
        <p className="max-w-xl text-[var(--muted)]">
          Explore premium physical books and protected audiobooks in one modern storefront designed for real-world commerce.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-medium text-white">Explore Books</button>
          <button className="rounded-full border border-[var(--border)] px-6 py-3 text-sm font-medium">Explore Audiobooks</button>
        </div>
      </div>
      <div className="surface rounded-3xl p-6 shadow-sm">
        <h2 className="mb-3 text-2xl">Read Before You Buy</h2>
        <p className="text-sm text-[var(--muted)]">
          Every physical book can include a controlled preview section while keeping full copyrighted content protected.
        </p>
      </div>
    </section>
  );
}
