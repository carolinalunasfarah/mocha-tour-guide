import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "/images/hero-mocha.jpg";
import { VisitedMap } from "@/components/VisitedMap";
import { useGetVisited } from "@/modules/visited/hooks/useGetVisited";

const Home = () => {
  const { data: visitedLocations, isLoading } = useGetVisited();

  return (
    <div className="min-h-screen">
      <section className="relative h-[500px] md:h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
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
      </section>

      <section className="py-10 md:py-20 bg-background">
        <div className="px-4">
          <div className="md:max-w-5xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-6 text-accent cursor-default">
              ¿Cómo nace el mocha tour?
            </h2>
            <p className="text-lg text-foreground leading-relaxed cursor-default">
              El mocha tour es un proyecto personal que nació como una forma de
              compartir conmigo misma, salir a descubrir cafeterías, recorrer la
              ciudad, leer, tomar un rico café y acompañarlo con algo dulce.
              <br />
              Hoy se transforma en esta pequeña guía para quienes disfruten del
              mocha y la repostería. Hasta la fecha he visitado 27 cafeterías,
              todas, excepto una, emplazadas en la comuna de Providencia en
              Santiago de Chile.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 text-accent cursor-default">
              Cafeterías visitadas
            </h2>
            <p className="text-lg text-foreground cursor-default">
              Explora todas las cafeterías visitadas, ten en cuenta que el
              rating es sólo basado en el mocha.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-[450px]">
              <div className="text-muted-foreground">Cargando mapa...</div>
            </div>
          ) : visitedLocations && visitedLocations.length > 0 ? (
            <VisitedMap locations={visitedLocations} />
          ) : (
            <div className="flex justify-center items-center h-[450px]">
              <div className="text-muted-foreground">
                No hay ubicaciones disponibles
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export { Home };
