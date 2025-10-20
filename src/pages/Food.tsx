import { LocationCard } from "@/components/LocationCard";
import { useGetFood } from "@/modules/food/hooks/useGetFood";

const Food = () => {
  const { data: food = [], isLoading } = useGetFood();

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading food...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-foreground">
          Dulces recomendados
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {food.map((food) => (
            <LocationCard
              key={food.id}
              id={food.id}
              name={food.name}
              address={food.address}
              imgUrl={food.imgUrl}
              domain="reposteria"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export { Food };
