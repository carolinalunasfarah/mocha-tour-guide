import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "/hero-mocha.jpg";
import { Coffee, UtensilsCrossed } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Mocha Tour Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/60" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-primary-foreground">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Discover the Art of Mocha
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90">
            Embark on a delicious journey through the finest coffee shops and
            eateries in town
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/mochas">
              <Button size="lg" variant="secondary" className="gap-2">
                <Coffee className="h-5 w-5" />
                Explore Mochas
              </Button>
            </Link>
            <Link to="/food">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                <UtensilsCrossed className="h-5 w-5" />
                Discover Food
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Your Journey Awaits
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Welcome to your personal mocha tour guide. Here you'll find
              carefully curated locations serving the finest mochas and
              delectable food. Each spot has been selected for its unique
              atmosphere, quality, and the exceptional experience it offers.
              Start exploring and find your next favorite coffee destination.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
