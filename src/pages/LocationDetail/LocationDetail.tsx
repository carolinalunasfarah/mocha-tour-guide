import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetMochaById } from "@/modules/mochas/hooks/useGetMochaById";
import { useGetFoodById } from "@/modules/food/hooks/useGetFoodById";

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
    data: mocha,
    isLoading: isLoadingMocha,
    isError: isErrorMocha,
  } = useGetMochaById({ id: mochaId });

  const {
    data: food,
    isLoading: isLoadingFood,
    isError: isErrorFood,
  } = useGetFoodById({ id: foodId });

  const isLoading = isMochaDomain ? isLoadingMocha : isLoadingFood;
  const isError = isMochaDomain ? isErrorMocha : isErrorFood;
  const data = (isMochaDomain ? mocha : food) || null;

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center">Location not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <div className="aspect-[4/3] overflow-hidden rounded-lg mb-6">
              <img
                src={data.imgUrl}
                alt={data.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-foreground">
              {data.name}
            </h1>
            <div className="flex items-start gap-2 text-muted-foreground mb-6">
              <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
              <p className="text-lg">{data.address}</p>
            </div>
            <p className="text-lg text-foreground leading-relaxed">
              {data.description}
            </p>
          </div>

          {/* Right-side map/coordinates */}
        </div>
      </div>
    </div>
  );
};

export { LocationDetail };
