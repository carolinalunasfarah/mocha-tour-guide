import { useEffect, useRef } from "react";
import type { Map as MapLibreMap, Marker as MapLibreMarker } from "maplibre-gl";
import { renderToString } from "react-dom/server";
import { LocationMapProps } from "./types";
import { LocationMapPopup } from "../LocationMapPopup/LocationMapPopup";
import { cn } from "@/lib/utils";

const LocationMap = ({
  point,
  zoom = 14,
  className,
  iconUrl,
  locationName = "Ubicación",
}: LocationMapProps) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<MapLibreMap | null>(null);
  const markerRef = useRef<MapLibreMarker | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const initMap = async () => {
      // Dynamic import of MapLibre GL
      const maplibregl = await import("maplibre-gl");

      if (isCancelled || !mapRef.current) return;

      // Create map instance
      if (!mapInstanceRef.current) {
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
          center: [point.longitude, point.latitude],
          zoom: zoom,
        });

        // Add navigation controls
        mapInstanceRef.current.addControl(
          new maplibregl.NavigationControl(),
          "top-right"
        );

        // Create popup content with directions links
        const popupContent = renderToString(
          <LocationMapPopup locationName={locationName} point={point} />
        );

        // Create marker
        if (iconUrl) {
          // Custom icon marker
          const el = document.createElement("div");
          el.className = "custom-marker";
          el.style.backgroundImage = `url(${iconUrl})`;
          el.style.width = "28px";
          el.style.height = "28px";
          el.style.backgroundSize = "contain";
          el.style.backgroundRepeat = "no-repeat";
          el.style.cursor = "pointer";

          markerRef.current = new maplibregl.Marker(el)
            .setLngLat([point.longitude, point.latitude])
            .setPopup(new maplibregl.Popup().setHTML(popupContent))
            .addTo(mapInstanceRef.current);
        } else {
          // Default marker
          markerRef.current = new maplibregl.Marker({
            color: "hsl(var(--background))",
          })
            .setLngLat([point.longitude, point.latitude])
            .setPopup(new maplibregl.Popup().setHTML(popupContent))
            .addTo(mapInstanceRef.current);
        }
      } else {
        // Update existing map
        mapInstanceRef.current.setCenter([point.longitude, point.latitude]);
        mapInstanceRef.current.setZoom(zoom);

        if (markerRef.current) {
          markerRef.current.setLngLat([point.longitude, point.latitude]);
        }
      }
    };

    initMap();

    return () => {
      isCancelled = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerRef.current = null;
      }
    };
  }, [point, zoom, iconUrl, locationName]);

  return (
    <div
      ref={mapRef}
      className={cn("w-full h-[400px] rounded-lg overflow-hidden", className)}
    />
  );
};

export { LocationMap };
