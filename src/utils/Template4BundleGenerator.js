import JSZip from 'jszip';
import { saveAs } from 'file-saver';


 
const generateHTML = (portfolioData) => {
    const profileImageSrc = portfolioData.image && 
        portfolioData.image !== '/placeholder.png' && 
        !portfolioData.image.includes('placeholder') 
        ? `profile.${portfolioData.image.split('.').pop()?.toLowerCase() || 'jpg'}`
        : 'placeholder.svg'; 
    
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${portfolioData.name} - Portfolio</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Fira+Code:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="template4-portfolio-root">
    <header class="template4-header">
        <div class="template4-header-content">
            <div class="template4-logo">
                <span class="template4-logo-bracket">&lt;</span>
                Portfolio
                <span class="template4-logo-bracket">/&gt;</span>
            </div>
            <nav class="template4-nav-links" id="navLinks">
                <ul>
                    <li><a href="#about" class="nav-link template4-active">About</a></li>
                    <li><a href="#skills" class="nav-link">Skills</a></li>
                    <li><a href="#experience" class="nav-link">Experience</a></li>
                    <li><a href="#projects" class="nav-link">Projects</a></li>
                    <li><a href="#education" class="nav-link">Education</a></li>
                    <li><a href="#contact" class="nav-link">Contact</a></li>
                </ul>
            </nav>
            <div class="template4-header-actions">
                <button class="template4-theme-toggle" id="themeToggle" aria-label="Toggle theme">
                    <i class="fas fa-moon"></i>
                </button>
                <button class="template4-mobile-menu" id="mobileMenu" aria-label="Toggle menu">
                    <i class="fas fa-bars"></i>
                </button>
            </div>
        </div>
    </header>

    <main class="template4-main">
        <section class="template4-hero-section">
            <div class="template4-hero-content">
                <div class="template4-hero-left">
                    <div class="template4-hero-text">
                        <h1 class="template4-hero-title">
                            Hello, I'm <span class="template4-name-highlight">${portfolioData.name}</span>
                        </h1>
                        <p class="template4-hero-subtitle">${portfolioData.profession}</p>
                        <p class="template4-hero-bio">${portfolioData.bio}</p>
                    </div>
                </div>
                <div class="template4-hero-right">
                    <div class="template4-image-container">
                        <img src="${profileImageSrc}" alt="Profile" class="template4-profile-image" onerror="this.src='placeholder.svg'">
                        <div class="template4-image-frame"></div>
                    </div>
                </div>
            </div>
        </section>

        <div class="template4-content-container">
            <section id="about" class="template4-section">
                <div class="template4-section-header">
                    <h2 class="template4-section-title">About Me</h2>
                    <div class="template4-section-line"></div>
                </div>
                <div class="template4-about-content">
                    <p class="template4-about-text">${portfolioData.bio}</p>
                </div>
            </section>

            <section id="skills" class="template4-section">
                <div class="template4-section-header">
                    <h2 class="template4-section-title">Skills & Expertise</h2>
                    <div class="template4-section-line"></div>
                </div>
                <div class="template4-skills-grid">
                    ${portfolioData.skills && portfolioData.skills.length ? 
                        portfolioData.skills.map(skill => `
                            <div class="template4-skill-card">
                                <span class="template4-skill-name">${skill}</span>
                            </div>
                        `).join('') : 
                        '<p class="template4-empty-state">No skills listed yet.</p>'
                    }
                </div>
            </section>

            <section id="experience" class="template4-section">
                <div class="template4-section-header">
                    <h2 class="template4-section-title">Professional Experience</h2>
                    <div class="template4-section-line"></div>
                </div>
                <div class="template4-timeline">
                    ${portfolioData.experience && portfolioData.experience.length ? 
                        portfolioData.experience.map(exp => `
                            <div class="template4-timeline-item">
                                <div class="template4-timeline-marker"></div>
                                <div class="template4-timeline-content">
                                    <h3 class="template4-experience-title">${exp.title}</h3>
                                    <p class="template4-experience-company">${exp.company}</p>
                                    <p class="template4-experience-duration">${exp.duration}</p>
                                    <p class="template4-experience-description">${exp.description}</p>
                                </div>
                            </div>
                        `).join('') : 
                        '<p class="template4-empty-state">No experience listed yet.</p>'
                    }
                </div>
            </section>

            <section id="projects" class="template4-section">
                <div class="template4-section-header">
                    <h2 class="template4-section-title">Featured Projects</h2>
                    <div class="template4-section-line"></div>
                </div>
                <div class="template4-projects-grid">
                    ${portfolioData.projects && portfolioData.projects.length ? 
                        portfolioData.projects.map((project, index) => `
                            <div class="template4-project-card">
                                <div class="template4-project-header">
                                    <h3 class="template4-project-title">${project.title}</h3>
                                    <span class="template4-project-number">0${index + 1}</span>
                                </div>
                                <p class="template4-project-tech">${project.techStack}</p>
                                <p class="template4-project-description">${project.description}</p>
                                <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="template4-project-link">
                                    View Project →
                                </a>
                            </div>
                        `).join('') : 
                        '<p class="template4-empty-state">No projects listed yet.</p>'
                    }
                </div>
            </section>

            <section id="education" class="template4-section">
                <div class="template4-section-header">
                    <h2 class="template4-section-title">Education</h2>
                    <div class="template4-section-line"></div>
                </div>
                <div class="template4-education-grid">
                    ${portfolioData.education && portfolioData.education.length ? 
                        portfolioData.education.map(ed => `
                            <div class="template4-education-card">
                                <h3 class="template4-education-degree">${ed.degree}</h3>
                                <p class="template4-education-institution">${ed.institution}</p>
                                <p class="template4-education-duration">${ed.duration}</p>
                                <p class="template4-education-description">${ed.description}</p>
                            </div>
                        `).join('') : 
                        '<p class="template4-empty-state">No education listed yet.</p>'
                    }
                </div>
            </section>

            <section id="contact" class="template4-section">
                <div class="template4-section-header">
                    <h2 class="template4-section-title">Get In Touch</h2>
                    <div class="template4-section-line"></div>
                </div>
                <div class="template4-contact-content">
                    <div class="template4-contact-text">
                        <h3 class="template4-contact-heading">Let's work together</h3>
                        <p class="template4-contact-description">
                            I'm always interested in new opportunities and collaborations. 
                            Feel free to reach out if you'd like to discuss a project or just say hello.
                        </p>
                    </div>
                    <div class="template4-contact-links">
                        <a href="mailto:${portfolioData.email}" class="template4-contact-link">
                            <i class="fas fa-envelope"></i>
                            <span>${portfolioData.email}</span>
                        </a>
                        <a href="${portfolioData.linkedin}" target="_blank" rel="noopener noreferrer" class="template4-contact-link">
                            <i class="fab fa-linkedin"></i>
                            <span>LinkedIn Profile</span>
                        </a>
                        <a href="${portfolioData.github}" target="_blank" rel="noopener noreferrer" class="template4-contact-link">
                            <i class="fab fa-github"></i>
                            <span>GitHub Profile</span>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    </main>

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

    <script src="script.js"></script>
</body>
</html>`;
};

const generateCSS = () => {
  return `/* Template4 Portfolio - Minimalist Professional Theme */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.template4-portfolio-root {
    min-height: 100vh;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    background-color: #fafafa;
    color: #2d3748;
    line-height: 1.6;
    transition: background-color 0.3s ease, color 0.3s ease;
}

/* Dark Mode */
.template4-portfolio-root.template4-dark-mode {
    background-color: #1a202c;
    color: #e2e8f0;
}

.template4-portfolio-root.template4-dark-mode .template4-header {
    background-color: rgba(26, 32, 44, 0.95);
    border-bottom: 1px solid #2d3748;
}

.template4-portfolio-root.template4-dark-mode .template4-logo {
    color: #e2e8f0;
}

.template4-portfolio-root.template4-dark-mode .template4-nav-links a {
    color: #a0aec0;
}

.template4-portfolio-root.template4-dark-mode .template4-nav-links a:hover,
.template4-portfolio-root.template4-dark-mode .template4-nav-links a.template4-active {
    color: #e2e8f0;
}

.template4-portfolio-root.template4-dark-mode .template4-nav-links a::after {
    background-color: #e2e8f0;
}

.template4-portfolio-root.template4-dark-mode .template4-theme-toggle {
    border-color: #4a5568;
    color: #a0aec0;
}

.template4-portfolio-root.template4-dark-mode .template4-theme-toggle:hover {
    border-color: #718096;
    background-color: #2d3748;
}

.template4-portfolio-root.template4-dark-mode .template4-hero-section {
    background-color: #1a202c;
}

.template4-portfolio-root.template4-dark-mode .template4-hero-title {
    color: #e2e8f0;
}

.template4-portfolio-root.template4-dark-mode .template4-name-highlight {
    color: #a0aec0;
}

.template4-portfolio-root.template4-dark-mode .template4-name-highlight::after {
    background-color: #4a5568;
}

.template4-portfolio-root.template4-dark-mode .template4-hero-subtitle {
    color: #718096;
}

.template4-portfolio-root.template4-dark-mode .template4-hero-bio {
    color: #a0aec0;
}

.template4-portfolio-root.template4-dark-mode .template4-section {
    border-bottom: 1px solid #2d3748;
}

.template4-portfolio-root.template4-dark-mode .template4-section-title {
    color: #e2e8f0;
}

.template4-portfolio-root.template4-dark-mode .template4-section-line {
    background-color: #a0aec0;
}

.template4-portfolio-root.template4-dark-mode .template4-about-text {
    color: #a0aec0;
}

.template4-portfolio-root.template4-dark-mode .template4-skill-card {
    background-color: #2d3748;
    border-color: #4a5568;
}

.template4-portfolio-root.template4-dark-mode .template4-skill-name {
    color: #e2e8f0;
}

.template4-portfolio-root.template4-dark-mode .template4-timeline::before {
    background-color: #4a5568;
}

.template4-portfolio-root.template4-dark-mode .template4-timeline-marker {
    background-color: #a0aec0;
    border-color: #1a202c;
    box-shadow: 0 0 0 2px #4a5568;
}

.template4-portfolio-root.template4-dark-mode .template4-timeline-content {
    background-color: #2d3748;
    border-color: #4a5568;
}

.template4-portfolio-root.template4-dark-mode .template4-experience-title {
    color: #e2e8f0;
}

.template4-portfolio-root.template4-dark-mode .template4-experience-company {
    color: #a0aec0;
}

.template4-portfolio-root.template4-dark-mode .template4-experience-duration {
    color: #718096;
}

.template4-portfolio-root.template4-dark-mode .template4-experience-description {
    color: #a0aec0;
}

.template4-portfolio-root.template4-dark-mode .template4-project-card {
    background-color: #2d3748;
    border-color: #4a5568;
}

.template4-portfolio-root.template4-dark-mode .template4-project-title {
    color: #e2e8f0;
}

.template4-portfolio-root.template4-dark-mode .template4-project-number {
    color: #718096;
}

.template4-portfolio-root.template4-dark-mode .template4-project-tech {
    color: #a0aec0;
}

.template4-portfolio-root.template4-dark-mode .template4-project-description {
    color: #a0aec0;
}

.template4-portfolio-root.template4-dark-mode .template4-project-link {
    color: #e2e8f0;
}

.template4-portfolio-root.template4-dark-mode .template4-education-card {
    background-color: #2d3748;
    border-color: #4a5568;
}

.template4-portfolio-root.template4-dark-mode .template4-education-degree {
    color: #e2e8f0;
}

.template4-portfolio-root.template4-dark-mode .template4-education-institution {
    color: #a0aec0;
}

.template4-portfolio-root.template4-dark-mode .template4-education-duration {
    color: #718096;
}

.template4-portfolio-root.template4-dark-mode .template4-education-description {
    color: #a0aec0;
}

.template4-portfolio-root.template4-dark-mode .template4-contact-heading {
    color: #e2e8f0;
}

.template4-portfolio-root.template4-dark-mode .template4-contact-description {
    color: #a0aec0;
}

.template4-portfolio-root.template4-dark-mode .template4-contact-link {
    color: #a0aec0;
}

.template4-portfolio-root.template4-dark-mode .template4-contact-link:hover {
    color: #e2e8f0;
}

.template4-portfolio-root.template4-dark-mode .template4-empty-state {
    color: #718096;
}

.template4-portfolio-root.template4-dark-mode .template4-image-frame {
    border-color: #4a5568;
}



.template4-portfolio-root.template4-dark-mode .template4-mobile-menu {
    color: #a0aec0;
}

.template4-portfolio-root.template4-dark-mode .template4-nav-links {
    background-color: rgba(26, 32, 44, 0.95);
    border-bottom: 1px solid #2d3748;
}

/* Header */
.template4-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background-color: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border-bottom: 1px solid #e2e8f0;
    transition: all 0.3s ease;
}

