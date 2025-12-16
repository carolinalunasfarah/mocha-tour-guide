import { DescriptionSection } from "@/components/DescriptionSection";
import { MochaCupSection } from "@/components/MochaCupSection";

const Home = () => {
  return (
    <div className="min-h-screen">
      <MochaCupSection />

      <DescriptionSection />
    </div>
  );
};

export { Home };
