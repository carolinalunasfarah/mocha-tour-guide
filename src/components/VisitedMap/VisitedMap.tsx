import { useEffect, useRef } from "react";
import type { Map, Marker } from "maplibre-gl";
import { renderToString } from "react-dom/server";
import { VisitedMapProps } from "./types";
import { VisitedMapPopup } from "../VisitedMapPopup/VisitedMapPopup";
import { Visited } from "@/modules/visited/domain/types";
import { cn } from "@/lib/utils";

const VisitedMap = ({
  locations,
  center,
  zoom = 13,
  className,
}: VisitedMapProps) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const markersRef = useRef<Marker[]>([]);

  useEffect(() => {
    let isCancelled = false;

    const initMap = async () => {
      const maplibregl = await import("maplibre-gl");

      if (isCancelled || !mapRef.current) return;

      // Create map instance
      if (!mapInstanceRef.current) {
        // Calcular el centro si no se proporciona
        const mapCenter = center || calculateCenter(locations);

        mapInstanceRef.current = new maplibregl.Map({
          container: mapRef.current,
          style: {
            version: 8,
            sources: {
              "osm-tiles": {
                type: "raster",
                tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
                tileSize: 256,
                attribution: "© OpenStreetMap contributors",
              },
            },
            layers: [
              {
                id: "osm-tiles",
                type: "raster",
                source: "osm-tiles",
                minzoom: 0,
                maxzoom: 19,
              },
            ],
          },
          center: mapCenter,
          zoom: zoom,
        });

        // Add navigation controls
        mapInstanceRef.current.addControl(
          new maplibregl.NavigationControl(),
          "top-right"
        );
      }

      // Limpiar markers existentes
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];

      // Crear markers para cada ubicación
      locations.forEach((location) => {
        const popupContent = renderToString(
          <VisitedMapPopup
            locationName={location.name}
            rating={location.rating}
            point={location.location}
          />
        );

        const marker = new maplibregl.Marker({
          color: "hsl(var(--background))",
        })
          .setLngLat([location.location.longitude, location.location.latitude])
          .setPopup(new maplibregl.Popup().setHTML(popupContent))
          .addTo(mapInstanceRef.current!);

        markersRef.current.push(marker);
      });
    };

    initMap();

    return () => {
      isCancelled = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markersRef.current = [];
      }
    };
  }, [locations, center, zoom]);

  // Función para calcular el centro de múltiples puntos
  const calculateCenter = (locations: Visited[]): [number, number] => {
    if (locations.length === 0) return [0, 0];

    const avgLng =
      locations.reduce((sum, loc) => sum + loc.location.longitude, 0) /
      locations.length;
    const avgLat =
      locations.reduce((sum, loc) => sum + loc.location.latitude, 0) /
      locations.length;

    return [avgLng, avgLat];
  };

  return (
    <div
      ref={mapRef}
      className={cn("w-full h-[450px] rounded-lg overflow-hidden", className)}
    />
  );
};

export { VisitedMap };
