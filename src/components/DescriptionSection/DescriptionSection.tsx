import { useMemo, useEffect } from "react";
import { useGetVisited } from "@/modules/visited/hooks/useGetVisited";
import { VisitedMap } from "@/components/VisitedMap";
import { Skeleton } from "@/components/ui/Skeleton";
import { StateComponent } from "@/components/StateComponent";
import type { PaginatedVisitedResult } from "@/modules/visited/services/getVisited/types";

const DescriptionSection = () => {
  const {
    data,
    isLoading,
    isError,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetVisited();

  useEffect(() => {
    if (hasNextPage && !isFetchingNextPage && !isLoading) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, isLoading, fetchNextPage]);

  const visitedLocations = useMemo(() => {
    if (!data) {
      return [];
    }

    const pages = (data as { pages?: PaginatedVisitedResult[] }).pages ?? [];
    return pages.flatMap((page) => page.visited);
  }, [data]);

  return (
    <div className="py-10 md:py-20 bg-background">
      <div className="px-4">
        <div className="md:max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold mb-6 text-accent cursor-default">
            ¿Cómo nace el mocha tour?
          </h2>
          <p className="text-lg text-foreground leading-relaxed cursor-default">
            El mocha tour es un proyecto personal que nació como una forma de
            compartir conmigo misma, salir a descubrir cafeterías, recorrer la
            ciudad, leer, tomar un rico café y acompañarlo con algo dulce.
            <br />
            Hoy se transforma en esta pequeña guía para quienes disfruten del
            mocha y la repostería. Hasta la fecha he visitado{" "}
            {visitedLocations.length} cafeterías en Santiago de Chile.
          </p>
        </div>

        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 text-accent cursor-default">
              Cafeterías visitadas
            </h2>
            <p className="text-lg text-foreground cursor-default">
              Explora todas las cafeterías visitadas, ten en cuenta que el
              rating es sólo basado en el mocha.
            </p>
          </div>

          {isError || !visitedLocations ? (
            <StateComponent
              state="error"
              message="No se pudieron cargar las cafeterías visitadas"
              showRetryButton
              onRetry={refetch}
            />
          ) : isLoading ? (
            <Skeleton className="w-full h-[450px] rounded-lg" />
          ) : visitedLocations.length > 0 ? (
            <VisitedMap locations={visitedLocations} />
          ) : (
            <div className="flex justify-center items-center h-[450px]">
              <div className="text-muted-foreground">
                No hay ubicaciones disponibles
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { DescriptionSection };
