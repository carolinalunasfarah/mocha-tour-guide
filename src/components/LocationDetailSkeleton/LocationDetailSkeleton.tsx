import { ArrowLeft } from "lucide-react";

import { Skeleton } from "@/components/ui/Skeleton";
import { Button } from "@/components/ui/Button";

const LocationDetailSkeleton = () => {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <Button disabled className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            <Skeleton className="h-4 w-24" />
          </Button>
          <Skeleton className="h-8 w-48 md:h-10 md:w-64 mt-4 md:mt-0" />
        </div>

        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:grid md:grid-cols-3 gap-8">
            <div className="col-span-1">
              <div className="h-[300px] md:h-[450px] overflow-hidden rounded-lg">
                <Skeleton className="w-full h-full" />
              </div>
            </div>

            <div className="col-span-2">
              <div className="h-[300px] md:h-[450px] rounded-lg overflow-hidden">
                <Skeleton className="w-full h-full" />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-2">
                <Skeleton className="h-5 w-5 mt-1 flex-shrink-0" />
                <Skeleton className="h-6 w-64" />
              </div>
              <div className="flex items-start gap-2">
                <Skeleton className="h-5 w-20" />
              </div>
            </div>

            <div className="space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-3/4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { LocationDetailSkeleton };
