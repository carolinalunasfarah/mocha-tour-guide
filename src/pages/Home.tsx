import { HeroSection } from "@/components/HeroSection";
import { DescriptionSection } from "@/components/DescriptionSection";
import { MapSection } from "@/components/MapSection";

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />

      <DescriptionSection />

      <MapSection />
    </div>
  );
};

export { Home };
