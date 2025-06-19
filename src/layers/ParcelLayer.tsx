import React from "react";
import { useMap } from "react-leaflet";
import omnivore from "@mapbox/leaflet-omnivore";
import * as L from "leaflet";
import { FeatureCollection } from "geojson";

export function ParcelLayer({ onLoad, kmlPath = "parcel.kml" }: { onLoad?: (geojson: FeatureCollection) => void; kmlPath?: string }) {
  const map = useMap();

  React.useEffect(() => {
    const style = { color: "#FF007C", weight: 3, fillOpacity: 0.25 };
    const layer = omnivore
      .kml(kmlPath, null, L.geoJSON(null, { style }))
      .on("ready", () => {
        try {
          const geojson = layer.toGeoJSON() as FeatureCollection;
          onLoad?.(geojson);
          const bounds = (layer as any).getBounds?.();
          if (bounds && (bounds.isValid ? bounds.isValid() : true)) {
            map.fitBounds(bounds);
          }
        } catch (err) {
          console.error("[ParcelLayer] Error while processing KML:", err);
        }
      })
      .on("error", (err: any) => {
        console.error("[ParcelLayer] Failed to load KML layer:", err);
      })
      .addTo(map);
    return () => {
      map.removeLayer(layer);
    };
  }, [map, onLoad, kmlPath]);

  return null;
}
