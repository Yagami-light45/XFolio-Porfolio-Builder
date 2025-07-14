// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import XFolio from './pages/XFolio';
import BuilderPage from './pages/BuilderPage';
import UserPortfolio from './pages/Userportfolio';
import About from './pages/About';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<XFolio />} />
        <Route path="/builder" element={<BuilderPage />} />
        <Route path="/portfolio/:username" element={<UserPortfolio />} /> {/* MODIFIED LINE */}
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;