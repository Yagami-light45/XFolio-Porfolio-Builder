/* PROFESSIONAL SIDEBAR */

import React, { useState, useEffect, useRef } from 'react';
import { generateResumePDF } from '../utils/pdfGenerator';
import { useParams } from 'react-router-dom';
import { generateStaticBundle } from '../utils/Template2BundleGenerator';
import { faSun, faMoon, faDownload, faBars, faEnvelope, faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './Template2Portfolio.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import PortfolioFooter from './PortfolioFooter';

const Template2Portfolio = () => {
  const { username } = useParams();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [portfolioData, setPortfolioData] = useState(null);
  const [profileImage, setProfileImage] = useState('/placeholder.png');
  const [isMobile, setIsMobile] = useState(false);
  const sidebarRef = useRef(null);

  // device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close sidebar function
  const closeSidebar = () => {
    setIsNavOpen(false);
  };

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && isNavOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeSidebar();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMobile, isNavOpen]);


  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = isNavOpen ? 'hidden' : 'unset';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobile, isNavOpen]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedTheme);

    const fetchPortfolioData = async () => {
      if (username) {
        try {
          const response = await fetch(`http://localhost:5000/api/portfolios/${username}`);
          const data = await response.json();

          if (response.ok) {
            setPortfolioData(data);
            if (data.image) {
              setProfileImage(data.image);
            }
          } else {
            console.error('Failed to fetch portfolio:', data.message || response.statusText);
            setPortfolioData({
              name: 'Portfolio Not Found',
              profession: 'Please check the URL',
              bio: 'The portfolio you are looking for does not exist or has been removed.',
              email: '',
              linkedin: '#',
              github: '#',
              image: null,
              skills: [],
              experience: [],
              projects: [],
              education: [],
            });
          }
        } catch (error) {
          console.error('Network error fetching portfolio:', error);
          setPortfolioData({
            name: 'Network Error',
            profession: 'Please try again later',
            bio: 'Could not load portfolio data due to a network issue.',
            email: '',
            linkedin: '#',
            github: '#',
            image: null,
            skills: [],
            experience: [],
            projects: [],
            education: [],
          });
        }
      } else {
        const lastUsername = localStorage.getItem('lastGeneratedUsername');
        if (lastUsername) {
          try {
            const response = await fetch(`http://localhost:5000/api/portfolios/${lastUsername}`);
            const data = await response.json();
            if (response.ok) {
              setPortfolioData(data);
              if (data.image) {
                setProfileImage(data.image);
              }
            } else {
              console.error('Failed to fetch last generated portfolio:', data.message || response.statusText);
              setPortfolioData({
                name: 'Your Name',
                profession: 'Your Profession',
                bio: 'Short bio…',
                email: '',
                linkedin: '#',
                github: '#',
                image: null,
                skills: [],
                experience: [],
                projects: [],
                education: [],
              });
            }
          } catch (error) {
            console.error('Network error fetching last generated portfolio:', error);
            setPortfolioData({
              name: 'Network Error',
              profession: 'Please try again later',
              bio: 'Could not load portfolio data due to a network issue.',
              email: '',
              linkedin: '#',
              github: '#',
              image: null,
              skills: [],
              experience: [],
              projects: [],
              education: [],
            });
          }
        } else {
          setPortfolioData({
            name: 'Your Name',
            profession: 'Your Profession',
            bio: 'Short bio…',
            email: '',
            linkedin: '#',
            github: '#',
            image: null,
            skills: [],
            experience: [],
            projects: [],
            education: [],
          });
        }
      }
    };

    fetchPortfolioData();
  }, [username]);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
  };
  
  const toggleNav = () => setIsNavOpen(!isNavOpen);

  const handleNavClick = (event) => {
    event.preventDefault();
    closeSidebar(); // Close sidebar first
    const targetId = event.currentTarget.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerOffset = isMobile ? 80 : 20;
      const elementPosition = targetElement.offsetTop;
      const offsetPosition = elementPosition - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleDownload = async (type) => { 
    if (!portfolioData) {
      console.warn("Portfolio data not loaded, cannot download.");
      return;
    }
    if (type === 'resume') {
      generateResumePDF(portfolioData);
    } else if (type === 'bundle') {
      await generateStaticBundle(portfolioData);
    }
 
    if (isMobile) {
      closeSidebar();
    }
  };

  const handleImageError = (e) => {
    console.warn('Image failed to load, using placeholder');
    e.target.src = '/placeholder.png';
  };

 
  const handleCloseButton = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Close button clicked'); 
    closeSidebar();
  };

  const handleOverlayClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    closeSidebar();
  };

  if (!portfolioData) {
    return (
      <div className={`${styles.template2PortfolioRoot} ${isDarkMode ? styles.template2DarkMode : ''}`}>
        <div className={styles.template2LoadingContainer}>
          <h2>Loading your portfolio...</h2>
          <p>This might take a moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.template2PortfolioRoot} ${isDarkMode ? styles.template2DarkMode : ''}`}>
      
      {isMobile && (
        <header className={styles.template2MobileHeader}>
          <div className={styles.template2MobileHeaderContent}>
            <div className={styles.template2MobileProfile}>
              <img
                src={profileImage}
                alt="Profile"
                onError={handleImageError}
                className={styles.template2MobileProfileImage}
              />
              <div className={styles.template2MobileProfileInfo}>
                <h1>{portfolioData.name}</h1>
                <p>{portfolioData.profession}</p>
              </div>
            </div>
            <button 
              className={styles.template2HamburgerButton}
              onClick={toggleNav}
              aria-label="Toggle navigation menu"
            >
              <FontAwesomeIcon icon={isNavOpen ? faTimes : faBars} />
            </button>
          </div>
        </header>
      )}

     
      {isMobile && isNavOpen && (
        <div 
          className={styles.template2MobileOverlay} 
          onClick={handleOverlayClick}
          onTouchEnd={handleOverlayClick}
        />
      )}

      <div className={styles.contentWrapper}>
        <aside 
          ref={sidebarRef}
          className={`${styles.template2Sidebar} ${isMobile ? styles.template2MobileSidebar : ''} ${
            isMobile && isNavOpen ? styles.template2MobileSidebarOpen : ''
          }`}
        >
          
          {isMobile && (
            <button 
              className={styles.template2MobileCloseButton}
              onClick={handleCloseButton}
              onTouchEnd={handleCloseButton}
              aria-label="Close menu"
              type="button"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )}

          {/* Desktop profile or mobile profile when menu is open */}
          {(!isMobile || isNavOpen) && (
            <div className={styles.template2SidebarProfile}>
              <img
                src={profileImage}
                alt="Profile"
                onError={handleImageError}
              />
              <h2>{portfolioData.name}</h2>
              <p>{portfolioData.profession}</p>
            </div>
          )}

          <div className={styles.template2SidebarActions}>
            <button className={styles.template2DarkModeToggle} onClick={toggleDarkMode} aria-label="Toggle dark mode">
              <FontAwesomeIcon icon={isDarkMode ? faMoon : faSun} />
              <span>{isDarkMode ? 'Light' : 'Dark'} Mode</span>
            </button>
            <button className={styles.template2DownloadBtn} onClick={() => handleDownload('resume')} aria-label="Download Resume">
              <FontAwesomeIcon icon={faDownload} /> Resume
            </button>
            <button className={styles.template2DownloadBtn} onClick={() => handleDownload('bundle')} aria-label="Download Static Bundle">
              <FontAwesomeIcon icon={faDownload} /> Bundle
            </button>
          </div>
          
          <nav className={styles.template2SidebarNav}>
            <ul>
              <li><a href="#about" onClick={handleNavClick}>About</a></li>
              <li><a href="#skills" onClick={handleNavClick}>Skills</a></li>
              <li><a href="#experience" onClick={handleNavClick}>Experience</a></li>
              <li><a href="#projects" onClick={handleNavClick}>Projects</a></li>
              <li><a href="#education" onClick={handleNavClick}>Education</a></li>
              <li><a href="#contact" onClick={handleNavClick}>Contact</a></li>
            </ul>
          </nav>
          
          <div className={styles.template2SocialLinks}>
              {portfolioData.linkedin && <a href={portfolioData.linkedin} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} /></a>}
              {portfolioData.github && <a href={portfolioData.github} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} /></a>}
              {portfolioData.email && <a href={`mailto:${portfolioData.email}`}><FontAwesomeIcon icon={faEnvelope} /></a>}
          </div>
        </aside>

        <main className={styles.template2MainContent}>
          <section id="about" className={styles.template2Section}>
            <h2>About Me</h2>
            <p>{portfolioData.bio}</p>
          </section>

          <section id="skills" className={styles.template2Section}>
            <h2>Skills</h2>
            {portfolioData.skills && portfolioData.skills.length ? (
              <ul className={styles.template2Skills}>
                {portfolioData.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            ) : (
              <p>No skills listed.</p>
            )}
          </section>

          <section id="experience" className={styles.template2Section}>
            <h2>Experience</h2>
            {portfolioData.experience && portfolioData.experience.length ? (
              <div>
                {portfolioData.experience.map((exp, index) => (
                  <div key={index} className={styles.template2ExperienceItem}>
                    <h3>{exp.title} at {exp.company}</h3>
                    <p className={styles.template2Duration}>{exp.duration}</p>
                    <p>{exp.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No experience listed.</p>
            )}
          </section>

          <section id="projects" className={styles.template2Section}>
            <h2>Projects</h2>
            {portfolioData.projects && portfolioData.projects.length ? (
              <div>
                {portfolioData.projects.map((project, index) => (
                  <div key={index} className={styles.template2ProjectItem}>
                    <h3>{project.title}</h3>
                    {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer">View Project</a>}
                    {project.techStack && <p className={styles.template2TechStack}>Tech Stack: {project.techStack}</p>}
                    <p>{project.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No projects listed.</p>
            )}
          </section>

          <section id="education" className={styles.template2Section}>
            <h2>Education</h2>
            {portfolioData.education && portfolioData.education.length ? (
              <div>
                {portfolioData.education.map((ed, index) => (
                  <div key={index} className={styles.template2EducationItem}>
                    <h3>{ed.degree} at {ed.institution}</h3>
                    <p className={styles.template2Duration}>{ed.duration}</p>
                    <p>{ed.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No education listed.</p>
            )}
          </section>

          <section id="contact" className={styles.template2Section}>
            <h2>Contact</h2>
            {portfolioData.email && <p>Email: <span>{portfolioData.email}</span></p>}
            {portfolioData.linkedin && <p>LinkedIn: <a href={portfolioData.linkedin} target="_blank" rel="noopener noreferrer">Profile</a></p>}
            {portfolioData.github && <p>GitHub: <a href={portfolioData.github} target="_blank" rel="noopener noreferrer">Repository</a></p>}
          </section>
        </main>
      </div>
      <footer className={styles.footerWrapper}>
        <PortfolioFooter isDarkMode={isDarkMode}/>
      </footer>
    </div>
  );
};

export default Template2Portfolio;