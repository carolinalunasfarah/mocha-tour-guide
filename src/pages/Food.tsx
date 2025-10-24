import { LocationCard } from "@/components/LocationCard";
import { LocationCardSkeleton } from "@/components/LocationCardSkeleton";
import { useGetFood } from "@/modules/food/hooks/useGetFood";
import { usePagination } from "@/modules/shared/hooks/usePagination";
import { Button } from "@/components/ui/button";
import { StateComponent } from "@/components/StateComponent";
import { useNavigate } from "react-router-dom";

const Food = () => {
  const { data: food = [], isLoading, isError } = useGetFood();
  const {
    paginatedData: paginatedFood,
    hasMore,
    loadMore,
  } = usePagination({
    data: food,
    initialLimit: 8,
    increment: 8,
  });
  const navigate = useNavigate();

  if (isError || !food) {
    return (
      <StateComponent
        state="error"
        message="Hubo un error al cargar la repostería"
        showGoBackButton
        onGoBack={() => navigate("/")}
        goBackButtonText="Inicio"
      />
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="px-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 text-foreground cursor-default">
          Repostería recomendada
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <LocationCardSkeleton key={index} />
              ))
            : paginatedFood.map((foodItem) => (
                <LocationCard
                  key={foodItem.id}
                  id={foodItem.id}
                  name={foodItem.name}
                  address={foodItem.address}
                  imgUrl={foodItem.imgUrl}
                  domain="reposteria"
                  rating={foodItem.rating}
                />
              ))}
        </div>
        {!isLoading && (
          <div className="flex justify-center mt-8 min-h-[60px]">
            {hasMore && (
              <Button onClick={loadMore} size="lg">
                Cargar más repostería
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export { Food };
