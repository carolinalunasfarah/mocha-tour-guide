import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetMochas } from "@/modules/mochas/hooks/useGetMochas";
import type { PaginatedMochaResult } from "@/modules/mochas/services/getMochas/types";

import { Button } from "@/components/ui/Button";
import { LocationCard } from "@/components/LocationCard";
import { LocationCardSkeleton } from "@/components/LocationCardSkeleton";
import { StateComponent } from "@/components/StateComponent";
import { SearchBar } from "@/components/SearchBar";

const Mochas = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useGetMochas(searchQuery);

  const navigate = useNavigate();

  const allMochas = useMemo(() => {
    if (!data) {
      return [];
    }

    const pages = (data as { pages?: PaginatedMochaResult[] }).pages ?? [];
    return pages.flatMap((page) => page.mochas);
  }, [data]);

  // If there's an error during any fetch, show the error state
  if (isError) {
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

  if (isLoading && allMochas.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-12 md:px-8">
        <div className="px-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-8 text-foreground cursor-default">
            Mochas recomendados
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-2xl md:text-3xl md:mb-0 mb-4 font-bold text-foreground cursor-default">
            Mochas recomendados
          </h1>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Buscar mocha por nombre..."
          />
        </div>
        {allMochas.length === 0 ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-muted-foreground text-lg cursor-default">
              {searchQuery
                ? "No hay resultados con esta búsqueda"
                : "No hay mochas recomendadas aún"}
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {allMochas.map((mocha) => (
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
                    ? "Cargando más mochas..."
                    : "Cargar más mochas"}
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export { Mochas };
