import { HeroSection } from "@/components/Home/HeroSection/HeroSection";
import { DescriptionSection } from "@/components/Home/DescriptionSection";
import { MapSection } from "@/components/Home/MapSection";

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