.template4-header-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
}

.template4-logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: #2d3748;
    font-family: 'Fira Code', monospace;
}

.template4-logo-bracket {
    color: #4a5568;
    font-weight: 400;
}

.template4-nav-links {
    display: flex;
    transition: all 0.3s ease;
}

.template4-nav-links ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 2rem;
}

.template4-nav-links a {
    color: #4a5568;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.9rem;
    padding: 0.5rem 0;
    position: relative;
    transition: color 0.3s ease;
}

.template4-nav-links a:hover,
.template4-nav-links a.template4-active {
    color: #2d3748;
}

.template4-nav-links a::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #4a5568;
    transition: width 0.3s ease;
}

.template4-nav-links a:hover::after,
.template4-nav-links a.template4-active::after {
    width: 100%;
}

.template4-header-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.template4-theme-toggle {
    background: none;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    padding: 0.5rem;
    cursor: pointer;
    color: #4a5568;
    font-size: 1rem;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
}

.template4-theme-toggle:hover {
    border-color: #cbd5e0;
    background-color: #f7fafc;
}

.template4-mobile-menu {
    display: none;
    background: none;
    border: none;
    color: #4a5568;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0.5rem;
}

/* Main Content */
.template4-main {
    padding-top: 80px;
}

/* Hero Section */
.template4-hero-section {
    min-height: 90vh;
    display: flex;
    align-items: center;
    padding: 4rem 2rem;
    background-color: #ffffff;
    position: relative;
}

