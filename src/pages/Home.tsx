import { HeroSection } from "@/components/HeroSection";
import { DescriptionSection } from "@/components/DescriptionSection";

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />

      <DescriptionSection />
    </div>
  );
};

export { Home };
