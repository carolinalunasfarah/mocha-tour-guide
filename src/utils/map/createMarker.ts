import L from "leaflet";

const createMarker = () => {
  return new L.Icon({
    iconUrl: "/icons/marker.svg",
    iconSize: [40, 45],
    iconAnchor: [20, 45],
    popupAnchor: [1, -45],
    shadowSize: [45, 45],
  });
};

export { createMarker };