.template4-hero-content {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    width: 100%;
}

.template4-hero-left {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.template4-hero-title {
    font-size: 3rem;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 1rem;
    line-height: 1.2;
}

.template4-name-highlight {
    color: #4a5568;
    position: relative;
}

.template4-name-highlight::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: #e2e8f0;
    z-index: -1;
}

.template4-hero-subtitle {
    font-size: 1.5rem;
    color: #718096;
    margin-bottom: 1.5rem;
    font-weight: 400;
}

.template4-hero-bio {
    font-size: 1.1rem;
    color: #4a5568;
    margin-bottom: 2rem;
    line-height: 1.7;
    max-width: 500px;
}

.template4-hero-right {
    display: flex;
    justify-content: center;
    align-items: center;
}

.template4-image-container {
    position: relative;
    display: inline-block;
}

.template4-profile-image {
    width: 350px;
    height: 350px;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.template4-image-frame {
    position: absolute;
    top: 20px;
    left: 20px;
    width: 100%;
    height: 100%;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    z-index: -1;
    transition: all 0.3s ease;
}

.template4-image-container:hover .template4-profile-image {
    transform: translate(-10px, -10px);
}

.template4-image-container:hover .template4-image-frame {
    transform: translate(10px, 10px);
}

/* Content Container */
.template4-content-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
}

