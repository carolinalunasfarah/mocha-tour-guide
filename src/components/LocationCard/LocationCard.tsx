import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { MapPin } from "lucide-react";

import { Card, CardContent } from "@/components/ui/Card";
import { StarRating } from "@/components/StarRating";
import { MapPopup } from "@/components/MapPopup";
import { createMarker } from "@/utils/map/createMarker";

import { LocationCardProps } from "./types";

import "leaflet/dist/leaflet.css";
import "@/styles/leaflet.css";

const LocationCard = ({
  id,
  name,
  address,
  imgUrl,
  location,
  domain = "mochas",
  rating,
}: LocationCardProps) => {
  const customIcon = createMarker();
  const hasLink = domain !== "visited";

  const cardContent = (
    <Card
      className={`group overflow-hidden transition-all duration-300 border-none ${
        hasLink ? "cursor-pointer" : ""
      }`}
    >
      <div className="aspect-[4/3] overflow-hidden relative bg-muted rounded-t-lg">
        {location ? (
          <div className="absolute inset-0 w-full h-full">
            <MapContainer
              center={[location.latitude, location.longitude]}
              zoom={15}
              className="w-full h-full rounded-t-lg"
              scrollWheelZoom={false}
              dragging={false}
              touchZoom={false}
              doubleClickZoom={false}
              zoomControl={false}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker
                position={[location.latitude, location.longitude]}
                icon={customIcon}
              >
                <Popup>
                  <MapPopup
                    locationName={name}
                    rating={rating}
                    point={location}
                  />
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        ) : imgUrl ? (
          <img
            src={imgUrl}
            alt={name}
            width={400}
            height={300}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 transition-opacity duration-300 ${"opacity-100"}`}
            loading="lazy"
            decoding="async"
          />
        ) : null}
      </div>
      <CardContent className="p-4">
        <h3
          className={`font-semibold text-lg mb-2 text-foreground ${
            hasLink
              ? "group-hover:text-accent transition-colors"
              : "cursor-default"
          }`}
        >
          {name}
        </h3>
        {address && (
          <div className="flex items-start gap-2 text-sm text-muted-foreground mb-2">
            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-foreground" />
            <p className="text-foreground">{address}</p>
          </div>
        )}
        <div className="flex justify-end gap-2 text-sm text-muted-foreground">
          <StarRating rating={rating} />
        </div>
      </CardContent>
    </Card>
  );

  if (hasLink) {
    return <Link to={`/${domain}/${id}`}>{cardContent}</Link>;
  }

  return cardContent;
};

export { LocationCard };
