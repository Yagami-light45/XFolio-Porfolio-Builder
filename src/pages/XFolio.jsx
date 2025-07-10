// XFolio.jsx (Single file with one global CSS)
import React, { useState, useEffect } from 'react';
import '../styles/XFolio.css';
import { Link } from 'react-router-dom';

const XFolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <div className="nav">
          <h1 className={`navTitle ${isAnimated ? 'fadeInUp' : ''}`}>⚡ XFolio</h1>
          <button className="menuToggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            &#9776;
          </button>
          <nav className={`navLinks ${isMenuOpen ? 'open' : ''}`}>
            <a href="#features" className="navLink">Features</a>
            <a href="#how" className="navLink">How It Works</a>
            <a href="#contact" className="navLink">About us</a>
            <a href="https://github.com/Yagami-light45/Instant-Portfolio-Builder-Web-App" target="_blank" rel="noopener noreferrer" className="navLink">GitHub</a>
            <Link to="/builder" className="startBtn">Start Building</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="heroTop">
          <h1 className={`heroTitle ${isAnimated ? 'fadeInUp' : ''}`}>⚡XFolio</h1>
          <h2 className={`heroSubtitle ${isAnimated ? 'fadeInUp' : ''}`}>Build Your Portfolio Instantly</h2>
          <p className={`heroText ${isAnimated ? 'fadeInUp' : ''}`}>
            Creating a stunning personal portfolio has never been easier. With our platform, you don't need to write a single line of code — just enter your details, and your website is ready in one click. Whether you're a student, developer, designer, or professional, we help you showcase your work beautifully. Save time, skip the technical hassle, and go live instantly.<br />
            Build your digital identity effortlessly, today.
          </p>
          <Link to="/builder" className="startBtn">Get Started now</Link>
        </div>
      </section>

    <div className="mainContent">
      <section className="section" id="how">
        <h2 className="sectionTitle">How It Works</h2>
        <div className="steps">
          <div className="step">
            <h3 className="stepTitle">📝 Fill the Form</h3>
            <p>Enter your name, bio, projects, and social links.</p>
          </div>
          <div className="step">
            <h3 className="stepTitle">👀 Live Preview</h3>
            <p>See your portfolio update in real time as you type.</p>
          </div>
          <div className="step">
            <h3 className="stepTitle">🚀 Publish & Share</h3>
            <p>Get a shareable link or download your portfolio.</p>
          </div>
        </div>
      </section>

 
      <section className="section" id="features">
        <h2 className="sectionTitle">Why Use Us?</h2>
        <div className="features">
          <div className="feature">📱 Responsive Design</div>
          <div className="feature">🎨 Download Resume</div>
          <div className="feature">🔗 Shareable<br />Links</div>
          <div className="feature">💾 Download as HTML/CSS</div>
          <div className="feature">🌗 Light/Dark Mode</div>
        </div>
      </section>
      </div>

      
      <footer className="footer">
        <div className="footerLinks">
          <a href="#how" className="footerLink">How It Works</a>
          <a href="https://github.com/Yagami-light45/Instant-Portfolio-Builder-Web-App" target="_blank" rel="noopener noreferrer" className="footerLink">GitHub</a>
          <a href="#contact" className="footerLink">About us</a>
        </div>
        <p className="footerText">
          © 2025 Instant Portfolio Builder. Built by{' '}
          <a href="https://github.com/Yagami-light45/Instant-Portfolio-Builder-Web-App" target="_blank" rel="noopener noreferrer" className="footerLink">
            Team ⚡XFolio
          </a>.
        </p>
      </footer>
    </div>
  );
};

export default XFolio;
