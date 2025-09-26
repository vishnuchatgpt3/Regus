import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import ImpactSection from "@/components/home/ImpactSection";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <FeaturesSection />
      <ImpactSection />
      <Footer />
    </div>
  );
};

export default Index;