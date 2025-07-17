//App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Pages
import XFolio from './pages/XFolio';
import BuilderPage from './pages/BuilderPage';
import About from './pages/About';

//portfolio templates
import UserPortfolio from './pages/Userportfolio'; 
import Template2Portfolio from './pages/Template2Portfolio';
import Template3Portfolio from './pages/Template3Portfolio';
import Template4Portfolio from './pages/Template4Portfolio';

// TemplateSelector
import TemplateSelector from './pages/TemplateSelector';

//Select Template
const PortfolioRenderer = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const template = queryParams.get('template'); 

  //appropriate portfolio based on the template parameter
  switch (template) {
    case 'template2':
      return <Template2Portfolio />;
    case 'template3':
      return <Template3Portfolio />;
    case 'template4':
      return <Template4Portfolio />;
    case 'template1': 
    default: 
      return <UserPortfolio />;
  }
};

//Routing
function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<XFolio />} />

        <Route path="/builder" element={<BuilderPage />} />

        <Route path="/select-template" element={<TemplateSelector />} />

        <Route path="/portfolio/:username" element={<PortfolioRenderer />} />

        <Route path="/portfolio" element={<PortfolioRenderer />} />

        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;