/* Section Styles */
.template4-section {
    padding: 5rem 0;
    border-bottom: 1px solid #e2e8f0;
}

.template4-section:last-child {
    border-bottom: none;
}

.template4-section-header {
    text-align: center;
    margin-bottom: 3rem;
}

.template4-section-title {
    font-size: 2.5rem;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 1rem;
}

.template4-section-line {
    width: 60px;
    height: 3px;
    background-color: #4a5568;
    margin: 0 auto;
}

/* About Section */
.template4-about-content {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
}

.template4-about-text {
    font-size: 1.2rem;
    color: #4a5568;
    line-height: 1.8;
}

/* Skills Section */
.template4-skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
}

.template4-skill-card {
    background-color: #ffffff;
    padding: 1.5rem;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    border: 1px solid #e2e8f0;
    transition: all 0.3s ease;
}

.template4-skill-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.template4-skill-name {
    font-size: 1rem;
    font-weight: 500;
    color: #2d3748;
}

/* Experience Section */
.template4-timeline {
    position: relative;
    padding: 2rem 0;
}

.template4-timeline::before {
    content: '';
    position: absolute;
    left: 30px;
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: #e2e8f0;
}

.template4-timeline-item {
    position: relative;
    padding-left: 80px;
    margin-bottom: 3rem;
}

.template4-timeline-marker {
    position: absolute;
    left: 21px;
    top: 0;
    width: 18px;
    height: 18px;
    background-color: #4a5568;
    border-radius: 50%;
    border: 4px solid #ffffff;
    box-shadow: 0 0 0 2px #e2e8f0;
}

.template4-timeline-content {
    background-color: #ffffff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    border: 1px solid #e2e8f0;
}

.template4-experience-title {
    font-size: 1.3rem;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 0.5rem;
}

