//TemplateSelector.jsx
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './TemplateSelector.module.css';

const TemplateSelector = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location; 

  const handleTemplateSelect = (templateId) => {
    if (state && state.username) {
      navigate(`/portfolio/${state.username}?template=${templateId}`);
    } else {
      
      console.error("Username not found to view portfolio.");
      alert("Could not load portfolio. Please go back and generate it again.");
      navigate('/'); 
    }
  };

  const templates = [
    { id: 'template1', name: 'Modern Minimalist', description: 'Clean, glassmorphic design.' , imageUrl: 'Template1.png' },
    { id: 'template2', name: 'Professional Sidebar', description: 'Fixed sidebar for navigation.' , imageUrl: '/Template2.png' },
    { id: 'template3', name: 'Creative & Bold', description: 'Vibrant colors and unique typography.' , imageUrl: '/Template3.png' },
    { id: 'template4', name: 'Minimalist Professional', description: 'Simple, spacious, and highly readable.' , imageUrl: '/Template4.png' },
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
            <img
              src={template.imageUrl}
              alt={template.name}
              className={styles.templateImage} 
            />
            <h3 className={styles.templateSelectorCardTitle}>{template.name}</h3>
            <p className={styles.templateSelectorCardDescription}>{template.description}</p>
          </div>
        ))}
      </div>
      <button onClick={() => navigate('/builder')} className={styles.templateSelectorBackButton}>Back to Builder</button>
    </div>
  );
};

export default TemplateSelector;