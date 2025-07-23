// Userportfolio.jsx 

import React, { useState, useEffect, useRef } from 'react';
import { generateResumePDF } from '../../utils/pdfGenerator';
import { useParams } from 'react-router-dom';
import { generateStaticBundle } from '../../utils/staticBundleGenerator';
import { faSun, faMoon, faDownload, faBars, faEnvelope, faPrint } from '@fortawesome/free-solid-svg-icons';
import styles from './UserPortfolio.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';
import PortfolioFooter from '../../components/PortfolioFooter/PortfolioFooter';
import ShareModal from '../../components/ShareQR/ShareModal'; 
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';


const UserPortfolio = () => {
  const { username } = useParams(); 
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [portfolioData, setPortfolioData] = useState(null); 
  const [profileImage, setProfileImage] = useState('/placeholder.png');
  const downloadOptionsRef = useRef(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedTheme);

    const fetchPortfolioData = async () => {
      if (username) {
        try {
          const response = await fetch(`/api/portfolios/${username}`); // Fetch by username
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
            const response = await fetch(`/api/portfolios/${lastUsername}`);
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


    const handleClickOutside = (e) => {
      if (downloadOptionsRef.current && !downloadOptionsRef.current.contains(e.target)) {
        setIsDownloadOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [username]);

  useEffect(() => {
    document.body.classList.toggle('userPortfolioDarkMode', isDarkMode);
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleNav = () => setIsNavOpen(!isNavOpen);
  const toggleDownload = (e) => {
    e.stopPropagation();
    setIsDownloadOpen(!isDownloadOpen);
  };

    const portfolioUrl = window.location.href;
    const openShareModal = () => setIsShareModalOpen(true);
    const closeShareModal = () => setIsShareModalOpen(false);

  const handleNavClick = (event) => {
    event.preventDefault();
    setIsNavOpen(false);

    const targetId = event.currentTarget.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const navbar = document.querySelector(`.${styles.userPortfolioGlassNavbar}`);
      const navbarHeight = 65;

      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offset = navbarHeight + 20;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleDownload = (e, type) => {
    e.preventDefault();
    setIsDownloadOpen(false);
    if (!portfolioData) {
      console.warn("Portfolio data not loaded, cannot download.");
      return;
    }
    if (type === 'resume') {
      generateResumePDF(portfolioData);
    } else if (type === 'bundle') {
      generateStaticBundle(portfolioData);
    }
  };
 const handlePrintPortfolio = () => {
  if (!portfolioData) {
    console.warn("Portfolio data not loaded, cannot print.");
    return;
  }
  
  const navbar = document.querySelector(`.${styles.userPortfolioGlassNavbar}`);
  if (navbar) navbar.style.display = 'none';
  
  const printStyles = document.createElement('style');
  printStyles.innerHTML = `
    @media print {
      @page { margin: 0.5in; }
      body { font-size: 12pt !important; }
      .${styles.userPortfolioSection} { 
        page-break-inside: avoid; 
        margin-bottom: 20px !important; 
      }
      .${styles.userPortfolioSection} h2 { 
        color: #333 !important; 
        border-bottom: 1px solid #ccc; 
      }
      a { color: #0066cc !important; }
      * { box-shadow: none !important; }
    }
  `;
  document.head.appendChild(printStyles);
  
  // Print
  window.print();
  
  setTimeout(() => {
    if (navbar) navbar.style.display = '';
    document.head.removeChild(printStyles);
  }, 100);
};

  const handleImageError = (e) => {
    console.warn('Image failed to load, using placeholder');
    e.target.src = '/placeholder.png';
  };

  if (!portfolioData) {
    return (
      <div className={`${styles.userPortfolioRoot} ${isDarkMode ? styles.userPortfolioDarkMode : ''}`}>
        <nav className={styles.userPortfolioGlassNavbar}>
          <div className={styles.userPortfolioNavbarContainer}>
            <div className={styles.userPortfolioLogo}>Portfolio..!</div>
          </div>
        </nav>
        <div className={styles.userPortfolioContainer} style={{ textAlign: 'center', padding: '50px', marginTop: '4rem' }}>
          <h2>Loading your portfolio...</h2>
          <p>This might take a moment if it's the first time.</p>
        </div>
        <PortfolioFooter isDarkMode={isDarkMode} />
      </div>
    );
  }

  return (
    <div className={`${styles.userPortfolioRoot} ${isDarkMode ? styles.userPortfolioDarkMode : ''}`}>
      <nav className={styles.userPortfolioGlassNavbar}>
        <div className={styles.userPortfolioNavbarContainer}>
          <div className={styles.userPortfolioLogo}>My Portfolio</div>
          <ul className={`${styles.userPortfolioNavLinks} ${isNavOpen ? styles.userPortfolioActive : ''}`}>
            <li><a href="#about" onClick={handleNavClick}>About</a></li>
            <li><a href="#skills" onClick={handleNavClick}>Skills</a></li>
            <li><a href="#experience" onClick={handleNavClick}>Experience</a></li>
            <li><a href="#projects" onClick={handleNavClick}>Projects</a></li>
            <li><a href="#education" onClick={handleNavClick}>Education</a></li>
            <li><a href="#contact" onClick={handleNavClick}>Contact</a></li>
          </ul>
          <div className={styles.userPortfolioNavbarButtons}>
            <div ref={downloadOptionsRef} className={`${styles.userPortfolioDownloadOptions} ${isDownloadOpen ? styles.userPortfolioActive : ''}`}>
              <button className={styles.userPortfolioDownloadBtn} onClick={toggleDownload} aria-label="Download Options" aria-haspopup="true" aria-expanded={isDownloadOpen}>
                <FontAwesomeIcon icon={faDownload} />
              </button>
              <div className={styles.userPortfolioDownloadMenu} role="menu">
                <a href="#" onClick={(e) => handleDownload(e, 'resume')}>Download Resume</a>
                <a href="#" onClick={(e) => handleDownload(e, 'bundle')}>Download Static Bundle</a>
                <a href="#" onClick={(e) => { e.preventDefault(); setIsDownloadOpen(false); handlePrintPortfolio(); }}>
                  <FontAwesomeIcon icon={faPrint} /> Print Portfolio
                </a>
              </div>
            </div>

              <button className={styles.userPortfolioDarkModeToggle} onClick={openShareModal} aria-label="Share Portfolio">
               <FontAwesomeIcon icon={faShareAlt} />
              </button>

            <button className={styles.userPortfolioDarkModeToggle} onClick={toggleDarkMode} aria-label="Toggle dark mode">
              <FontAwesomeIcon icon={isDarkMode ? faMoon : faSun} className={isDarkMode ? styles.userPortfolioMoonIcon : styles.userPortfolioSunIcon} />
            </button>
            <button className={styles.userPortfolioHamburger} onClick={toggleNav} aria-label="Toggle navigation">
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>
      </nav>

      <div className={styles.userPortfolioContainer}>
        <div className={styles.userPortfolioProfile}>
          <img
            src={profileImage}
            alt="Profile"
            onError={handleImageError}
          />
          <h1>{portfolioData.name}</h1>
          <p className={styles.userPortfolioSubtitle}>{portfolioData.profession}</p>
        </div>

        <section id="about" className={styles.userPortfolioSection}>
          <h2>About Me</h2>
          <p>{portfolioData.bio}</p>
        </section>

        <section id="skills" className={styles.userPortfolioSection}>
          <h2>Skills</h2>
          {portfolioData.skills && portfolioData.skills.length ? (
            <ul className={styles.userPortfolioSkills}>
              {portfolioData.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          ) : (
            <p>No skills listed.</p>
          )}
        </section>

        <section id="experience" className={styles.userPortfolioSection}>
          <h2>Experience</h2>
          {portfolioData.experience && portfolioData.experience.length ? (
            <div>
              {portfolioData.experience.map((exp, index) => (
                <div key={index} className={styles.userPortfolioExperienceItem}>
                  <h3 className={styles.userPortfolioExperienceItemTitle}>{exp.title} at {exp.company}</h3>
                  <p className={styles.userPortfolioDuration}>{exp.duration}</p>
                  <p>{exp.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No experience listed.</p>
          )}
        </section>

        <section id="projects" className={styles.userPortfolioSection}>
          <h2>Projects</h2>
          {portfolioData.projects && portfolioData.projects.length ? (
            <div>
              {portfolioData.projects.map((project, index) => (
                <div key={index} className={styles.userPortfolioProjectItem}>
                  <h3 className={styles.userPortfolioProjectItemTitle}>{project.title}</h3>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.userPortfolioProjectItemLink}>View Project</a>
                  <p className={styles.userPortfolioTechStack}>Tech Stack: {project.techStack}</p>
                  <p>{project.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No projects listed.</p>
          )}
        </section>

        <section id="education" className={styles.userPortfolioSection}>
          <h2>Education</h2>
          {portfolioData.education && portfolioData.education.length ? (
            <div>
              {portfolioData.education.map((ed, index) => (
                <div key={index} className={styles.userPortfolioEducationItem}>
                  <h3 className={styles.userPortfolioEducationItemTitle}>{ed.degree} at {ed.institution}</h3>
                  <p className={styles.userPortfolioDuration}>{ed.duration}</p>
                  <p>{ed.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No education listed.</p>
          )}
        </section>

        <section id="contact" className={styles.userPortfolioSection}>
          <h2>Contact</h2>
          <p className={styles.userPortfolioContactText}>Email: <span>{portfolioData.email}</span></p>

          <p className={styles.userPortfolioContactText}>LinkedIn: <a href={portfolioData.linkedin} target="_blank" rel="noopener noreferrer">Profile</a></p>
          <p className={styles.userPortfolioContactText}>GitHub: <a href={portfolioData.github} target="_blank" rel="noopener noreferrer">Repository</a></p>

        </section>
      </div>

      <PortfolioFooter isDarkMode={isDarkMode} />

      {isShareModalOpen && (
        <ShareModal
          portfolioUrl={portfolioUrl}
          onClose={closeShareModal}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
};

export default UserPortfolio;