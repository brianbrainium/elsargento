import * as L from "leaflet";
import { Marker, Tooltip } from "react-leaflet";
import { Amenity } from "../data/amenities";

export function AmenityLayer({ data }: { data: Amenity[] }) {
  return (
    <>
      {data.map((f) => (
        <Marker
          key={f.properties.id}
          position={[f.geometry.coordinates[1], f.geometry.coordinates[0]]}
          icon={L.divIcon({ className: `amenity-${f.properties.type}` })}
        >
          <Tooltip>{f.properties.name}</Tooltip>
        </Marker>
      ))}
    </>
  );
}
