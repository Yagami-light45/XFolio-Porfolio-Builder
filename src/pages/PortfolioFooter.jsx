// PortfolioFooter.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';
import styles from './PortfolioFooter.module.css'; // Corrected import

const PortfolioFooter = ({ isDarkMode }) => { // Destructure isDarkMode from props
  return (
    <footer className={`${styles.footer} ${isDarkMode ? styles.darkMode : ''}`}> {/* Apply darkMode class conditionally */}
      <div className={styles.container}>
        <p>Crafted with ❤️ by the <strong>XFolio</strong> Team</p>
        
        <div className={styles.footerLinks}>
          <a href="me240003034@iiti.ac.in" aria-label="Email">
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
          <a href="https://github.com/Yagami-light45" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a href="https://www.instagram.com/itx_harshith_p" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
        
        <div className={styles.footerInfo}>
          <p className={styles.footerNote}>
            <a href="/about" className={styles.aboutLink}>About XFolio</a>
          </p>
          <p className={styles.footerNote}>© 2025 XFolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default PortfolioFooter;