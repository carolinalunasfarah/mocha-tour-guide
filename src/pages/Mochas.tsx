import { LocationCard } from "@/components/LocationCard";
import { LocationCardSkeleton } from "@/components/LocationCardSkeleton";
import { useGetMochas } from "@/modules/mochas/hooks/useGetMochas";
import { usePagination } from "@/modules/shared/hooks/usePagination";
import { Button } from "@/components/ui/Button";
import { StateComponent } from "@/components/StateComponent";
import { useNavigate } from "react-router-dom";

const Mochas = () => {
  const { data: mochas = [], isLoading, isError } = useGetMochas();
  const {
    paginatedData: paginatedMochas,
    hasMore,
    loadMore,
  } = usePagination({
    data: mochas,
    initialLimit: 8,
    increment: 8,
  });
  const navigate = useNavigate();

  if (isError || !mochas) {
    return (
      <StateComponent
        state="error"
        message="Hubo un error al cargar las mochas"
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
          Mochas recomendados
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <LocationCardSkeleton key={index} />
              ))
            : paginatedMochas.map((mocha) => (
                <LocationCard
                  key={mocha.id}
                  id={mocha.id}
                  name={mocha.name}
                  address={mocha.address}
                  imgUrl={mocha.imgUrl}
                  domain="mochas"
                  rating={mocha.rating}
                />
              ))}
        </div>
        {!isLoading && (
          <div className="flex justify-center mt-8 min-h-[60px]">
            {hasMore && (
              <Button onClick={loadMore} size="lg">
                Cargar más mochas
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export { Mochas };
