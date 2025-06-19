import { Marker, Tooltip } from "react-leaflet";
import { divIcon } from "leaflet";
import { Amenity } from "../data/amenities";

export function AmenityLayer({ data }: { data: Amenity[] }) {
  return (
    <>
      {data.map((f) => (
        <Marker
          key={f.properties.id}
          position={[f.geometry.coordinates[1], f.geometry.coordinates[0]]}
          icon={divIcon({
            className: `leaflet-marker-icon amenity-${f.properties.type}`,
            iconSize: [14, 14],
          })}
        >
          <Tooltip>{f.properties.name}</Tooltip>
        </Marker>
      ))}
    </>
  );
}
