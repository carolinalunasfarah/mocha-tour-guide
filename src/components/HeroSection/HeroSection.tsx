import { Link } from "react-router-dom";

import { Button } from "@/components/ui/Button";

const HeroSection = () => {
  return (
    <div className="relative h-[500px] md:h-[85vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-mocha.svg"
          alt="Mocha Tour Hero"
          className="w-full h-full object-cover"
          width="1440"
          height="960"
          loading="eager"
          fetchPriority="high"
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
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link to="/mochas">
            <Button size="lg" variant="secondary" className="gap-2 w-[180px]">
              <img
                src="/icons/logo-white.svg"
                alt="Mocha Tour logo"
                className="h-6 w-6"
              />
              Explorar Mochas
            </Button>
          </Link>
          <Link to="/reposteria">
            <Button size="lg" className="gap-2 w-[180px]">
              <img
                src="/icons/croissant.svg"
                alt="Croissant icon"
                className="h-6 w-6"
              />
              Explorar Repostería
            </Button>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 z-20">
        <p className="text-xs text-primary-foreground bg-primary px-2 py-1 rounded cursor-default">
          Foto de Daniel Torobekov. Pexels.com
        </p>
      </div>
    </div>
  );
};

export { HeroSection };
