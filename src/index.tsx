import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { SnackbarProvider } from 'notistack';
import './index.css';

const root = createRoot(document.getElementById('root')!);
root.render(
  <SnackbarProvider maxSnack={3}>
    <App />
  </SnackbarProvider>
);
