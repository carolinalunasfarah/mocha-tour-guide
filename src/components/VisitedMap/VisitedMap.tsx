import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { VisitedMapProps } from "./types";
import { cn } from "@/utils/styles/cn";
import "leaflet/dist/leaflet.css";
import "@/styles/leaflet.css";
import { MapPopup } from "@/components/MapPopup";
import { createMarker } from "@/utils/map/createMarker";
import { calculateCenter } from "@/utils/map/calculateCenter";

const VisitedMap = ({ locations, zoom = 14, className }: VisitedMapProps) => {
  const customIcon = createMarker();

  const mapCenter: [number, number] = calculateCenter(locations);

  return (
    <MapContainer
      center={mapCenter}
      zoom={zoom}
      className={cn("w-full h-[450px] rounded-lg", className)}
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((location, index) => (
        <Marker
          key={`${location.name}-${index}`}
          position={[location.location.latitude, location.location.longitude]}
          icon={customIcon}
        >
          <Popup>
            <MapPopup
              locationName={location.name}
              rating={location.rating}
              point={location.location}
            />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export { VisitedMap };
