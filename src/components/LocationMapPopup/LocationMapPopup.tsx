import { LocationMapPopupProps } from "./types";
import { Button } from "../ui/button";
import "../../styles/map.css";

const LocationMapPopup = ({ locationName, point }: LocationMapPopupProps) => {
  return (
    <div className="text-center bg-background border border-border p-3 rounded-lg shadow-sm">
      <h3 className="m-0 mb-3 text-sm font-semibold text-foreground">
        {locationName}
      </h3>
      <div className="flex gap-2 justify-center">
        <Button asChild size="sm" variant="default" className="text-xs">
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

export { LocationMapPopup };
