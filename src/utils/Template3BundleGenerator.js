// staticBundleGenerator.js
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const generateHTML = (portfolioData) => {
  const profileImageSrc = portfolioData.image || 'placeholder.png';
    
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${portfolioData.name} - Portfolio</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <div class="template3PortfolioRoot" id="portfolioRoot">
        <header class="template3Header">
            <div class="template3HeaderContent">
                <div class="template3Logo">My Portfolio</div>
                <nav class="template3NavLinks" id="navLinks">
                    <ul>
                        <li><a href="#about" onclick="handleNavClick(event)">About</a></li>
                        <li><a href="#skills" onclick="handleNavClick(event)">Skills</a></li>
                        <li><a href="#experience" onclick="handleNavClick(event)">Experience</a></li>
                        <li><a href="#projects" onclick="handleNavClick(event)">Projects</a></li>
                        <li><a href="#education" onclick="handleNavClick(event)">Education</a></li>
                        <li><a href="#contact" onclick="handleNavClick(event)">Contact</a></li>
                    </ul>
                </nav>
                <div class="template3HeaderButtons">
                    <button class="template3DarkModeToggle" onclick="toggleDarkMode()" aria-label="Toggle dark mode">
                        <i class="fas fa-sun" id="themeIcon"></i>
                    </button>
                    <button class="template3Hamburger" onclick="toggleNav()" aria-label="Toggle navigation">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>
            </div>
        </header>

        <div class="template3HeroSection">
            <img src="${profileImageSrc}" alt="Profile" class="template3HeroImage" onerror="this.src='placeholder.png'">
            <h1>${portfolioData.name}</h1>
            <p class="template3HeroSubtitle">${portfolioData.profession}</p>
            <div class="template3HeroActions">
                <button class="template3ActionButton" onclick="window.print()">
                    <i class="fas fa-download"></i> Print Resume
                </button>
            </div>
        </div>

        <div class="template3Container">
            <section id="about" class="template3Section">
                <h2>About Me</h2>
                <p>${portfolioData.bio}</p>
            </section>

            <section id="skills" class="template3Section">
                <h2>Skills</h2>
                ${portfolioData.skills && portfolioData.skills.length ? 
                    `<ul class="template3Skills">
                        ${portfolioData.skills.map(skill => `<li>${skill}</li>`).join('')}
                    </ul>` : 
                    '<p>No skills listed.</p>'
                }
            </section>

            <section id="experience" class="template3Section">
                <h2>Experience</h2>
                ${portfolioData.experience && portfolioData.experience.length ? 
                    portfolioData.experience.map(exp => `
                        <div class="template3ExperienceItem">
                            <h3>${exp.title} at ${exp.company}</h3>
                            <p class="template3Duration">${exp.duration}</p>
                            <p>${exp.description}</p>
                        </div>
                    `).join('') : 
                    '<p>No experience listed.</p>'
                }
            </section>

            <section id="projects" class="template3Section">
                <h2>Projects</h2>
                ${portfolioData.projects && portfolioData.projects.length ? 
                    `<div class="template3ProjectsGrid">
                        ${portfolioData.projects.map(project => `
                            <div class="template3ProjectCard">
                                <h3>${project.title}</h3>
                                <p class="template3TechStack">Tech Stack: ${project.techStack}</p>
                                <p>${project.description}</p>
                                <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="template3ProjectLink">View Project</a>
                            </div>
                        `).join('')}
                    </div>` : 
                    '<p>No projects listed.</p>'
                }
            </section>

            <section id="education" class="template3Section">
                <h2>Education</h2>
                ${portfolioData.education && portfolioData.education.length ? 
                    portfolioData.education.map(ed => `
                        <div class="template3EducationItem">
                            <h3>${ed.degree} at ${ed.institution}</h3>
                            <p class="template3Duration">${ed.duration}</p>
                            <p>${ed.description}</p>
                        </div>
                    `).join('') : 
                    '<p>No education listed.</p>'
                }
            </section>

            <section id="contact" class="template3Section">
                <h2>Contact</h2>
                <div class="template3ContactInfo">
                    <p><i class="fas fa-envelope"></i> Email: <span>${portfolioData.email}</span></p>
                    <p><i class="fab fa-linkedin"></i> LinkedIn: <a href="${portfolioData.linkedin}" target="_blank" rel="noopener noreferrer">Profile</a></p>
                    <p><i class="fab fa-github"></i> GitHub: <a href="${portfolioData.github}" target="_blank" rel="noopener noreferrer">Repository</a></p>
                </div>
            </section>
        </div>

        <footer class="footer">
            <div class="container">
                <p>Crafted with ❤️ by the <strong>XFolio</strong> Team</p>
                
                <div class="footerLinks">
                    <a href="mailto:me240003034@iiti.ac.in" aria-label="Email">
                        <i class="fas fa-envelope"></i>
                    </a>
                    <a href="https://github.com/Yagami-light45" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <i class="fab fa-github"></i>
                    </a>
                    <a href="https://www.instagram.com/itx_harshith_p" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <i class="fab fa-instagram"></i>
                    </a>
                </div>
                
                <div class="footerInfo">
                    <p class="footerNote">
                        <a href="#" class="aboutLink">About XFolio</a>
                    </p>
                    <p class="footerNote">© 2025 XFolio. All rights reserved.</p>
                </div>
            </div>
        </footer>
    </div>

    <script src="script.js"></script>
</body>
</html>`;
};

const generateCSS = () => {
  return `/* Template3Portfolio Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.template3PortfolioRoot {
  min-height: 100vh;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #333;
  transition: background 0.3s ease, color 0.3s ease;
  position: relative;
  overflow-x: hidden;
}

/* Header Navigation */
.template3Header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  transition: background 0.3s ease;
}

