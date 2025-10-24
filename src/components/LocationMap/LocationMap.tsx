import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import { MapPopup } from "@/components/MapPopup";

import { createMarker } from "@/utils/map/createMarker";
import { cn } from "@/utils/styles/cn";

import { LocationMapProps } from "./types";

import "leaflet/dist/leaflet.css";
import "@/styles/leaflet.css";

const LocationMap = ({
  point,
  zoom = 15,
  className,
  locationName = "Ubicación",
}: LocationMapProps) => {
  const customIcon = createMarker();

  return (
    <MapContainer
      center={[point.latitude, point.longitude]}
      zoom={zoom}
      className={cn("w-full h-[450px] rounded-lg", className)}
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[point.latitude, point.longitude]} icon={customIcon}>
        <Popup>
          <MapPopup locationName={locationName} point={point} />
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export { LocationMap };
