import { featuredBooks } from "@/lib/home-data";

export function BookGridSection() {
  return (
    <section className="container py-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl">Featured Books</h2>
        <a href="#" className="text-sm text-[var(--accent)]">
          View all
        </a>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featuredBooks.map((book) => (
          <article key={book.title} className="surface rounded-2xl p-4 shadow-sm">
            <div className="mb-3 h-40 rounded-xl bg-[#f0e8dd]" />
            <h3 className="text-lg">{book.title}</h3>
            <p className="text-sm text-[var(--muted)]">{book.author}</p>
            <p className="mt-3 font-medium">{book.price}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
