import { Feature, Point } from "geojson";

export interface Amenity extends Feature<Point> {
  properties: {
    id: string;
    name: string;
    type: "clubhouse" | "pool" | "parking";
  };
}

export const amenities: Amenity[] = [
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [0, 0] },
    properties: { id: "clubhouse-hub", name: "Clubhouse", type: "clubhouse" },
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [0, 0] },
    properties: { id: "pool-hub", name: "Pool", type: "pool" },
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [0, 0] },
    properties: { id: "parking-hub", name: "Parking", type: "parking" },
  },
];
