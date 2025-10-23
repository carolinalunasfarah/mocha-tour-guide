import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const LocationCardSkeleton = () => {
  return (
    <Card className="overflow-hidden bg-card">
      <div className="aspect-[4/3] overflow-hidden">
        <Skeleton className="w-full h-full" />
      </div>
      <CardContent className="p-4">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <div className="flex items-start gap-2 mb-2">
          <Skeleton className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="flex justify-end">
          <Skeleton className="h-4 w-20" />
        </div>
      </CardContent>
    </Card>
  );
};

export { LocationCardSkeleton };
