import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button/Button";
import { useGetMochaById } from "@/modules/mochas/hooks/useGetMochaById";
import { useGetFoodById } from "@/modules/food/hooks/useGetFoodById";
import { LocationMap } from "@/components/LocationMap";
import { StarRating } from "@/components/StarRating";
import { LocationDetailSkeleton } from "@/components/LocationDetailSkeleton";
import { StateComponent } from "@/components/StateComponent";

const LocationDetail = () => {
  const { domain, id } = useParams<{
    domain: "mochas" | "reposteria";
    id: string;
  }>();
  const navigate = useNavigate();
  const isMochaDomain = domain === "mochas";

  const mochaId = isMochaDomain ? id ?? "" : "";
  const foodId = !isMochaDomain ? id ?? "" : "";

  const {
    data: mocha = null,
    isLoading: isLoadingMocha,
    isError: isErrorMocha,
    refetch: refetchMocha,
  } = useGetMochaById({ id: mochaId });

  const {
    data: food = null,
    isLoading: isLoadingFood,
    isError: isErrorFood,
    refetch: refetchFood,
  } = useGetFoodById({ id: foodId });

  const isLoading = isMochaDomain ? isLoadingMocha : isLoadingFood;
  const isError = isMochaDomain ? isErrorMocha : isErrorFood;
  const data = (isMochaDomain ? mocha : food) || null;

  if (isLoading) {
    return <LocationDetailSkeleton />;
  }

  if (isError || !data) {
    return (
      <StateComponent
        state="error"
        message="No se encontró la ubicación"
        showGoBackButton
        onGoBack={() => navigate(-1)}
        goBackButtonText={isMochaDomain ? "Mochas" : "Repostería"}
        showRetryButton
        onRetry={isMochaDomain ? refetchMocha : refetchFood}
      />
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <Button onClick={() => navigate(-1)} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver a {isMochaDomain ? "Mochas" : "Repostería"}
          </Button>
          <h1 className="md:text-4xl text-2xl font-bold text-foreground cursor-default mt-4 md:mt-0">
            {data.name}
          </h1>
        </div>

        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:grid md:grid-cols-3 gap-8">
            <div className="col-span-1">
              <div className="h-[300px] md:h-[450px] overflow-hidden rounded-lg">
                <img
                  src={data.imgUrl}
                  alt={data.name}
                  className="w-full h-full object-cover object-center[-80%]"
                />
              </div>
            </div>

            <div className="col-span-2">
              {data.location && (
                <LocationMap point={data.location} locationName={data.name} />
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-2 text-foreground">
                <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
                <p className="text-lg cursor-default">{data.address}</p>
              </div>
              <div className="flex items-start gap-2 text-foreground">
                <StarRating rating={data.rating} />
              </div>
            </div>
            <p className="text-lg text-accent leading-relaxed cursor-default">
              {data.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { LocationDetail };
