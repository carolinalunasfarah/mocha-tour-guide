import { VisitedMap } from "@/components/VisitedMap";
import { useGetVisited } from "@/modules/visited/hooks/useGetVisited";
import { Skeleton } from "@/components/ui/Skeleton";
import { StateComponent } from "@/components/StateComponent";

const MapSection = () => {
  const {
    data: visitedLocations = [],
    isLoading,
    isError,
    refetch,
  } = useGetVisited();

  if (isError || !visitedLocations) {
    return (
      <StateComponent
        state="error"
        message="No se pudieron cargar las cafeterías visitadas"
        showRetryButton
        onRetry={refetch}
      />
    );
  }

  return (
    <div className="py-10 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-accent cursor-default">
            Cafeterías visitadas
          </h2>
          <p className="text-lg text-foreground cursor-default">
            Explora todas las cafeterías visitadas, ten en cuenta que el rating
            es sólo basado en el mocha.
          </p>
        </div>

        {isLoading ? (
          <Skeleton className="w-full h-[450px] rounded-lg" />
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
    </div>
  );
};

export { MapSection };
