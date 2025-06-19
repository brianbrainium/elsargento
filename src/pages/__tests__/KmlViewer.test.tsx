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
    TileLayer: (props: any) => <div data-testid="tile" {...props} />,
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
  expect(screen.getByTestId('tile')).toHaveAttribute(
    'url',
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
  );
});

test('displays snackbar when KML fails to load', () => {
  const addTo = jest.fn().mockReturnThis();
  const on = jest.fn((event: string, cb: any) => {
    if (event === 'error') {
      cb(new Error('404'));
    }
    return { on, addTo };
  });
  (omnivore as any).kml.mockReturnValue({ on, addTo });

  const enqueueSnackbar = jest.fn();
  jest.spyOn(require('notistack'), 'useSnackbar').mockReturnValue({ enqueueSnackbar });

  act(() => {
    render(
      <MemoryRouter>
        <SnackbarProvider>
          <KmlViewer />
        </SnackbarProvider>
      </MemoryRouter>
    );
  });

  expect(enqueueSnackbar).toHaveBeenCalledWith('Failed to load KML layer', { variant: 'error' });
});
