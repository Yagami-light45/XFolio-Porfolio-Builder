// XFolio.jsx
import React, { useState, useEffect } from 'react';
import styles from './XFolio.module.css'; 
import { Link } from 'react-router-dom';

const XFolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`${styles.xfolioContainer} ${styles.xfolioBody}`}> 
      
      <header className={styles.xfolioHeader}>
        <div className={styles.xfolioNav}>
          <h1 className={`${styles.xfolioNavH1} ${isAnimated ? styles.xfolioFallFromTopAnimated : ''} ${isAnimated ? styles.xfolioH1Animated : ''}`}>⚡ XFolio</h1>
          <button className={styles.xfolioMenuToggle} onClick={toggleMenu}>
            &#9776;
          </button>
          <nav className={`${styles.xfolioNavbarNav} ${isMenuOpen ? styles.xfolioShow : ''}`}>
            <a href="#features" className={styles.xfolioNavA} onClick={() => setIsMenuOpen(false)}>Features</a>
            <a href="#how" className={styles.xfolioNavA} onClick={() => setIsMenuOpen(false)}>How It Works</a>
            <Link to="/about" className={styles.xfolioNavA} onClick={() => setIsMenuOpen(false)}>About us</Link>
            <a href="https://github.com/Yagami-light45/XFolio-Porfolio-Builder" target="_blank" rel="noopener noreferrer" className={styles.xfolioNavA} onClick={() => setIsMenuOpen(false)}>GitHub</a>
            <Link to="/builder" className={styles.xfolioStartBtn} onClick={() => setIsMenuOpen(false)}>Start Building</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.xfolioHero}>
        <div className={styles.xfolioTop}>
          <h1 className={`${styles.xfolioHeroH1} ${isAnimated ? styles.xfolioFallFromTopAnimated : ''} ${isAnimated ? styles.xfolioH1Animated : ''}`}>⚡XFolio</h1>
          <h2 className={`${styles.xfolioHeroH2} ${isAnimated ? styles.xfolioFallFromTopAnimated : ''} ${isAnimated ? styles.xfolioH2Animated : ''}`}>Build Your Portfolio Instantly</h2>
          <p className={`${styles.xfolioHeroP} ${isAnimated ? styles.xfolioFallFromTopAnimated : ''} ${isAnimated ? styles.xfolioPAnimated : ''}`}>
            Creating a stunning personal portfolio has never been easier. With our platform, you don't need to write a single line of code — just enter your details, and your website is ready in one click. Whether you're a student, developer, designer, or professional, we help you showcase your work beautifully. Save time, skip the technical hassle, and go live instantly.<br />
            Build your digital identity effortlessly, today.
          </p>
          <Link to="/builder" className={`${styles.xfolioStartBtn} ${isAnimated ? styles.xfolioFallFromTopAnimated : ''}`}>Get Started now</Link>
        </div>
      </section>

      <div className={styles.xfolioBoth}>
        <section className={styles.xfolioHowItWorks} id="how">
          <h2 className={`${styles.xfolioSectionTitle} ${isAnimated ? styles.xfolioFallFromTopAnimated : ''} ${isAnimated ? styles.xfolioH2Animated : ''}`}>How It Works</h2>
          <div className={styles.xfolioSteps}>
            <div className={`${styles.xfolioStep} ${isAnimated ? styles.xfolioFallFromTopAnimated : ''} ${isAnimated ? styles.xfolioStepAnimated : ''}`}>
              <h3 className={`${styles.xfolioStepTitle} ${isAnimated ? styles.xfolioFallFromTopAnimated : ''} ${isAnimated ? styles.xfolioH3Animated : ''}`}>📝 Fill the Form</h3>
              <p className={`${isAnimated ? styles.xfolioFallFromTopAnimated : ''} ${isAnimated ? styles.xfolioPAnimated : ''}`}>Enter your name, bio, projects, and social links.</p>
            </div>
            <div className={`${styles.xfolioStep} ${isAnimated ? styles.xfolioFallFromTopAnimated : ''} ${isAnimated ? styles.xfolioStepAnimated : ''}`}>
              <h3 className={`${styles.xfolioStepTitle} ${isAnimated ? styles.xfolioFallFromTopAnimated : ''} ${isAnimated ? styles.xfolioH3Animated : ''}`}>👀 Live Preview</h3>
              <p className={`${isAnimated ? styles.xfolioFallFromTopAnimated : ''} ${isAnimated ? styles.xfolioPAnimated : ''}`}>See your portfolio update in real time as you type.</p>
            </div>
            <div className={`${styles.xfolioStep} ${isAnimated ? styles.xfolioFallFromTopAnimated : ''} ${isAnimated ? styles.xfolioStepAnimated : ''}`}>
              <h3 className={`${styles.xfolioStepTitle} ${isAnimated ? styles.xfolioFallFromTopAnimated : ''} ${isAnimated ? styles.xfolioH3Animated : ''}`}>🚀 Publish & Share</h3>
              <p className={`${isAnimated ? styles.xfolioFallFromTopAnimated : ''} ${isAnimated ? styles.xfolioPAnimated : ''}`}>Get a shareable link or download your portfolio.</p>
            </div>
          </div>
        </section>

        <section className={styles.xfolioFeaturesSection} id="features">
          <h2 className={`${styles.xfolioSectionTitle} ${isAnimated ? styles.xfolioFallFromTopAnimated : ''} ${isAnimated ? styles.xfolioH2Animated : ''}`}>Why Use Us?</h2>
          <div className={styles.xfolioFeatureList}>
            <div className={`${styles.xfolioFeature} ${isAnimated ? styles.xfolioFallFromTopAnimated : ''} ${isAnimated ? styles.xfolioFeatureAnimated : ''}`}>📱 Responsive Design</div>
            <div className={`${styles.xfolioFeature} ${isAnimated ? styles.xfolioFallFromTopAnimated : ''} ${isAnimated ? styles.xfolioFeatureAnimated : ''}`}>🎨 Download Resume</div>
            <div className={`${styles.xfolioFeature} ${isAnimated ? styles.xfolioFallFromTopAnimated : ''} ${isAnimated ? styles.xfolioFeatureAnimated : ''}`}>🔗 Shareable<br />Links</div>
            <div className={`${styles.xfolioFeature} ${isAnimated ? styles.xfolioFallFromTopAnimated : ''} ${isAnimated ? styles.xfolioFeatureAnimated : ''}`}>💾 Download as HTML/CSS</div>
            <div className={`${styles.xfolioFeature} ${isAnimated ? styles.xfolioFallFromTopAnimated : ''} ${isAnimated ? styles.xfolioFeatureAnimated : ''}`}>🌗 Light/Dark Mode</div>
            <div className={`${styles.xfolioFeature} ${isAnimated ? styles.xfolioFallFromTopAnimated : ''} ${isAnimated ? styles.xfolioFeatureAnimated : ''}`}>🆓 Free to Use</div>
            <div className={`${styles.xfolioFeature} ${isAnimated ? styles.xfolioFallFromTopAnimated : ''} ${isAnimated ? styles.xfolioFeatureAnimated : ''}`}>🎨 Custom Templates</div>
            <div className={`${styles.xfolioFeature} ${isAnimated ? styles.xfolioFallFromTopAnimated : ''} ${isAnimated ? styles.xfolioFeatureAnimated : ''}`}>🧠 No coding required</div>
          </div>
        </section>
      </div>

      <footer className={styles.xfolioFooter}>
        <div className={styles.xfolioFooterLinks}>
          <a href="#how" className={styles.xfolioFooterA}>How It Works</a>
          <a href="https://github.com/Yagami-light45/XFolio-Porfolio-Builder" target="_blank" rel="noopener noreferrer" className={styles.xfolioFooterA}>GitHub</a>
          <Link to="/about" className={styles.xfolioFooterA}>About us</Link>
        </div>
        <p className={styles.xfolioFooterP}>
          © 2025 Instant Portfolio Builder. Built by{' '}
          <a href="https://github.com/Yagami-light45/XFolio-Porfolio-Builder" target="_blank" rel="noopener noreferrer" className={styles.xfolioFooterA}>
            Team ⚡XFolio
          </a>.
        </p>
      </footer>
    </div>
  );
};

export default XFolio;