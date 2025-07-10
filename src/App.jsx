import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import XFolio from './pages/XFolio';
import BuilderPage from './pages/BuilderPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<XFolio />} />
        <Route path="/builder" element={<BuilderPage />} />
      </Routes>
    </Router>
  );
}

export default App;