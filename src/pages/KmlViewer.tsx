import React from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import omnivore from "@mapbox/leaflet-omnivore";

const KML_PATH = "/poligono-244ha.kml";

export default function KmlViewer() {
  return (
    <MapContainer
      style={{ height: "100vh", width: "100vw" }}
      center={[0, 0]}
      zoom={2}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <KmlLayer />
    </MapContainer>
  );
}

function KmlLayer() {
  const map = useMap();
  React.useEffect(() => {
    const style = { color: "#7C3AED", weight: 2, fillOpacity: 0.3 };
    const layer = omnivore
      .kml(KML_PATH, null, L.geoJSON(null, { style }))
      .on("ready", () => map.fitBounds(layer.getBounds()))
      .on("error", () => alert("Failed to load KML."))
      .addTo(map);
    return () => map.removeLayer(layer);
  }, [map]);
  return null;
}