.template3HeaderContent {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

.template3Logo {
  font-size: 1.8rem;
  font-weight: 700;
  color: #667eea;
  text-decoration: none;
  margin: 0;
}

.template3NavLinks {
  display: flex;
  transition: all 0.3s ease;
}

.template3NavLinks ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;
}

.template3NavLinks li {
  margin: 0;
}

.template3NavLinks a {
  color: #333;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  transition: color 0.3s ease;
  position: relative;
  padding: 0.5rem 0;
  display: block;
}

.template3NavLinks a:hover {
  color: #667eea;
}

.template3NavLinks a::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: #667eea;
  transition: width 0.3s ease;
}

.template3NavLinks a:hover::after {
  width: 100%;
}

.template3HeaderButtons {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.template3DarkModeToggle {
  background: rgba(102, 126, 234, 0.1);
  border: none;
  padding: 0.8rem;
  border-radius: 50%;
  cursor: pointer;
  color: #667eea;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
}

.template3DarkModeToggle:hover {
  background: rgba(102, 126, 234, 0.2);
  transform: scale(1.1);
}

.template3DarkModeToggle:focus {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}

.template3Hamburger {
  display: none;
  background: none;
  border: none;
  color: #333;
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.3s ease;
  padding: 0.5rem;
}

.template3Hamburger:hover {
  color: #667eea;
}

/* Hero Section */
.template3HeroSection {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  position: relative;
  overflow: hidden;
}

.template3HeroSection::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><polygon fill="%23ffffff08" points="0,0 1000,300 1000,1000 0,700"/></svg>');
  z-index: 1;
}

.template3HeroSection > * {
  position: relative;
  z-index: 2;
}

