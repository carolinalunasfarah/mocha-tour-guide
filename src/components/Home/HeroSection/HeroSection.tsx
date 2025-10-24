import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative h-[500px] md:h-[85vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-mocha.jpg"
          alt="Mocha Tour Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/60" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center text-primary-foreground">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in cursor-default">
          Descubre las mejores cafeterías de Santiago
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90 cursor-default">
          Disfruta de los mejores mochas y repostería
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link to="/mochas">
            <Button size="lg" variant="secondary" className="gap-2">
              <img
                src="/icons/logo-white.png"
                alt="Mocha Tour logo"
                className="h-6 w-6"
              />
              Explorar Mochas
            </Button>
          </Link>
          <Link to="/reposteria">
            <Button size="lg" className="gap-2">
              <img
                src="/icons/croissant.png"
                alt="Croissant icon"
                className="h-6 w-6"
              />
              Explorar Repostería
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export { HeroSection };
