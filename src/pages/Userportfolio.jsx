import React, { useState, useEffect, useRef } from 'react';
import JSZip from 'jszip';
import { jsPDF } from 'jspdf';

import { faSun, faMoon, faDownload, faBars, faEnvelope  } from '@fortawesome/free-solid-svg-icons';
import styles from './UserPortfolio.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub,faTwitter } from '@fortawesome/free-brands-svg-icons'; 


const UserPortfolio = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [portfolioData, setPortfolioData] = useState({
    name: 'Your Name',
    profession: 'Your Profession',
    bio: 'Short bio…',
    email: '',
    linkedin: '#',
    github: '#',
    image: null, // Add image field to default state
    skills: [],
    experience: [],
    projects: [],
    education: [],
  });
  const [profileImage, setProfileImage] = useState('/placeholder.png'); // Fixed path
  const downloadOptionsRef = useRef(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedTheme);

    try {
      const data = JSON.parse(localStorage.getItem('portfolioData'));
      if (data) {
        setPortfolioData(data);
        
        if (data.image) {
          setProfileImage(data.image);
        }
      }
    } catch (error) {
      console.warn('No portfolio data found in localStorage. Using placeholders.');
    }


    const handleClickOutside = (e) => {
      if (downloadOptionsRef.current && !downloadOptionsRef.current.contains(e.target)) {
        setIsDownloadOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

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
      const navbarHeight =  48;

      
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offset = navbarHeight + 20; 
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth" // Ensure smooth scrolling
      });
    }
  };

  const generateResumePDF = (data) => {
    const doc = new jsPDF({ unit: 'pt' });
    const pageWidth = 595;
    const pageHeight = 842;
    const leftMargin = 72;
    const rightMargin = 72;
    const topMargin = 72;
    const bottomMargin = 72;
    const contentWidth = pageWidth - leftMargin - rightMargin;
    let y = topMargin;

    const fontSizeHeading = 15;
    const fontSizeBody = 12;
    const lineHeight = 18;
    const smallSpace = 10;
    const headingSpaceAfter = 20;

    const checkPageOverflow = (doc, y) => {
      if (y > pageHeight - bottomMargin) {
        doc.addPage();
        return topMargin;
      }
      return y;
    };

    // Name
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text(data.name || 'Your Name', pageWidth / 2, y, { align: 'center' });
    y += 30;

    // Profession
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(16);
    doc.text(data.profession || 'Your Profession', pageWidth / 2, y, { align: 'center' });
    y += 30;

    // Contact Information
    doc.setFontSize(fontSizeBody);
    const contacts = [
      { label: 'Email:', field: 'email' },
      { label: 'LinkedIn:', field: 'linkedin' },
      { label: 'GitHub:', field: 'github' },
    ];
    const existingContacts = contacts.filter((contact) => data[contact.field]);
    doc.setFont('helvetica', 'bold');
    let maxLabelWidth = 0;
    existingContacts.forEach((contact) => {
      const width = doc.getTextWidth(contact.label);
      if (width > maxLabelWidth) maxLabelWidth = width;
    });
    existingContacts.forEach((contact) => {
      y = checkPageOverflow(doc, y);
      doc.setFont('helvetica', 'bold');
      doc.text(contact.label, leftMargin, y);
      const valueX = leftMargin + maxLabelWidth + 5;
      doc.setFont('helvetica', 'normal');
      doc.text(data[contact.field], valueX, y);
      y += lineHeight;
    });
    y += smallSpace;
    y += 15;

    // About Me
    if (data.bio) {
      y = checkPageOverflow(doc, y);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(fontSizeHeading);
      doc.text('ABOUT ME', leftMargin, y);
      y += 5;
      doc.line(leftMargin, y, pageWidth - rightMargin, y);
      y += headingSpaceAfter;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(fontSizeBody);
      const bioLines = doc.splitTextToSize(data.bio, contentWidth);
      bioLines.forEach((line) => {
        y = checkPageOverflow(doc, y);
        doc.text(line, leftMargin, y);
        y += lineHeight;
      });
      y += smallSpace;
    }

    // Skills
    if (data.skills?.length) {
      y = checkPageOverflow(doc, y);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(fontSizeHeading);
      doc.text('SKILLS', leftMargin, y);
      y += 5;
      doc.line(leftMargin, y, pageWidth - rightMargin, y);
      y += headingSpaceAfter;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(fontSizeBody);
      data.skills.forEach((skill) => {
        y = checkPageOverflow(doc, y);
        doc.text('• ' + skill, leftMargin, y);
        y += lineHeight;
      });
      y += smallSpace;
    }

    // Experience
    if (data.experience?.length) {
      y = checkPageOverflow(doc, y);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(fontSizeHeading);
      doc.text('EXPERIENCE', leftMargin, y);
      y += 5;
      doc.line(leftMargin, y, pageWidth - rightMargin, y);
      y += headingSpaceAfter;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(fontSizeBody);
      data.experience.forEach((exp) => {
        y = checkPageOverflow(doc, y);
        const titleText = `${exp.title || ''} at ${exp.company || ''}`;
        doc.text('• ' + titleText, leftMargin, y);
        if (exp.duration) {
          const durationWidth = doc.getTextWidth(exp.duration);
          doc.text(exp.duration, pageWidth - rightMargin - durationWidth, y);
        }
        y += lineHeight;
        if (exp.description) {
          const descLines = doc.splitTextToSize(exp.description, contentWidth - 10);
          descLines.forEach((line) => {
            y = checkPageOverflow(doc, y);
            doc.text(line, leftMargin + 10, y);
            y += lineHeight;
          });
        }
        y += smallSpace;
      });
    }

    // Education
    if (data.education?.length) {
      y = checkPageOverflow(doc, y);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(fontSizeHeading);
      doc.text('EDUCATION', leftMargin, y);
      y += 5;
      doc.line(leftMargin, y, pageWidth - rightMargin, y);
      y += headingSpaceAfter;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(fontSizeBody);
      data.education.forEach((ed) => {
        y = checkPageOverflow(doc, y);
        const eduText = `${ed.degree || ''} at ${ed.institution || ''}`;
        doc.text('• ' + eduText, leftMargin, y);
        if (ed.duration) {
          const durationWidth = doc.getTextWidth(ed.duration);
          doc.text(ed.duration, pageWidth - rightMargin - durationWidth, y);
        }
        y += lineHeight;
        if (ed.description) {
          const descLines = doc.splitTextToSize(ed.description, contentWidth - 10);
          descLines.forEach((line) => {
            y = checkPageOverflow(doc, y);
            doc.text(line, leftMargin + 10, y);
            y += lineHeight;
          });
        }
        y += smallSpace;
      });
    }

    // Projects
    if (data.projects?.length) {
      y = checkPageOverflow(doc, y);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(fontSizeHeading);
      doc.text('PROJECTS', leftMargin, y);
      y += 5;
      doc.line(leftMargin, y, pageWidth - rightMargin, y);
      y += headingSpaceAfter;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(fontSizeBody);
      data.projects.forEach((project) => {
        y = checkPageOverflow(doc, y);
        doc.text('• ' + (project.title || ''), leftMargin, y);
        y += lineHeight;
        if (project.link) {
          y = checkPageOverflow(doc, y);
          doc.text(`Link: ${project.link}`, leftMargin + 10, y);
          y += lineHeight;
        }
        if (project.techStack) {
          y = checkPageOverflow(doc, y);
          doc.text(`Tech Stack: ${project.techStack}`, leftMargin + 10, y);
          y += lineHeight;
        }
        if (project.description) {
          const descLines = doc.splitTextToSize(project.description, contentWidth - 10);
          descLines.forEach((line) => {
            y = checkPageOverflow(doc, y);
            doc.text(line, leftMargin + 10, y);
            y += lineHeight;
          });
        }
        y += smallSpace;
      });
    }

    doc.save('resume.pdf');
  };

  const generateStaticBundle = (data) => {
    const zip = new JSZip();

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />

  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>User Portfolio</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
    .container { max-width: 1200px; margin: auto; padding: 20px; }
    h1, h2 { color: #333; }
    p { color: #555; }
  </style>
</head>
<body>
  <div class="container">
    <h1>${data.name}</h1>
    <p>${data.profession}</p>
    <h2>About Me</h2>
    <p>${data.bio}</p>
  </div>
</body>
</html>`;

    zip.file('index.html', htmlContent);

    
    if (data.image && data.image.startsWith('data:')) {
      const imgName = data.image.includes('data:image/png') ? 'images/profile.png' : 'images/profile.jpg';
      zip.file(imgName, data.image.split(',')[1], { base64: true });
    }

    zip.generateAsync({ type: 'blob' }).then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'portfolio-bundle.zip';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  };

  const handleDownload = (e, type) => {
    e.preventDefault();
    setIsDownloadOpen(false);
    if (type === 'resume') {
      generateResumePDF(portfolioData);
    } else if (type === 'bundle') {
      generateStaticBundle(portfolioData);
    }
  };

  // Add error handling for image loading
  const handleImageError = (e) => {
    console.warn('Image failed to load, using placeholder');
    e.target.src = '/placeholder.png';
  };

  return (
    <div className={isDarkMode ? styles.darkMode : ''}>
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

        <section id="about">
          <h2>About Me</h2>
          <p>{portfolioData.bio}</p>
        </section>

        <section id="skills">
          <h2>Skills</h2>
          {portfolioData.skills.length ? (
            <ul className={styles.skills}>
              {portfolioData.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          ) : (
            <p>No skills listed.</p>
          )}
        </section>

        <section id="experience">
          <h2>Experience</h2>
          {portfolioData.experience.length ? (
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

        <section id="projects">
          <h2>Projects</h2>
          {portfolioData.projects.length ? (
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

        <section id="education">
          <h2>Education</h2>
          {portfolioData.education.length ? (
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

        <section id="contact">
          <h2>Contact</h2>
          <p>Email: <span>{portfolioData.email}</span></p>
          <p>LinkedIn: <a href={portfolioData.linkedin} target="_blank" rel="noopener noreferrer">Profile</a></p>
          <p>GitHub: <a href={portfolioData.github} target="_blank" rel="noopener noreferrer">Repository</a></p>
        </section>
      </div>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>Crafted with ❤️ by the <strong>XFolio</strong> Team.</p>
          <div className={styles.footerLinks}>
            <a href="mailto:support@xfolio.com" aria-label="Email">
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
            <a href="https://github.com/your-github" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a href="https://twitter.com/your-twitter" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </div>
          <p className={styles.footerNote}>© 2025 XFolio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default UserPortfolio;