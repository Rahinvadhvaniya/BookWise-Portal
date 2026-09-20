import { BookGridSection } from "@/components/home/book-grid";
import { Footer } from "@/components/home/footer";
import { HeroSection } from "@/components/home/hero";
import { HighlightSections } from "@/components/home/highlight-sections";
import { Navbar } from "@/components/home/navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <BookGridSection />
      <HighlightSections />
      <Footer />
    </main>
  );
}
