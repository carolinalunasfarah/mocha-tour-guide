import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useGetVisited } from "@/modules/visited/hooks/useGetVisited";
import type { PaginatedVisitedResult } from "@/modules/visited/services/getVisited/types";

import { Button } from "@/components/ui/Button";
import { LocationCard } from "@/components/LocationCard";
import { LocationCardSkeleton } from "@/components/LocationCardSkeleton";
import { StateComponent } from "@/components/StateComponent";

const VisitedLocations = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useGetVisited();

  const navigate = useNavigate();

  const allVisited = useMemo(() => {
    if (!data) {
      return [];
    }

    const pages = (data as { pages?: PaginatedVisitedResult[] }).pages ?? [];
    return pages.flatMap((page) => page.visited);
  }, [data]);

  if (isError) {
    return (
      <StateComponent
        state="error"
        message="Hubo un error al cargar los lugares visitados"
        showGoBackButton
        onGoBack={() => navigate("/")}
        goBackButtonText="Inicio"
      />
    );
  }

  if (isLoading && allVisited.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-12 md:px-8">
        <div className="px-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-8 text-foreground cursor-default">
            Lugares visitados
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
          Lugares visitados
        </h1>
        {allVisited.length === 0 ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-muted-foreground text-lg cursor-default">
              No hay lugares visitados aún
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {allVisited.map((visited) => (
                <LocationCard
                  key={visited.id}
                  id={visited.id}
                  name={visited.name}
                  location={visited.location}
                  rating={visited.rating}
                  domain="visited"
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
                    ? "Cargando más lugares..."
                    : "Cargar más lugares"}
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export { VisitedLocations };
