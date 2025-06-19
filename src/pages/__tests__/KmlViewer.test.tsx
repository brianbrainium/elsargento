import "@testing-library/jest-dom";
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import KmlViewer from '../KmlViewer';
import omnivore from '@mapbox/leaflet-omnivore';

jest.mock('@mapbox/leaflet-omnivore');

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
  const getBounds = jest.fn(() => [[0, 0], [0, 0]]);
  const on = jest.fn(() => ({ on, addTo, getBounds }));
  (omnivore as any).kml.mockReturnValue({ on, addTo, getBounds });
  act(() => {
    render(
      <MemoryRouter>
        <SnackbarProvider>
          <KmlViewer />
        </SnackbarProvider>
      </MemoryRouter>
    );
  });
  expect(screen.getByTestId('map')).toBeInTheDocument();
  expect(addTo).toHaveBeenCalled();
});
