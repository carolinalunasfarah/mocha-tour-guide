import { Button } from "@/components/ui/Button";
import { StarIcon } from "lucide-react";
import { MapPopupProps } from "./types";

const MapPopup = ({ locationName, rating, point }: MapPopupProps) => {
  return (
    <div className="text-center bg-background border border-border p-3 rounded-lg shadow-sm">
      <h3 className="m-0 mb-2 text-sm font-semibold text-foreground">
        {locationName}
      </h3>
      <div className="flex items-center justify-center gap-1 mb-3">
        <StarIcon className="h-4 w-4 fill-accent text-accent" />
        <span className="text-sm text-accent font-bold">{rating}</span>
      </div>
      <div className="flex gap-2 justify-center">
        <Button asChild size="sm" className="text-xs">
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${point.latitude},${point.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Maps
          </a>
        </Button>
        <Button asChild size="sm" variant="secondary" className="text-xs">
          <a
            href={`https://maps.apple.com/?daddr=${point.latitude},${point.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Apple Maps
          </a>
        </Button>
      </div>
    </div>
  );
};

export { MapPopup };