.template3HeroImage {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid rgba(255, 255, 255, 0.3);
  margin-bottom: 2rem;
  box-shadow: 0 10px 40px rgba(0,0,0,0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.template3HeroImage:hover {
  transform: scale(1.05);
  box-shadow: 0 15px 60px rgba(0,0,0,0.4);
}

.template3HeroSection h1 {
  font-size: 4rem;
  margin-bottom: 1rem;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.template3HeroSubtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  font-weight: 300;
  max-width: 600px;
  line-height: 1.4;
  margin-left: auto;
  margin-right: auto;
}

.template3HeroActions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
  justify-content: center;
}

.template3ActionButton {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
}

.template3ActionButton:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.template3ActionButton:focus {
  outline: 2px solid rgba(255, 255, 255, 0.5);
  outline-offset: 2px;
}

/* Main Container */
.template3Container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  background: white;
  position: relative;
  z-index: 10;
}

/* Sections */
.template3Section {
  margin-bottom: 4rem;
  padding: 3rem 0;
  border-bottom: 1px solid #eee;
}

.template3Section:last-child {
  border-bottom: none;
}

.template3Section h2 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #333;
  text-align: center;
  font-weight: 700;
  position: relative;
}

.template3Section h2::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-radius: 2px;
}

.template3Section p {
  color: #666;
  line-height: 1.8;
  font-size: 1.1rem;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

/* Skills Grid */
.template3Skills {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 2rem 0;
}

.template3Skills li {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 25px;
  font-weight: 500;
  text-align: center;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.template3Skills li:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

/* Experience Items */
.template3ExperienceItem {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 15px;
  margin-bottom: 2rem;
  border-left: 4px solid #667eea;
  transition: all 0.3s ease;
}

.template3ExperienceItem:hover {
  transform: translateX(5px);
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
}

.template3ExperienceItem h3 {
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.template3Duration {
  color: #667eea;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 1rem;
  display: block;
}

.template3ExperienceItem p {
  color: #666;
  line-height: 1.6;
  margin: 0;
  text-align: left;
}

/* Projects Grid */
.template3ProjectsGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.template3ProjectCard {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 25px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  border: 1px solid #eee;
}

.template3ProjectCard:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0,0,0,0.15);
}

.template3ProjectCard h3 {
  color: #333;
  font-size: 1.3rem;
  margin-bottom: 0.8rem;
  font-weight: 600;
  padding: 1.5rem 1.5rem 0;
}

.template3TechStack {
  color: #667eea;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 1rem;
  display: block;
  padding: 0 1.5rem;
}

.template3ProjectCard p {
  color: #666;
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
  padding: 0 1.5rem;
  text-align: left;
}

.template3ProjectLink {
  display: inline-block;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 0.8rem 1.5rem;
  text-decoration: none;
  border-radius: 25px;
  font-weight: 500;
  transition: all 0.3s ease;
  margin: 0 1.5rem 1.5rem;
}

.template3ProjectLink:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

.template3ProjectLink:focus {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}

/* Education Items */
.template3EducationItem {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 15px;
  margin-bottom: 2rem;
  border-left: 4px solid #764ba2;
  transition: all 0.3s ease;
}

.template3EducationItem:hover {
  transform: translateX(5px);
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
}

.template3EducationItem h3 {
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.template3EducationItem p {
  color: #666;
  line-height: 1.6;
  margin: 0;
  text-align: left;
}

/* Contact Information */
.template3ContactInfo {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
  margin: 2rem auto;
}

.template3ContactInfo p {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #f8f9fa;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  margin: 0;
}

.template3ContactInfo p:hover {
  background: #e9ecef;
  transform: translateY(-2px);
}

.template3ContactInfo a {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
}

.template3ContactInfo a:hover {
  text-decoration: underline;
}

.template3ContactInfo span {
  color: #333;
  font-weight: 500;
}

/* Footer Styles */
.footer {
    width: auto;
    padding: 1.7rem;
    margin-top: 2rem;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-top: 1px solid rgba(255, 255, 255, 0.18);
    text-align: center;
    transition: background-color 0.8s ease, border-color 0.8s ease, color 0.8s ease;
    color: #333;
    position: relative;
}

.container {
    max-width: 960px;
    margin: 0 auto;
    padding: 0;
}

.footerLinks {
    margin: 1rem 0;
}

.footerLinks a {
    margin: 0rem 1.5rem;
    font-size: 1.4rem;
    color: #333;
    transition: color 0.3s ease, transform 0.3s ease;
}

.footerLinks a:hover {
    color: #007BFF;
    transform: scale(1.1);
}

.footerNote {
    margin-top: 0.5rem;
    font-size: 0.9rem;
    color: #555;
    transition: color 0.8s ease;
}

.aboutLink {
    color: #007BFF;
    text-decoration: none;
    font-weight: 500;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    transition: all 0.3s ease;
}

.aboutLink:hover {
    background-color: rgba(0, 123, 255, 0.1);
    color: #0056b3;
    transform: translateY(-1px);
}

/* Dark Mode Styles */
.template3PortfolioRoot.template3DarkMode {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: #e0e0e0;
}

.template3DarkMode .template3Header {
  background: rgba(45, 45, 45, 0.95);
}

.template3DarkMode .template3Logo {
  color: #61dafb;
}

.template3DarkMode .template3NavLinks a {
  color: #e0e0e0;
}

.template3DarkMode .template3NavLinks a:hover {
  color: #61dafb;
}

.template3DarkMode .template3NavLinks a::after {
  background: #61dafb;
}

.template3DarkMode .template3Hamburger {
  color: #e0e0e0;
}

.template3DarkMode .template3Hamburger:hover {
  color: #61dafb;
}

.template3DarkMode .template3DarkModeToggle {
  background: rgba(97, 218, 251, 0.1);
  color: #61dafb;
}

.template3DarkMode .template3DarkModeToggle:hover {
  background: rgba(97, 218, 251, 0.2);
}

.template3DarkMode .template3HeroSection {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
}

.template3DarkMode .template3Container {
  background: #2d2d2d;
}

.template3DarkMode .template3Section {
  border-bottom-color: #444;
}

.template3DarkMode .template3Section h2 {
  color: #e0e0e0;
}

.template3DarkMode .template3Section h2::after {
  background: linear-gradient(45deg, #61dafb, #4fc3f7);
}

.template3DarkMode .template3Section p {
  color: #b0b0b0;
}

.template3DarkMode .template3Skills li {
  background: linear-gradient(135deg, #61dafb, #4fc3f7);
  color: #1a1a1a;
}

.template3DarkMode .template3ExperienceItem,
.template3DarkMode .template3EducationItem {
  background: #3a3a3a;
}

.template3DarkMode .template3ExperienceItem {
  border-left-color: #61dafb;
}

.template3DarkMode .template3EducationItem {
  border-left-color: #4fc3f7;
}

.template3DarkMode .template3ExperienceItem h3,
.template3DarkMode .template3EducationItem h3 {
  color: #e0e0e0;
}

.template3DarkMode .template3Duration {
  color: #61dafb;
}

.template3DarkMode .template3ExperienceItem p,
.template3DarkMode .template3EducationItem p {
  color: #b0b0b0;
}

.template3DarkMode .template3ProjectCard {
  background: #3a3a3a;
  border-color: #555;
}

.template3DarkMode .template3ProjectCard h3 {
  color: #e0e0e0;
}

.template3DarkMode .template3TechStack {
  color: #61dafb;
}

.template3DarkMode .template3ProjectCard p {
  color: #b0b0b0;
}

.template3DarkMode .template3ProjectLink {
  background: linear-gradient(135deg, #61dafb, #4fc3f7);
  color: #1a1a1a;
}

.template3DarkMode .template3ContactInfo p {
  background: #3a3a3a;
}

.template3DarkMode .template3ContactInfo p:hover {
  background: #454545;
}

.template3DarkMode .template3ContactInfo a {
  color: #61dafb;
}

.template3DarkMode .template3ContactInfo span {
  color: #e0e0e0;
}

/* Dark Mode Footer Styles */
.template3PortfolioRoot.template3DarkMode .footer {
    background: rgba(15, 23, 42, 0.85);
    border-top: 1px solid rgba(148, 163, 184, 0.2);
    color: #e2e8f0;
    transition: background-color 0.8s ease, color 0.8s ease, background-image 0.8s ease;
}

.template3PortfolioRoot.template3DarkMode .footerLinks a {
    color: #cbd5e1;
    transition: background-color 0.8s ease, color 0.8s ease, background-image 0.8s ease;
}

.template3PortfolioRoot.template3DarkMode .footerLinks a:hover {
    color: #60a5fa;
    transform: scale(1.15);
    transition: background-color 0.8s ease, color 0.8s ease, background-image 0.8s ease;
}

.template3PortfolioRoot.template3DarkMode .footerNote {
    color: #94a3b8;
}

.template3PortfolioRoot.template3DarkMode .aboutLink {
    color: #60a5fa;
    background-color: transparent;
}

.template3PortfolioRoot.template3DarkMode .aboutLink:hover {
    color: #3b82f6;
    background-color: rgba(96, 165, 250, 0.15);
    transform: translateY(-1px);
}

.template3PortfolioRoot.template3DarkMode .footer::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.8) 100%);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    z-index: -1;
}

/* Responsive Design */
@media (max-width: 768px) {
  .template3HeaderContent {
    padding: 0 1rem;
  }
  
  .template3NavLinks {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    flex-direction: column;
    padding: 1rem 0;
  }
  
  .template3NavLinks.template3Active {
    display: flex;
  }
  .template3DarkMode .template3NavLinks {
  background: rgba(45, 45, 45, 0.95);
  }
  .template3DarkMode .template3NavLinks li {
  border-bottom: 1px solid #555;
  }
  .template3NavLinks ul {
    flex-direction: column;
    gap: 0;
    width: 100%;
  }
  
  .template3NavLinks li {
    border-bottom: 1px solid #eee;
  }
  
  .template3NavLinks li:last-child {
    border-bottom: none;
  }
  
  .template3NavLinks a {
    padding: 1rem 2rem;
    display: block;
  }
  
  .template3Hamburger {
    display: block;
  }
  
  .template3HeroSection h1 {
    font-size: 2.5rem;
  }
  
  .template3HeroSubtitle {
    font-size: 1.2rem;
  }
  
  .template3HeroActions {
    flex-direction: column;
    align-items: center;
  }
  
  .template3ActionButton {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
  
  .template3Container {
    padding: 2rem 1rem;
  }
  
  .template3Section {
    padding: 2rem 0;
  }
  
  .template3Section h2 {
    font-size: 2rem;
  }
  
  .template3ProjectsGrid {
    grid-template-columns: 1fr;
  }
  
  .template3Skills {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
  
  .template3ContactInfo {
    margin: 1rem auto;
  }

  .footer {
    margin-top: 0.5rem;
  }
}

/* Media Query Completion */
@media (max-width: 480px) {
  .template3HeroImage {
    width: 150px;
    height: 150px;
  }
  
  .template3HeroSection h1 {
    font-size: 2rem;
  }
  
  .template3HeroSubtitle {
    font-size: 1rem;
  }
  
  .template3HeroActions {
    gap: 0.5rem;
  }
  
  .template3ActionButton {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
  }
  
  .template3Container {
    padding: 1.5rem 0.5rem;
  }
  
  .template3Section {
    padding: 1.5rem 0;
    margin-bottom: 2rem;
  }
  
  .template3Section h2 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }
  
  .template3Section p {
    font-size: 1rem;
    line-height: 1.6;
  }
  
  .template3Skills {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }
  
  .template3Skills li {
    padding: 0.8rem 1rem;
    font-size: 0.9rem;
  }
  
  .template3ExperienceItem,
  .template3EducationItem {
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .template3ExperienceItem h3,
  .template3EducationItem h3 {
    font-size: 1.2rem;
    margin-bottom: 0.8rem;
  }
  
  .template3ProjectCard {
    margin-bottom: 1.5rem;
  }
  
  .template3ProjectCard h3 {
    font-size: 1.2rem;
    padding: 1rem 1rem 0;
  }
  
  .template3TechStack {
    font-size: 0.8rem;
    padding: 0 1rem;
  }
  
  .template3ProjectCard p {
    font-size: 0.9rem;
    padding: 0 1rem;
  }
  
  .template3ProjectLink {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
    margin: 0 1rem 1rem;
  }
  
  .template3ContactInfo {
    gap: 0.8rem;
  }
  
  .template3ContactInfo p {
    padding: 0.8rem 1rem;
    font-size: 0.9rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .template3HeaderContent {
    height: 60px;
  }
  
  .template3Logo {
    font-size: 1.5rem;
  }
  
  .template3DarkModeToggle {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
  
  .template3Hamburger {
    font-size: 1.2rem;
  }

  .footer {
    margin-top: 0rem;
  }
}

/* Responsive Footer Styles */
@media(max-width: 854px) {
    .footer {
        margin-top: 1rem;
    }
}
`;
};


const generateJS = () => {
  return `document.addEventListener('DOMContentLoaded', () => {
    const portfolioRoot = document.getElementById('portfolioRoot');
    const themeIcon = document.getElementById('themeIcon');
    const navLinks = document.getElementById('navLinks');

    // Function to toggle dark mode
    window.toggleDarkMode = () => {
        portfolioRoot.classList.toggle('template3DarkMode');
        const isDarkMode = portfolioRoot.classList.contains('template3DarkMode');
        localStorage.setItem('darkMode', isDarkMode);
        
        // Update theme icon
        if (themeIcon) {
            if (isDarkMode) {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            } else {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
        }
    };

    // Function to toggle mobile navigation
    window.toggleNav = () => {
        if (navLinks) {
            navLinks.classList.toggle('template3Active');
        }
    };

    // Function to handle smooth scrolling for navigation links
    window.handleNavClick = (event) => {
        event.preventDefault();
        if (navLinks) {
            navLinks.classList.remove('template3Active');
        }

        const targetId = event.currentTarget.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const header = document.querySelector('.template3Header');
            const headerHeight = header ? header.offsetHeight : 70;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20;

            window.scrollTo({
                top: Math.max(0, offsetPosition),
                behavior: "smooth"
            });
        }
    };

    if (localStorage.getItem('darkMode') === 'true') {
        portfolioRoot.classList.add('template3DarkMode');
        if (themeIcon) {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }
});
`;
};


export const generateStaticBundle = async (portfolioData) => {
  const zip = new JSZip();
  const bundledData = { ...portfolioData };

  try {
    const placeholderResponse = await fetch('/placeholder.png');
    if (placeholderResponse.ok) {
        const placeholderBlob = await placeholderResponse.blob();
        zip.file('placeholder.png', placeholderBlob, { binary: true });
    } else {
        console.warn('Could not fetch placeholder.png');
    }
  } catch(error) {
    console.error('Error fetching placeholder image:', error);
  }

 
  if (portfolioData.image && portfolioData.image !== '/placeholder.png') {
    try {
      const response = await fetch(portfolioData.image);
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }
      
      const imageBlob = await response.blob();
      const extension = imageBlob.type.split('/')[1]?.split('+')[0] || 'jpg';
      const imageName = `profile_image.${extension}`;
      
      zip.file(imageName, imageBlob, { binary: true });
      bundledData.image = imageName;

    } catch (error) {
      console.error("Could not fetch or add profile image to bundle. It will be replaced by the placeholder.", error);
      
      bundledData.image = 'placeholder.png'; 
    }
  } else {
     
      bundledData.image = 'placeholder.png';
  }

  const html = generateHTML(bundledData);
  const css = generateCSS();
  const js = generateJS();

  zip.file("index.html", html);
  zip.file("styles.css", css);
  zip.file("script.js", js);

  const content = await zip.generateAsync({ type: "blob" });
  saveAs(content, `${portfolioData.name.replace(/\s+/g, '_')}_Portfolio.zip`);
};