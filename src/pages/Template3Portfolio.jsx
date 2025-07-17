import React, { useState, useEffect, useRef } from 'react';
import { generateResumePDF } from '../utils/pdfGenerator';
import { useParams } from 'react-router-dom';
import { generateStaticBundle } from '../utils/staticBundleGenerator';
import { faSun, faMoon, faDownload, faBars, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import styles from './Template3Portfolio.module.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import PortfolioFooter from './PortfolioFooter';

const Template3Portfolio = () => {
  const { username } = useParams();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [portfolioData, setPortfolioData] = useState(null);
  const [profileImage, setProfileImage] = useState('/placeholder.png');

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

  useEffect(() => {
    
    if (isDarkMode) {
      document.body.classList.add('template3DarkMode');
    } else {
      document.body.classList.remove('template3DarkMode');
    }
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);


  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleNav = () => setIsNavOpen(!isNavOpen);

  const handleNavClick = (event) => {
    event.preventDefault();
    setIsNavOpen(false);
    const targetId = event.currentTarget.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70, 
        behavior: "smooth"
      });
    }
  };

  const handleDownload = (type) => {
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

  const handleImageError = (e) => {
    console.warn('Image failed to load, using placeholder');
    e.target.src = '/placeholder.png';
  };

  if (!portfolioData) {
    return (
      <div className={`${styles.template3PortfolioRoot} ${isDarkMode ? styles.template3DarkMode : ''}`}>
        <div className={styles.template3LoadingContainer}>
          <h2>Loading your portfolio...</h2>
          <p>This might take a moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.template3PortfolioRoot} ${isDarkMode ? styles.template3DarkMode : ''}`}>
      <header className={styles.template3Header}>
        <div className={styles.template3HeaderContent}>
          <div className={styles.template3Logo}>My Portfolio</div>
          <nav className={`${styles.template3NavLinks} ${isNavOpen ? styles.template3Active : ''}`}>
            <ul>
              <li><a href="#about" onClick={handleNavClick}>About</a></li>
              <li><a href="#skills" onClick={handleNavClick}>Skills</a></li>
              <li><a href="#experience" onClick={handleNavClick}>Experience</a></li>
              <li><a href="#projects" onClick={handleNavClick}>Projects</a></li>
              <li><a href="#education" onClick={handleNavClick}>Education</a></li>
              <li><a href="#contact" onClick={handleNavClick}>Contact</a></li>
            </ul>
          </nav>
          <div className={styles.template3HeaderButtons}>
            <button className={styles.template3DarkModeToggle} onClick={toggleDarkMode} aria-label="Toggle dark mode">
              <FontAwesomeIcon icon={isDarkMode ? faMoon : faSun} />
            </button>
            <button className={styles.template3Hamburger} onClick={toggleNav} aria-label="Toggle navigation">
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>
      </header>

      <div className={styles.template3HeroSection}>
        <img
          src={profileImage}
          alt="Profile"
          onError={handleImageError}
          className={styles.template3HeroImage}
        />
        <h1>{portfolioData.name}</h1>
        <p className={styles.template3HeroSubtitle}>{portfolioData.profession}</p>
        <div className={styles.template3HeroActions}>
            <button className={styles.template3ActionButton} onClick={() => handleDownload('resume')}>
                <FontAwesomeIcon icon={faDownload} /> Download Resume
            </button>
            <button className={styles.template3ActionButton} onClick={() => handleDownload('bundle')}>
                <FontAwesomeIcon icon={faDownload} /> Download Bundle
            </button>
        </div>
      </div>

      <div className={styles.template3Container}>
        <section id="about" className={styles.template3Section}>
          <h2>About Me</h2>
          <p>{portfolioData.bio}</p>
        </section>

        <section id="skills" className={styles.template3Section}>
          <h2>Skills</h2>
          {portfolioData.skills && portfolioData.skills.length ? (
            <ul className={styles.template3Skills}>
              {portfolioData.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          ) : (
            <p>No skills listed.</p>
          )}
        </section>

        <section id="experience" className={styles.template3Section}>
          <h2>Experience</h2>
          {portfolioData.experience && portfolioData.experience.length ? (
            <div>
              {portfolioData.experience.map((exp, index) => (
                <div key={index} className={styles.template3ExperienceItem}>
                  <h3>{exp.title} at {exp.company}</h3>
                  <p className={styles.template3Duration}>{exp.duration}</p>
                  <p>{exp.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No experience listed.</p>
          )}
        </section>

        <section id="projects" className={styles.template3Section}>
          <h2>Projects</h2>
          {portfolioData.projects && portfolioData.projects.length ? (
            <div className={styles.template3ProjectsGrid}>
              {portfolioData.projects.map((project, index) => (
                <div key={index} className={styles.template3ProjectCard}>
                  <h3>{project.title}</h3>
                  <p className={styles.template3TechStack}>Tech Stack: {project.techStack}</p>
                  <p>{project.description}</p>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.template3ProjectLink}>View Project</a>
                </div>
              ))}
            </div>
          ) : (
            <p>No projects listed.</p>
          )}
        </section>

        <section id="education" className={styles.template3Section}>
          <h2>Education</h2>
          {portfolioData.education && portfolioData.education.length ? (
            <div>
              {portfolioData.education.map((ed, index) => (
                <div key={index} className={styles.template3EducationItem}>
                  <h3>{ed.degree} at {ed.institution}</h3>
                  <p className={styles.template3Duration}>{ed.duration}</p>
                  <p>{ed.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No education listed.</p>
          )}
        </section>

        <section id="contact" className={styles.template3Section}>
          <h2>Contact</h2>
          <div className={styles.template3ContactInfo}>
              <p><FontAwesomeIcon icon={faEnvelope} /> Email: <span>{portfolioData.email}</span></p>
              <p><FontAwesomeIcon icon={faLinkedin} /> LinkedIn: <a href={portfolioData.linkedin} target="_blank" rel="noopener noreferrer">Profile</a></p>
              <p><FontAwesomeIcon icon={faGithub} /> GitHub: <a href={portfolioData.github} target="_blank" rel="noopener noreferrer">Repository</a></p>
          </div>
        </section>
      </div>

      <PortfolioFooter isDarkMode={isDarkMode}/>
    </div>
  );
};

export default Template3Portfolio;