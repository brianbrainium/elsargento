import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import * as L from 'leaflet';
import omnivore from 'leaflet-omnivore';

const KML_PATH = '/poligono-244ha.kml';

function KmlLayer({ visible }: { visible: boolean }) {
  const map = useMap();
  const [layer, setLayer] = useState<L.LayerGroup<any> | null>(null);

  useEffect(() => {
    const grp = omnivore.kml(KML_PATH);
    grp.on('ready', () => {
      grp.setStyle({ color: 'violet', weight: 2, fillOpacity: 0.3 });
      map.fitBounds((grp as any).getBounds());
    });
    grp.on('error', () => {
      window.setTimeout(() => alert('Failed to load KML'), 0);
    });
    grp.addTo(map);
    setLayer(grp);
    return () => {
      map.removeLayer(grp);
    };
  }, [map]);

  useEffect(() => {
    if (!layer) return;
    if (visible) {
      layer.addTo(map);
    } else {
      map.removeLayer(layer);
    }
  }, [visible, layer, map]);

  return null;
}

export default function KmlViewer() {
  const [show, setShow] = useState(true);
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <button onClick={() => setShow(s => !s)}>
        {show ? 'Hide' : 'Show'} KML
      </button>
      <MapContainer center={[0, 0]} zoom={1} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <KmlLayer visible={show} />
      </MapContainer>
    </div>
  );
}
