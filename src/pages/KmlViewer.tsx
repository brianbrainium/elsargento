import React from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import omnivore from "@mapbox/leaflet-omnivore";
import { useSnackbar } from "notistack";

const KML_PATH = "/poligono-244ha.kml";

export default function KmlViewer() {
  return (
    <MapContainer
      style={{ height: "100vh", width: "100vw" }}
      center={[0, 0]}
      zoom={2}
    >
      <TileLayer
        attribution="Tiles © Esri — Source: Esri, Maxar, Earthstar, GeoEye"
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      />
      <KmlLayer />
    </MapContainer>
  );
}

function KmlLayer() {
  const map = useMap();
  const { enqueueSnackbar } = useSnackbar();
  React.useEffect(() => {
    const style = { color: "#7C3AED", weight: 2, fillOpacity: 0.3 };
    const layer = omnivore
      .kml(KML_PATH, null, L.geoJSON(null, { style }))
      .on("ready", () => {
        try {
          const bounds = layer.getBounds?.();
          if (bounds && (bounds.isValid ? bounds.isValid() : true)) {
            map.fitBounds(bounds);
          } else {
            console.warn(
              "[KmlViewer] KML loaded, but bounds are invalid — skipping fitBounds."
            );
            enqueueSnackbar("KML loaded (no bounds)", { variant: "warning" });
          }
        } catch (err) {
          console.error("[KmlViewer] Error while fitting KML bounds:", err);
          enqueueSnackbar("KML loaded (no bounds)", { variant: "warning" });
        }
      })
      .on("error", (err) => {
        console.error("[KmlViewer] Failed to load KML layer:", err);
        enqueueSnackbar("Failed to load KML layer", { variant: "error" });
      })
      .addTo(map);
    return () => map.removeLayer(layer);
  }, [enqueueSnackbar, map]);
  return null;
}
