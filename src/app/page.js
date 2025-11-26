import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import ArtisansSection from "@/components/ArtisansSection";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center w-full">
      <Hero />
      <AboutSection />
      <FeaturedProducts />
      <ArtisansSection />
      <CTASection />
    </main>
  );
}
