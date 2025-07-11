import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import XFolio from './pages/XFolio';
import BuilderPage from './pages/BuilderPage';
import UserPortfolio from './pages/Userportfolio';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<XFolio />} />
        <Route path="/builder" element={<BuilderPage />} />
        <Route path="/portfolio" element={<UserPortfolio />} />
      </Routes>
    </Router>
  );
}

export default App;