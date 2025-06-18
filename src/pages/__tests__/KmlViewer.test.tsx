import "@testing-library/jest-dom";
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import KmlViewer from '../KmlViewer';
import omnivore from 'leaflet-omnivore';

jest.mock('leaflet-omnivore');

jest.mock('react-leaflet', () => {
  const React = require('react');
  return {
    MapContainer: ({ children }: any) => <div data-testid="map">{children}</div>,
    TileLayer: () => null,
    useMap: () => ({ fitBounds: jest.fn(), addLayer: jest.fn(), removeLayer: jest.fn() })
  };
});

test('renders page and loads KML', () => {
  const addTo = jest.fn().mockReturnThis();
  const setStyle = jest.fn();
  const getBounds = jest.fn(() => [[0,0],[0,0]]);
  const on = jest.fn((evt: string, cb: () => void) => { if (evt === 'ready') cb(); return { on, addTo, setStyle, getBounds }; });
  (omnivore as any).kml.mockReturnValue({ on, addTo, setStyle, getBounds });
  act(() => {
    render(
      <MemoryRouter>
        <KmlViewer />
      </MemoryRouter>
    );
  });
  expect(screen.getByRole('button')).toBeInTheDocument();
  expect(addTo).toHaveBeenCalled();
});
