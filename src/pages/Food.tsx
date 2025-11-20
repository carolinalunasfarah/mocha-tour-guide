import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { useGetFood } from "@/modules/food/hooks/useGetFood";
import type { PaginatedFoodResult } from "@/modules/food/services/getFood/types";
import type { InfiniteData } from "@tanstack/react-query";

import { Button } from "@/components/ui/Button";
import { LocationCard } from "@/components/LocationCard";
import { LocationCardSkeleton } from "@/components/LocationCardSkeleton";
import { StateComponent } from "@/components/StateComponent";

const Food = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useGetFood();
  const navigate = useNavigate();

  const allFood = useMemo(() => {
    if (!data) {
      return [];
    }

    if (Array.isArray(data)) {
      return data.flatMap((page) => page.food);
    }

    const pages = (data as { pages?: PaginatedFoodResult[] }).pages ?? [];

    return pages.flatMap((page) => page.food);
  }, [data]);

  if (isError) {
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

  if (isLoading && allFood.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-12 md:px-8">
        <div className="px-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-8 text-foreground cursor-default">
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
    <div className="min-h-screen pt-24 pb-12 md:px-8">
      <div className="px-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 text-foreground cursor-default">
          Repostería recomendada
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {allFood.map((food) => (
            <LocationCard
              key={food.id}
              id={food.id}
              name={food.name}
              address={food.address}
              imgUrl={food.imgUrl}
              domain="reposteria"
              rating={food.rating}
            />
          ))}
          {isFetchingNextPage &&
            Array.from({ length: 8 }).map((_, index) => (
              <LocationCardSkeleton key={`loading-more-${index}`} />
            ))}
        </div>
        <div className="flex justify-center mt-8 min-h-[60px]">
          {hasNextPage && (
            <Button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              size="lg"
            >
              {isFetchingNextPage
                ? "Cargando más repostería..."
                : "Cargar más repostería"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export { Food };
