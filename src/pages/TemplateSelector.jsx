// src/components/TemplateSelector.jsx
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './TemplateSelector.module.css';

const TemplateSelector = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location; // Get portfolio data passed from builder

  const handleTemplateSelect = (templateId) => {
    if (state && state.username) {
      // Pass the username and selected template to the portfolio view page
      navigate(`/portfolio/${state.username}?template=${templateId}`);
    } else {
      // Handle case where username might not be available
      console.error("Username not found to view portfolio.");
      alert("Could not load portfolio. Please go back and generate it again.");
      navigate('/'); // Redirect to home or builder page
    }
  };

  const templates = [
    { id: 'template1', name: 'Modern Minimalist', description: 'Clean, glassmorphic design.' },
    { id: 'template2', name: 'Professional Sidebar', description: 'Fixed sidebar for navigation.' },
    { id: 'template3', name: 'Creative & Bold', description: 'Vibrant colors and unique typography.' },
    { id: 'template4', name: 'Minimalist & Clean', description: 'Simple, spacious, and highly readable.' },
  ];

  return (
    <div className={styles.templateSelectorContainer}>
      <h1 className={styles.templateSelectorTitle}>Select Your Portfolio Template</h1>
      <p className={styles.templateSelectorSubtitle}>Choose a design that best represents you.</p>
      <div className={styles.templateSelectorGrid}>
        {templates.map((template) => (
          <div
            key={template.id}
            className={styles.templateSelectorCard}
            onClick={() => handleTemplateSelect(template.id)}
          >
            <h3 className={styles.templateSelectorCardTitle}>{template.name}</h3>
            <p className={styles.templateSelectorCardDescription}>{template.description}</p>
            {/* You can add a small preview image here for each template */}
            {/* <img src={`/previews/${template.id}.png`} alt={`${template.name} preview`} className={styles.templateSelectorCardImage} /> */}
          </div>
        ))}
      </div>
      <button onClick={() => navigate('/')} className={styles.templateSelectorBackButton}>Back to Builder</button>
    </div>
  );
};

export default TemplateSelector;