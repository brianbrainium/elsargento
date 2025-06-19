import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { FeatureCollection } from "geojson";
import centerOfMass from "@turf/center-of-mass";
import { amenities, Amenity } from "../data/amenities";
import { AmenityLayer } from "../layers/AmenityLayer";
import { ParcelLayer } from "../layers/ParcelLayer";

export default function Map({ showParcel = true, showAmenities = true }: { showParcel?: boolean; showAmenities?: boolean }) {
  const [amenityData, setAmenityData] = React.useState<Amenity[]>(amenities);
  const initialized = React.useRef(false);

  const handleParcelLoad = (geojson: FeatureCollection) => {
    if (!initialized.current) {
      const centroid = centerOfMass(geojson);
      const [lng, lat] = centroid.geometry.coordinates;
      amenities.forEach((a) => (a.geometry.coordinates = [lng, lat]));
      setAmenityData([...amenities]);
      initialized.current = true;
    }
  };

  return (
    <MapContainer style={{ height: "100vh", width: "100vw" }} center={[0, 0]} zoom={2}>
      <TileLayer
        attribution="Tiles © Esri — Source: Esri, Maxar, Earthstar, GeoEye"
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      />
      {showAmenities && <AmenityLayer data={amenityData} />}
      {showParcel && <ParcelLayer onLoad={handleParcelLoad} />}
    </MapContainer>
  );
}
