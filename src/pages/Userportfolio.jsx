// Userportfolio.jsx (Modified useEffect and removed localStorage parsing for portfolioData)

import React, { useState, useEffect, useRef } from 'react';
import { generateResumePDF } from '../utils/pdfGenerator';
import { useParams } from 'react-router-dom'; 
import { generateStaticBundle } from '../utils/staticBundleGenerator';
import { faSun, faMoon, faDownload, faBars, faEnvelope  } from '@fortawesome/free-solid-svg-icons';
import styles from './UserPortfolio.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub,faInstagram} from '@fortawesome/free-brands-svg-icons'; 
import PortfolioFooter from './PortfolioFooter';


const UserPortfolio = () => {
  const { username } = useParams(); // Get the username from the URL
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [portfolioData, setPortfolioData] = useState(null); // Initialize as null to show loading state initially
  const [profileImage, setProfileImage] = useState('/placeholder.png'); 
  const downloadOptionsRef = useRef(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedTheme);

    const fetchPortfolioData = async () => {
      // If a username is provided in the URL, fetch that specific portfolio
      if (username) {
        try {
          const response = await fetch(`http://localhost:5000/api/portfolios/${username}`); // Fetch by username
          const data = await response.json();

          if (response.ok) {
            setPortfolioData(data);
            if (data.image) {
              setProfileImage(data.image);
            }
          } else {
            console.error('Failed to fetch portfolio:', data.message || response.statusText);
            // Handle 404 or other errors by showing a "not found" state or redirecting
            setPortfolioData({ // Fallback to a "not found" state
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
          setPortfolioData({ // Fallback to default on network error
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
        // If no username in URL (e.g., direct navigation to /portfolio), 
        // try to load the last generated username from localStorage and fetch it.
        // This is a fallback/convenience for the /portfolio route.
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
              setPortfolioData({ // Fallback to default if not found
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
            setPortfolioData({ // Fallback to default on network error
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
          // If no username and no last generated username, show initial placeholder
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
  }, [username]); // Add username to dependency array so it re-fetches if the URL username changes

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleNav = () => setIsNavOpen(!isNavOpen);
  const toggleDownload = (e) => {
    e.stopPropagation();
    setIsDownloadOpen(!isDownloadOpen);
  };
 const handleNavClick = (event) => { 
    event.preventDefault(); 
    setIsNavOpen(false);

    const targetId = event.currentTarget.getAttribute('href'); 
    const targetElement = document.querySelector(targetId); 

    if (targetElement) {
      // Get the current height of the fixed navbar
      const navbar = document.querySelector(`.${styles.glassNavbar}`);
      const navbarHeight =  65;
      
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
    if (!portfolioData) { // Prevent download if data isn't loaded yet
      console.warn("Portfolio data not loaded, cannot download.");
      return;
    }
    if (type === 'resume') {
      generateResumePDF(portfolioData);
    } else if (type === 'bundle') {
      generateStaticBundle(portfolioData);
    }
  };

  const handleImageError = (e) => {
    console.warn('Image failed to load, using placeholder');
    e.target.src = '/placeholder.png';
  };

  // Render a loading state or default content if portfolioData is not yet loaded
  if (!portfolioData) {
    return (
      <div className={`${styles.root} ${isDarkMode ? styles.darkMode : ''}`}>
        <nav className={styles.glassNavbar}>
          <div className={styles.navbarContainer}>
            <div className={styles.logo}>Welcome..!</div>
          </div>
        </nav>
        <div className={styles.container} style={{ textAlign: 'center', padding: '50px' , marginTop : '4rem'}}>
          <h2>Loading your portfolio...</h2>
          <p>This might take a moment if it's the first time.</p>
        </div>
        <PortfolioFooter isDarkMode={isDarkMode}/>
      </div>
    );
  }

  return (
    <div className={`${styles.root} ${isDarkMode ? styles.darkMode : ''}`}>
      <nav className={styles.glassNavbar}>
        <div className={styles.navbarContainer}>
          <div className={styles.logo}>Welcome..!</div>
          <ul className={`${styles.navLinks} ${isNavOpen ? styles.active : ''}`}>
            <li><a href="#about" onClick={handleNavClick}>About</a></li>
            <li><a href="#skills" onClick={handleNavClick}>Skills</a></li>
            <li><a href="#experience" onClick={handleNavClick}>Experience</a></li>
            <li><a href="#projects" onClick={handleNavClick}>Projects</a></li>
            <li><a href="#contact" onClick={handleNavClick}>Contact</a></li>
          </ul>
          <div className={styles.navbarButtons}>
            <div ref={downloadOptionsRef} className={`${styles.downloadOptions} ${isDownloadOpen ? styles.active : ''}`}>
              <button className={styles.downloadBtn} onClick={toggleDownload} aria-label="Download Options" aria-haspopup="true" aria-expanded={isDownloadOpen}>
                <FontAwesomeIcon icon={faDownload} />
              </button>
              <div className={styles.downloadMenu} role="menu">
                <a href="#" onClick={(e) => handleDownload(e, 'resume')}>Download Resume</a>
                <a href="#" onClick={(e) => handleDownload(e, 'bundle')}>Download Static Bundle</a>
              </div>
            </div>
            <button className={styles.darkModeToggle} onClick={toggleDarkMode} aria-label="Toggle dark mode">
              <FontAwesomeIcon icon={isDarkMode ? faMoon : faSun} className={isDarkMode ? styles.moonIcon : styles.sunIcon} />
            </button>
            <button className={styles.hamburger} onClick={toggleNav} aria-label="Toggle navigation">
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>
      </nav>

      <div className={styles.container}>
        <div className={styles.profile}>
          <img 
            src={profileImage} 
            alt="Profile" 
            onError={handleImageError}
          />
          <h1>{portfolioData.name}</h1>
          <p className={styles.subtitle}>{portfolioData.profession}</p>
        </div>

        <section id="about" className={styles.about}>
          <h2>About Me</h2>
          <p>{portfolioData.bio}</p>
        </section>

        <section id="skills" className={styles.about}>
          <h2>Skills</h2>
          {portfolioData.skills && portfolioData.skills.length ? (
            <ul className={styles.skills}>
              {portfolioData.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          ) : (
            <p>No skills listed.</p>
          )}
        </section>

        <section id="experience" className={styles.about}>
          <h2>Experience</h2>
          {portfolioData.experience && portfolioData.experience.length ? (
            <div>
              {portfolioData.experience.map((exp, index) => (
                <div key={index} className={styles.experienceItem}>
                  <h3>{exp.title} at {exp.company}</h3>
                  <p className={styles.duration}>{exp.duration}</p>
                  <p>{exp.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No experience listed.</p>
          )}
        </section>

        <section id="projects" className={styles.about}>
          <h2>Projects</h2>
          {portfolioData.projects && portfolioData.projects.length ? (
            <div>
              {portfolioData.projects.map((project, index) => (
                <div key={index} className={styles.projectItem}>
                  <h3>{project.title}</h3>
                  <a href={project.link} target="_blank" rel="noopener noreferrer">View Project</a>
                  <p className={styles.techStack}>Tech Stack: {project.techStack}</p>
                  <p>{project.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No projects listed.</p>
          )}
        </section>

        <section id="education" className={styles.about}>
          <h2>Education</h2>
          {portfolioData.education && portfolioData.education.length ? (
            <div>
              {portfolioData.education.map((ed, index) => (
                <div key={index} className={styles.educationItem}>
                  <h3>{ed.degree} at {ed.institution}</h3>
                  <p className={styles.duration}>{ed.duration}</p>
                  <p>{ed.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No education listed.</p>
          )}
        </section>

        <section id="contact" className={styles.contact}>
          <h2>Contact</h2>
              <p>Email: <span>{portfolioData.email}</span></p>
              
              <p>LinkedIn: <a href={portfolioData.linkedin} target="_blank" rel="noopener noreferrer">Profile</a></p>
              <p>GitHub: <a href={portfolioData.github} target="_blank" rel="noopener noreferrer">Repository</a></p>
            
        </section>
      </div>

       <PortfolioFooter  isDarkMode={isDarkMode}/>
    </div>
  );
};

export default UserPortfolio;