.template4-experience-company {
    font-size: 1.1rem;
    color: #4a5568;
    font-weight: 500;
    margin-bottom: 0.5rem;
}

.template4-experience-duration {
    font-size: 0.9rem;
    color: #718096;
    margin-bottom: 1rem;
}

.template4-experience-description {
    font-size: 1rem;
    color: #4a5568;
    line-height: 1.6;
}

/* Projects Section */
.template4-projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

.template4-project-card {
    background-color: #ffffff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    border: 1px solid #e2e8f0;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.template4-project-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
}

.template4-project-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
}

.template4-project-title {
    font-size: 1.3rem;
    font-weight: 600;
    color: #2d3748;
    margin: 0;
}

.template4-project-number {
    font-size: 0.9rem;
    color: #718096;
    font-weight: 500;
    font-family: 'Fira Code', monospace;
}

.template4-project-tech {
    font-size: 0.9rem;
    color: #4a5568;
    margin-bottom: 1rem;
    font-family: 'Fira Code', monospace;
}

.template4-project-description {
    font-size: 1rem;
    color: #4a5568;
    line-height: 1.6;
    margin-bottom: 1.5rem;
}

.template4-project-link {
    display: inline-flex;
    align-items: center;
    color: #2d3748;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
}

.template4-project-link:hover {
    color: #718096;
}

/* Education Section */
.template4-education-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

.template4-education-card {
    background-color: #ffffff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    border: 1px solid #e2e8f0;
    transition: all 0.3s ease;
}

.template4-education-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.template4-education-degree {
    font-size: 1.3rem;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 0.5rem;
}

.template4-education-institution {
    font-size: 1.1rem;
    color: #4a5568;
    font-weight: 500;
    margin-bottom: 0.5rem;
}

.template4-education-duration {
    font-size: 0.9rem;
    color: #718096;
    margin-bottom: 1rem;
}

.template4-education-description {
    font-size: 1rem;
    color: #4a5568;
    line-height: 1.6;
}

/* Contact Section */
.template4-contact-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    max-width: 1000px;
    margin: 0 auto;
}

.template4-contact-text {
    text-align: left;
}

.template4-contact-heading {
    font-size: 2rem;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 1rem;
}

.template4-contact-description {
    font-size: 1.1rem;
    color: #4a5568;
    line-height: 1.7;
}

