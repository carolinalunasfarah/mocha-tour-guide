import { Visited } from "@/modules/visited/domain/types";

const calculateCenter = (locations: Visited[]): [number, number] => {
  if (locations.length === 0) return [0, 0];

  const avgLng =
    locations.reduce((sum, loc) => sum + loc.location.longitude, 0) /
    locations.length;
  const avgLat =
    locations.reduce((sum, loc) => sum + loc.location.latitude, 0) /
    locations.length;

  return [avgLat, avgLng];
};

export { calculateCenter };
