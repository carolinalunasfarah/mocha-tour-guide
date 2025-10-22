import { LocationCard } from "@/components/LocationCard";
import { LocationCardSkeleton } from "@/components/LocationCardSkeleton";
import { useGetFood } from "@/modules/food/hooks/useGetFood";
import { usePagination } from "@/modules/shared/hooks/usePagination";
import { Button } from "@/components/ui/button";

const Food = () => {
  const { data: food = [], isLoading } = useGetFood();
  const {
    paginatedData: paginatedFood,
    hasMore,
    loadMore,
  } = usePagination({
    data: food,
    initialLimit: 8,
    increment: 8,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-foreground cursor-default">
            Repostería recomendada
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <LocationCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-foreground cursor-default">
          Repostería recomendada
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {paginatedFood.map((foodItem) => (
            <LocationCard
              key={foodItem.id}
              id={foodItem.id}
              name={foodItem.name}
              address={foodItem.address}
              imgUrl={foodItem.imgUrl}
              domain="reposteria"
            />
          ))}
        </div>
        {hasMore && (
          <div className="flex justify-center mt-8">
            <Button onClick={loadMore} variant="outline" size="lg">
              Cargar más repostería
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export { Food };