.template4-contact-links {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.template4-contact-link {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: #4a5568;
    text-decoration: none;
    font-size: 1.1rem;
    font-weight: 500;
    transition: color 0.3s ease;
}

.template4-contact-link:hover {
    color: #2d3748;
}

.template4-contact-link i {
    font-size: 1.2rem;
    width: 20px;
    text-align: center;
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

/* Dark Mode Footer Styles */
.template4-portfolio-root.template4-dark-mode .footer {
    background: rgba(15, 23, 42, 0.85);
    border-top: 1px solid rgba(148, 163, 184, 0.2);
    color: #e2e8f0;
    transition: background-color 0.8s ease, color 0.8s ease, background-image 0.8s ease;
}

.template4-portfolio-root.template4-dark-mode .footerLinks a {
    color: #cbd5e1;
    transition: background-color 0.8s ease, color 0.8s ease, background-image 0.8s ease;
}

.template4-portfolio-root.template4-dark-mode .footerLinks a:hover {
    color: #60a5fa;
    transform: scale(1.15);
    transition: background-color 0.8s ease, color 0.8s ease, background-image 0.8s ease;
}

.template4-portfolio-root.template4-dark-mode .footerNote {
    color: #94a3b8;
}

.template4-portfolio-root.template4-dark-mode .aboutLink {
    color: #60a5fa;
    background-color: transparent;
}

.template4-portfolio-root.template4-dark-mode .aboutLink:hover {
    color: #3b82f6;
    background-color: rgba(96, 165, 250, 0.15);
    transform: translateY(-1px);
}

.template4-portfolio-root.template4-dark-mode .footer::before {
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

/* Responsive Footer Styles */
@media(max-width: 854px) {
    .footer {
        margin-top: 1rem;
    }
}

@media(max-width: 768px) {
    .footer {
        margin-top: 0.5rem;
    }
}

@media (max-width: 480px) {
    .footer {
        margin-top: 0rem;
    }
}
/* Empty State */
.template4-empty-state {
    text-align: center;
    color: #718096;
    font-style: italic;
    font-size: 1.1rem;
    padding: 2rem;
}

/* Responsive Design */
@media (max-width: 768px) {
    .template4-header-content {
        padding: 0 1rem;
    }

    .template4-nav-links {
        position: fixed;
        top: 80px;
        left: 0;
        right: 0;
        background-color: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        border-bottom: 1px solid #e2e8f0;
        transform: translateY(-100%);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }

    .template4-nav-links.template4-nav-active {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
    }

    .template4-nav-links ul {
        flex-direction: column;
        padding: 2rem 1rem;
        gap: 1rem;
    }

    .template4-mobile-menu {
        display: block;
    }

    .template4-hero-content {
        grid-template-columns: 1fr;
        gap: 2rem;
        text-align: center;
    }
        .template4-hero-right {
            order: -1; 
        }

    .template4-hero-title {
        font-size: 2.5rem;
    }

    .template4-hero-subtitle {
        font-size: 1.3rem;
    }

    .template4-profile-image {
        width: 280px;
        height: 280px;
    }

    .template4-section {
        padding: 3rem 0;
    }

    .template4-section-title {
        font-size: 2rem;
    }

    .template4-content-container {
        padding: 0 1rem;
    }

    .template4-timeline-item {
        padding-left: 60px;
    }

    .template4-timeline::before {
        left: 20px;
    }

    .template4-timeline-marker {
        left: 11px;
    }

    .template4-skills-grid {
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1rem;
    }

    .template4-projects-grid {
        grid-template-columns: 1fr;
    }

    .template4-education-grid {
        grid-template-columns: 1fr;
    }

    .template4-contact-content {
        grid-template-columns: 1fr;
        gap: 2rem;
        text-align: center;
    }

    .template4-contact-text {
        text-align: center;
    }

    .template4-contact-heading {
        font-size: 1.8rem;
    }
}

@media (max-width: 480px) {
    .template4-hero-title {
        font-size: 2rem;
    }

    .template4-hero-subtitle {
        font-size: 1.2rem;
    }

    .template4-profile-image {
        width: 240px;
        height: 240px;
    }

    .template4-section-title {
        font-size: 1.8rem;
    }

    .template4-skill-card {
        padding: 1rem;
    }

    .template4-timeline-content {
        padding: 1.5rem;
    }

    .template4-project-card {
        padding: 1.5rem;
    }

    .template4-education-card {
        padding: 1.5rem;
    }
}

/* Loading Styles */
.template4-loading-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    text-align: center;
}

.template4-loading-spinner {
    width: 50px;
    height: 50px;
    border: 3px solid #e2e8f0;
    border-top: 3px solid #4a5568;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 2rem;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Animations */
.template4-hero-section {
    animation: fadeInUp 0.8s ease-out;
}

.template4-section {
    animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Smooth scrolling */
html {
    scroll-behavior: smooth;
}
    `;
}
const generateJS = () => {
  return `document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.getElementById('navLinks');
    const body = document.querySelector('.template4-portfolio-root');
    const themeIcon = themeToggle.querySelector('i');

    // Theme preference
    const savedTheme = localStorage.getItem('darkMode') === 'true';
    
    if (savedTheme) {
        body.classList.add('template4-dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('template4-dark-mode');
        const isDarkMode = body.classList.contains('template4-dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        if(isDarkMode) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    });

    // Mobile navigation
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('template4-nav-active');
    });

    // Smooth scrolling and active section highlighting
    const sections = document.querySelectorAll('.template4-section');
    const navLinksA = document.querySelectorAll('.nav-link');

    const handleScroll = () => {
        const scrollPosition = window.scrollY + 100;
        let currentSectionId = 'about';

        sections.forEach(section => {
            const offsetTop = section.offsetTop;
            const offsetBottom = offsetTop + section.offsetHeight;
            if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
                currentSectionId = section.id;
            }
        });
        
        navLinksA.forEach(link => {
            link.classList.remove('template4-active');
            if (link.getAttribute('href').substring(1) === currentSectionId) {
                link.classList.add('template4-active');
            }
        });
    };

    window.addEventListener('scroll', handleScroll);

    navLinksA.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.classList.remove('template4-nav-active'); // Close mobile nav on click
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Image hover effect for touch devices
    const imageContainer = document.querySelector('.template4-image-container');
    imageContainer.addEventListener('touchstart', function() {
        this.classList.toggle('hover');
    });
});
`;
}
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
      const imageName = `profile.${extension}`;
      
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