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

  return (
    <div className={styles.body}> 
      
      <header className={styles.header}>
        <div className={styles.nav}>
          <h1 className={`${styles.navH1} ${isAnimated ? styles.fallFromTopAnimated : ''} ${isAnimated ? styles.h1Animated : ''}`}>⚡ XFolio</h1>
          <button className={styles.menuToggle} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            &#9776;
          </button>
          <nav className={`${styles.navbarNav} ${isMenuOpen ? styles.show : ''}`}>
            <a href="#features" className={styles.navA}>Features</a>
            <a href="#how" className={styles.navA}>How It Works</a>
            <Link to="/about" className={styles.navA}>About us</Link>
            <a href="https://github.com/Yagami-light45/XFolio-Porfolio-Builder" target="_blank" rel="noopener noreferrer" className={styles.navA}>GitHub</a>
            <Link to="/builder" className={styles.startBtn}>Start Building</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.top}>
          <h1 className={`${styles.heroH1} ${isAnimated ? styles.fallFromTopAnimated : ''} ${isAnimated ? styles.h1Animated : ''}`}>⚡XFolio</h1>
          <h2 className={`${styles.heroH2} ${isAnimated ? styles.fallFromTopAnimated : ''} ${isAnimated ? styles.h2Animated : ''}`}>Build Your Portfolio Instantly</h2>
          <p className={`${styles.heroP} ${isAnimated ? styles.fallFromTopAnimated : ''} ${isAnimated ? styles.pAnimated : ''}`}>
            Creating a stunning personal portfolio has never been easier. With our platform, you don't need to write a single line of code — just enter your details, and your website is ready in one click. Whether you're a student, developer, designer, or professional, we help you showcase your work beautifully. Save time, skip the technical hassle, and go live instantly.<br />
            Build your digital identity effortlessly, today.
          </p>
          <Link to="/builder" className={`${styles.startBtn} ${isAnimated ? styles.fallFromTopAnimated : ''}`}>Get Started now</Link>
        </div>
      </section>

      <div className={styles.both}>
        <section className={styles.howItWorks} id="how">
          <h2 className={`${styles.sectionTitle} ${isAnimated ? styles.fallFromTopAnimated : ''} ${isAnimated ? styles.h2Animated : ''}`}>How It Works</h2>
          <div className={styles.steps}>
            <div className={`${styles.step} ${isAnimated ? styles.fallFromTopAnimated : ''} ${isAnimated ? styles.stepAnimated : ''}`}>
              <h3 className={`${styles.stepTitle} ${isAnimated ? styles.fallFromTopAnimated : ''} ${isAnimated ? styles.h3Animated : ''}`}>📝 Fill the Form</h3>
              <p className={`${isAnimated ? styles.fallFromTopAnimated : ''} ${isAnimated ? styles.pAnimated : ''}`}>Enter your name, bio, projects, and social links.</p>
            </div>
            <div className={`${styles.step} ${isAnimated ? styles.fallFromTopAnimated : ''} ${isAnimated ? styles.stepAnimated : ''}`}>
              <h3 className={`${styles.stepTitle} ${isAnimated ? styles.fallFromTopAnimated : ''} ${isAnimated ? styles.h3Animated : ''}`}>👀 Live Preview</h3>
              <p className={`${isAnimated ? styles.fallFromTopAnimated : ''} ${isAnimated ? styles.pAnimated : ''}`}>See your portfolio update in real time as you type.</p>
            </div>
            <div className={`${styles.step} ${isAnimated ? styles.fallFromTopAnimated : ''} ${isAnimated ? styles.stepAnimated : ''}`}>
              <h3 className={`${styles.stepTitle} ${isAnimated ? styles.fallFromTopAnimated : ''} ${isAnimated ? styles.h3Animated : ''}`}>🚀 Publish & Share</h3>
              <p className={`${isAnimated ? styles.fallFromTopAnimated : ''} ${isAnimated ? styles.pAnimated : ''}`}>Get a shareable link or download your portfolio.</p>
            </div>
          </div>
        </section>

        <section className={styles.featuresSection} id="features">
          <h2 className={`${styles.sectionTitle} ${isAnimated ? styles.fallFromTopAnimated : ''} ${isAnimated ? styles.h2Animated : ''}`}>Why Use Us?</h2>
          <div className={styles.featureList}>
            <div className={`${styles.feature} ${isAnimated ? styles.fallFromTopAnimated : ''} ${isAnimated ? styles.featureAnimated : ''}`}>📱 Responsive Design</div>
            <div className={`${styles.feature} ${isAnimated ? styles.fallFromTopAnimated : ''} ${isAnimated ? styles.featureAnimated : ''}`}>🎨 Download Resume</div>
            <div className={`${styles.feature} ${isAnimated ? styles.fallFromTopAnimated : ''} ${isAnimated ? styles.featureAnimated : ''}`}>🔗 Shareable<br />Links</div>
            <div className={`${styles.feature} ${isAnimated ? styles.fallFromTopAnimated : ''} ${isAnimated ? styles.featureAnimated : ''}`}>💾 Download as HTML/CSS</div>
            <div className={`${styles.feature} ${isAnimated ? styles.fallFromTopAnimated : ''} ${isAnimated ? styles.featureAnimated : ''}`}>🌗 Light/Dark Mode</div>
          </div>
        </section>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <a href="#how" className={styles.footerA}>How It Works</a>
          <a href="https://github.com/Yagami-light45/XFolio-Porfolio-Builder" target="_blank" rel="noopener noreferrer" className={styles.footerA}>GitHub</a>
          <Link to="/about" className={styles.footerA}>About us</Link>
        </div>
        <p className={styles.footerP}>
          © 2025 Instant Portfolio Builder. Built by{' '}
          <a href="https://github.com/Yagami-light45/XFolio-Porfolio-Builder" target="_blank" rel="noopener noreferrer" className={styles.footerA}>
            Team ⚡XFolio
          </a>.
        </p>
      </footer>
    </div>
  );
};

export default XFolio;