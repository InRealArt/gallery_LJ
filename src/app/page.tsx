import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HistoireSection from "@/components/HistoireSection";
import ExpositionsSection from "@/components/ExpositionsSection";
import ArtistesSection from "@/components/ArtistesSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-28">
        <HeroSection />
        <HistoireSection />
        <ExpositionsSection />
        <ArtistesSection />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
}
