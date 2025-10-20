import { LocationCard } from "@/components/LocationCard/LocationCard";
import { useGetMochas } from "@/modules/mochas/hooks/useGetMochas";

const Mochas = () => {
  const { data: mochas = [], isLoading } = useGetMochas();

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading mochas...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-foreground">
          Mochas recomendados
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mochas.map((mocha) => (
            <LocationCard
              key={mocha.id}
              id={mocha.id}
              name={mocha.name}
              address={mocha.address}
              imgUrl={mocha.imgUrl}
              domain="mochas"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export { Mochas };
