import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ServiceAreaSection from "@/components/ServiceAreaSection";
import Footer from "@/components/Footer";

const LandingPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const scrollToForm = () => {
    const heroSection = document.getElementById("hero");
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background noise-bg" data-testid="landing-page">
      <Navbar onGetQuote={scrollToForm} />
      <main>
        <HeroSection />
        <ServicesSection onGetQuote={scrollToForm} />
        <TestimonialsSection />
        <ServiceAreaSection onGetQuote={scrollToForm} />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
