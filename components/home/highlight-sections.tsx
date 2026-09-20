import { categories, testimonials, whyBookWise } from "@/lib/home-data";

export function HighlightSections() {
  return (
    <>
      <section className="container py-12">
        <h2 className="mb-6 text-3xl">Categories</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <span key={category} className="rounded-full border border-[var(--border)] px-4 py-2 text-sm">
              {category}
            </span>
          ))}
        </div>
      </section>

      <section className="container py-8">
        <h2 className="mb-6 text-3xl">Why BookWise</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {whyBookWise.map((item) => (
            <article key={item} className="surface rounded-2xl p-5">
              <p className="text-sm text-[var(--muted)]">{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container py-12">
        <h2 className="mb-6 text-3xl">Customer Reviews</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {testimonials.map((review) => (
            <article key={review.name} className="surface rounded-2xl p-5">
              <p className="text-sm text-[var(--muted)]">“{review.quote}”</p>
              <p className="mt-3 text-sm font-semibold">{review.name}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container pb-16">
        <div className="surface rounded-3xl p-8 text-center">
          <h2 className="text-3xl">Join the BookWise Newsletter</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-[var(--muted)]">
            Get weekly recommendations, launch offers, and audiobook highlights.
          </p>
          <div className="mx-auto mt-6 flex max-w-md gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-full border border-[var(--border)] bg-transparent px-4 py-2 text-sm outline-none"
            />
            <button className="rounded-full bg-[var(--accent)] px-5 py-2 text-sm text-white">Subscribe</button>
          </div>
        </div>
      </section>
    </>
  );
}
