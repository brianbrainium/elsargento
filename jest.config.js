module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFiles: ['./jest.setup.js'],
  moduleNameMapper: {
    '^leaflet$': 'leaflet/dist/leaflet.js',
    '^@mapbox/leaflet-omnivore$': 'leaflet-omnivore',
    'leaflet/dist/leaflet.css$': '<rootDir>/__mocks__/styleMock.js'
  }
};
