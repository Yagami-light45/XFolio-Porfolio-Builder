//  Minimalist Professional Theme

import React, { useState, useEffect } from 'react';
import { generateResumePDF } from '../utils/pdfGenerator';
import { useParams } from 'react-router-dom';
import { generateStaticBundle } from '../utils/Template4BundleGenerator';
import { faSun, faMoon, faDownload, faBars, faEnvelope, faMapMarkerAlt, faPhone, faPrint, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import styles from './Template4Portfolio.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import PortfolioFooter from './PortfolioFooter';
import { printPortfolio } from '../utils/printTemplate4';
import ShareModal from './ShareModal';

const Template4Portfolio = () => {
  const { username } = useParams();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [portfolioData, setPortfolioData] = useState(null);
  const [profileImage, setProfileImage] = useState('/placeholder.png');
  const [activeSection, setActiveSection] = useState('about');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

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
      document.body.classList.add('template4DarkMode');
    } else {
      document.body.classList.remove('template4DarkMode');
    }
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'skills', 'experience', 'projects', 'education', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleNav = () => setIsNavOpen(!isNavOpen);

  const handleNavClick = (event) => {
    event.preventDefault();
    setIsNavOpen(false);
    const targetId = event.currentTarget.getAttribute('href').substring(1);
    setActiveSection(targetId);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth"
      });
    }
  };

  const handlePrintPortfolio = () => {
    if (!portfolioData) {
      console.warn("Portfolio data not loaded, cannot print.");
      return;
    }
    printPortfolio(styles);
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

  const portfolioUrl = window.location.href;
  const openShareModal = () => setIsShareModalOpen(true);
  const closeShareModal = () => setIsShareModalOpen(false);

  const handleImageError = (e) => {
    console.warn('Image failed to load, using placeholder');
    e.target.src = '/placeholder.png';
  };

  if (!portfolioData) {
    return (
      <div className={`${styles.template4PortfolioRoot} ${isDarkMode ? styles.template4DarkMode : ''}`}>
        <div className={styles.template4LoadingContainer}>
          <div className={styles.template4LoadingSpinner}></div>
          <h2>Loading Portfolio...</h2>
          <p>Please wait while we fetch your information.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.template4PortfolioRoot} ${isDarkMode ? styles.template4DarkMode : ''}`}>
      <header className={styles.template4Header}>
        <div className={styles.template4HeaderContent}>
          <div className={styles.template4Logo}>
            <span className={styles.template4LogoBracket}>{'<'}</span>
            Portfolio
            <span className={styles.template4LogoBracket}>{'/>'}</span>
          </div>
          <nav className={`${styles.template4NavLinks} ${isNavOpen ? styles.template4NavActive : ''}`}>
            <ul>
              <li><a href="#about" onClick={handleNavClick} className={activeSection === 'about' ? styles.template4Active : ''}>About</a></li>
              <li><a href="#skills" onClick={handleNavClick} className={activeSection === 'skills' ? styles.template4Active : ''}>Skills</a></li>
              <li><a href="#experience" onClick={handleNavClick} className={activeSection === 'experience' ? styles.template4Active : ''}>Experience</a></li>
              <li><a href="#projects" onClick={handleNavClick} className={activeSection === 'projects' ? styles.template4Active : ''}>Projects</a></li>
              <li><a href="#education" onClick={handleNavClick} className={activeSection === 'education' ? styles.template4Active : ''}>Education</a></li>
              <li><a href="#contact" onClick={handleNavClick} className={activeSection === 'contact' ? styles.template4Active : ''}>Contact</a></li>
            </ul>
          </nav>
          <div className={styles.template4HeaderActions}>
            <button className={styles.template4ThemeToggle} onClick={toggleDarkMode} aria-label="Toggle theme">
              <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
            </button>
            <button className={styles.template4MobileMenu} onClick={toggleNav} aria-label="Toggle menu">
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>
      </header>

      <main className={styles.template4Main}>
        <section className={styles.template4HeroSection}>
          <div className={styles.template4HeroContent}>
            <div className={styles.template4HeroLeft}>
              <div className={styles.template4HeroText}>
                <h1 className={styles.template4HeroTitle}>
                  Hello, I'm <span className={styles.template4NameHighlight}>{portfolioData.name}</span>
                </h1>
                <p className={styles.template4HeroSubtitle}>{portfolioData.profession}</p>
                <p className={styles.template4HeroBio}>{portfolioData.bio}</p>
                <div className={styles.template4HeroButtons}>
                  <button className={styles.template4PrimaryButton} onClick={() => handleDownload('resume')}>
                    <FontAwesomeIcon icon={faDownload} />
                    Download Resume
                  </button>
                  <button className={styles.template4SecondaryButton} onClick={() => handleDownload('bundle')}>
                    <FontAwesomeIcon icon={faDownload} />
                    Get Bundle
                  </button>
                  <button className={styles.template4SecondaryButton} onClick={handlePrintPortfolio}>
                    <FontAwesomeIcon icon={faPrint} />
                    Print Portfolio
                  </button>
                  <button className={styles.template4SecondaryButton} onClick={openShareModal}>
                    <FontAwesomeIcon icon={faShareAlt} />
                    Share
                  </button>
                </div>
              </div>
            </div>
            <div className={styles.template4HeroRight}>
              <div className={styles.template4ImageContainer}>
                <img
                  src={profileImage}
                  alt="Profile"
                  onError={handleImageError}
                  className={styles.template4ProfileImage}
                />
                <div className={styles.template4ImageFrame}></div>
              </div>
            </div>
          </div>
        </section>

        <div className={styles.template4ContentContainer}>
          <section id="about" className={styles.template4Section}>
            <div className={styles.template4SectionHeader}>
              <h2 className={styles.template4SectionTitle}>About Me</h2>
              <div className={styles.template4SectionLine}></div>
            </div>
            <div className={styles.template4AboutContent}>
              <p className={styles.template4AboutText}>{portfolioData.bio}</p>
            </div>
          </section>

          <section id="skills" className={styles.template4Section}>
            <div className={styles.template4SectionHeader}>
              <h2 className={styles.template4SectionTitle}>Skills & Expertise</h2>
              <div className={styles.template4SectionLine}></div>
            </div>
            <div className={styles.template4SkillsGrid}>
              {portfolioData.skills && portfolioData.skills.length ? (
                portfolioData.skills.map((skill, index) => (
                  <div key={index} className={styles.template4SkillCard}>
                    <span className={styles.template4SkillName}>{skill}</span>
                  </div>
                ))
              ) : (
                <p className={styles.template4EmptyState}>No skills listed yet.</p>
              )}
            </div>
          </section>

          <section id="experience" className={styles.template4Section}>
            <div className={styles.template4SectionHeader}>
              <h2 className={styles.template4SectionTitle}>Professional Experience</h2>
              <div className={styles.template4SectionLine}></div>
            </div>
            <div className={styles.template4Timeline}>
              {portfolioData.experience && portfolioData.experience.length ? (
                portfolioData.experience.map((exp, index) => (
                  <div key={index} className={styles.template4TimelineItem}>
                    <div className={styles.template4TimelineMarker}></div>
                    <div className={styles.template4TimelineContent}>
                      <h3 className={styles.template4ExperienceTitle}>{exp.title}</h3>
                      <p className={styles.template4ExperienceCompany}>{exp.company}</p>
                      <p className={styles.template4ExperienceDuration}>{exp.duration}</p>
                      <p className={styles.template4ExperienceDescription}>{exp.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className={styles.template4EmptyState}>No experience listed yet.</p>
              )}
            </div>
          </section>

          <section id="projects" className={styles.template4Section}>
            <div className={styles.template4SectionHeader}>
              <h2 className={styles.template4SectionTitle}>Featured Projects</h2>
              <div className={styles.template4SectionLine}></div>
            </div>
            <div className={styles.template4ProjectsGrid}>
              {portfolioData.projects && portfolioData.projects.length ? (
                portfolioData.projects.map((project, index) => (
                  <div key={index} className={styles.template4ProjectCard}>
                    <div className={styles.template4ProjectHeader}>
                      <h3 className={styles.template4ProjectTitle}>{project.title}</h3>
                      <span className={styles.template4ProjectNumber}>0{index + 1}</span>
                    </div>
                    <p className={styles.template4ProjectTech}>{project.techStack}</p>
                    <p className={styles.template4ProjectDescription}>{project.description}</p>
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.template4ProjectLink}>
                      View Project →
                    </a>
                  </div>
                ))
              ) : (
                <p className={styles.template4EmptyState}>No projects listed yet.</p>
              )}
            </div>
          </section>

          <section id="education" className={styles.template4Section}>
            <div className={styles.template4SectionHeader}>
              <h2 className={styles.template4SectionTitle}>Education</h2>
              <div className={styles.template4SectionLine}></div>
            </div>
            <div className={styles.template4EducationGrid}>
              {portfolioData.education && portfolioData.education.length ? (
                portfolioData.education.map((ed, index) => (
                  <div key={index} className={styles.template4EducationCard}>
                    <h3 className={styles.template4EducationDegree}>{ed.degree}</h3>
                    <p className={styles.template4EducationInstitution}>{ed.institution}</p>
                    <p className={styles.template4EducationDuration}>{ed.duration}</p>
                    <p className={styles.template4EducationDescription}>{ed.description}</p>
                  </div>
                ))
              ) : (
                <p className={styles.template4EmptyState}>No education listed yet.</p>
              )}
            </div>
          </section>

          <section id="contact" className={styles.template4Section}>
            <div className={styles.template4SectionHeader}>
              <h2 className={styles.template4SectionTitle}>Get In Touch</h2>
              <div className={styles.template4SectionLine}></div>
            </div>
            <div className={styles.template4ContactContent}>
              <div className={styles.template4ContactText}>
                <h3 className={styles.template4ContactHeading}>Let's work together</h3>
                <p className={styles.template4ContactDescription}>
                  I'm always interested in new opportunities and collaborations.
                  Feel free to reach out if you'd like to discuss a project or just say hello.
                </p>
              </div>
              <div className={styles.template4ContactLinks}>
                <a href={`mailto:${portfolioData.email}`} className={styles.template4ContactLink}>
                  <FontAwesomeIcon icon={faEnvelope} />
                  <span>{portfolioData.email}</span>
                </a>
                <a href={portfolioData.linkedin} target="_blank" rel="noopener noreferrer" className={styles.template4ContactLink}>
                  <FontAwesomeIcon icon={faLinkedin} />
                  <span>LinkedIn Profile</span>
                </a>
                <a href={portfolioData.github} target="_blank" rel="noopener noreferrer" className={styles.template4ContactLink}>
                  <FontAwesomeIcon icon={faGithub} />
                  <span>GitHub Profile</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>

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

export default Template4Portfolio;