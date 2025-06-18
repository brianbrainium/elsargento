import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import KmlViewer from './pages/KmlViewer';
import Header from './components/Header';

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/kml" element={<KmlViewer />} />
        <Route path="/" element={<div>Home</div>} />
      </Routes>
    </Router>
  );
}
