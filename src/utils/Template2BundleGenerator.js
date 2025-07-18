// Template2BundleGenerator.js
import JSZip from 'jszip';
import { saveAs } from 'file-saver';


const generateHTML = (portfolioData) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${portfolioData.name} - Portfolio</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <div class="template2PortfolioRoot" id="portfolioRoot">
        <div class="template2MobileHeader" id="mobileHeader">
            <div class="template2MobileHeaderContent">
                <div class="template2MobileProfile">
                    <img src="${portfolioData.image || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iMzciIHI9IjE1IiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0yMCA3NUMyMCA2NS4wNTg5IDI4LjA1ODkgNTcgMzggNTdIMjJINjJDNzEuOTQxMSA1NyA4MCA2NS4wNTg5IDgwIDc1VjgwSDIwVjc1WiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4='}" alt="Profile" class="template2MobileProfileImage" id="mobileProfileImage">
                    <div class="template2MobileProfileInfo">
                        <h1>${portfolioData.name}</h1>
                        <p>${portfolioData.profession}</p>
                    </div>
                </div>
                <button class="template2HamburgerButton" id="hamburgerButton" aria-label="Toggle navigation menu">
                    <i class="fas fa-bars"></i>
                </button>
            </div>
        </div>
        <div class="template2MobileOverlay" id="mobileOverlay"></div>
        <div class="contentWrapper">
            <aside class="template2Sidebar template2MobileSidebar" id="sidebar">
                <button class="template2MobileCloseButton" id="mobileCloseButton" aria-label="Close menu">
                    <i class="fas fa-times"></i>
                </button>
                <div class="template2SidebarProfile">
                    <img src="${portfolioData.image || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iMzciIHI9IjE1IiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0yMCA3NUMyMCA2NS4wNTg5IDI4LjA1ODkgNTcgMzggNTdIMjJINjJDNzEuOTQxMSA1NyA4MCA2NS4wNTg5IDgwIDc1VjgwSDIwVjc1WiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4='}" alt="Profile" id="sidebarProfileImage">
                    <h2>${portfolioData.name}</h2>
                    <p>${portfolioData.profession}</p>
                </div>
                <div class="template2SidebarActions">
                    <button class="template2DarkModeToggle" id="darkModeToggle" aria-label="Toggle dark mode">
                        <i class="fas fa-sun"></i>
                        <span>Dark Mode</span>
                    </button>
                </div>
                <nav class="template2SidebarNav">
                    <ul>
                        <li><a href="#about" class="nav-link">About</a></li>
                        <li><a href="#skills" class="nav-link">Skills</a></li>
                        <li><a href="#experience" class="nav-link">Experience</a></li>
                        <li><a href="#projects" class="nav-link">Projects</a></li>
                        <li><a href="#education" class="nav-link">Education</a></li>
                        <li><a href="#contact" class="nav-link">Contact</a></li>
                    </ul>
                </nav>
                <div class="template2SocialLinks">
                    ${portfolioData.linkedin ? `<a href="${portfolioData.linkedin}" target="_blank" rel="noopener noreferrer"><i class="fab fa-linkedin"></i></a>` : ''}
                    ${portfolioData.github ? `<a href="${portfolioData.github}" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i></a>` : ''}
                    ${portfolioData.email ? `<a href="mailto:${portfolioData.email}"><i class="fas fa-envelope"></i></a>` : ''}
                </div>
            </aside>
            <main class="template2MainContent">
                <section id="about" class="template2Section">
                    <h2>About Me</h2>
                    <p>${portfolioData.bio}</p>
                </section>
                <section id="skills" class="template2Section">
                    <h2>Skills</h2>
                    ${portfolioData.skills && portfolioData.skills.length ? 
                        `<ul class="template2Skills">
                            ${portfolioData.skills.map(skill => `<li>${skill}</li>`).join('')}
                        </ul>` : 
                        '<p>No skills listed.</p>'
                    }
                </section>
                <section id="experience" class="template2Section">
                    <h2>Experience</h2>
                    ${portfolioData.experience && portfolioData.experience.length ? 
                        portfolioData.experience.map(exp => `
                            <div class="template2ExperienceItem">
                                <h3>${exp.title} at ${exp.company}</h3>
                                <p class="template2Duration">${exp.duration}</p>
                                <p>${exp.description}</p>
                            </div>
                        `).join('') : 
                        '<p>No experience listed.</p>'
                    }
                </section>
                <section id="projects" class="template2Section">
                    <h2>Projects</h2>
                    ${portfolioData.projects && portfolioData.projects.length ? 
                        portfolioData.projects.map(project => `
                            <div class="template2ProjectItem">
                                <h3>${project.title}</h3>
                                ${project.link ? `<a href="${project.link}" target="_blank" rel="noopener noreferrer">View Project</a>` : ''}
                                ${project.techStack ? `<p class="template2TechStack">Tech Stack: ${project.techStack}</p>` : ''}
                                <p>${project.description}</p>
                            </div>
                        `).join('') : 
                        '<p>No projects listed.</p>'
                    }
                </section>
                <section id="education" class="template2Section">
                    <h2>Education</h2>
                    ${portfolioData.education && portfolioData.education.length ? 
                        portfolioData.education.map(ed => `
                            <div class="template2EducationItem">
                                <h3>${ed.degree} at ${ed.institution}</h3>
                                <p class="template2Duration">${ed.duration}</p>
                                <p>${ed.description}</p>
                            </div>
                        `).join('') : 
                        '<p>No education listed.</p>'
                    }
                </section>
                <section id="contact" class="template2Section">
                    <h2>Contact</h2>
                    ${portfolioData.email ? `<p>Email: <span>${portfolioData.email}</span></p>` : ''}
                    ${portfolioData.linkedin ? `<p>LinkedIn: <a href="${portfolioData.linkedin}" target="_blank" rel="noopener noreferrer">Profile</a></p>` : ''}
                    ${portfolioData.github ? `<p>GitHub: <a href="${portfolioData.github}" target="_blank" rel="noopener noreferrer">Repository</a></p>` : ''}
                </section>
            </main>
        </div>
        <footer class="footerWrapper">
            <div class="footer">
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
            </div>
        </footer>
    </div>
    <script src="script.js"></script>
</body>
</html>`;
};

const generateCSS = () => {
  return `.template2PortfolioRoot {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #2d3748;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow-x: hidden;
}
  * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.contentWrapper {
  display: flex;
  flex: 1;
}

.footerWrapper {
  margin-left: 320px;
}

.template2PortfolioRoot::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 103, 132, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(120, 255, 214, 0.3) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

.template2MobileHeader {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1001;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  padding: 1rem;
}

.template2MobileHeaderContent {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
}

.template2MobileProfile {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.template2MobileProfileImage {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid;
  border-image: linear-gradient(135deg, #667eea, #764ba2) 1;
}

.template2MobileProfileInfo h1 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: #1a202c;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.template2MobileProfileInfo p {
  margin: 0;
  font-size: 0.9rem;
  color: #4a5568;
  opacity: 0.8;
}

.template2HamburgerButton {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #667eea;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.template2HamburgerButton:hover {
  background: rgba(102, 126, 234, 0.1);
  transform: scale(1.1);
}

.template2MobileOverlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  backdrop-filter: blur(5px);
}

.template2MobileCloseButton {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #667eea;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  z-index: 10;
}

.template2MobileCloseButton:hover {
  background: rgba(102, 126, 234, 0.1);
  transform: scale(1.1);
}

.template2Sidebar {
  width: 320px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  padding: 2rem 1.5rem;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  border-radius: 0 30px 30px 0;
  /* Default visible position for desktop */
  transform: translateX(0);
}

/* Mobile sidebar styling - hidden by default on mobile */
.template2MobileSidebar {
  /* Only hide on mobile screens */
}

.template2MobileSidebarOpen {
  transform: translateX(0) !important;
}

.template2Sidebar::-webkit-scrollbar {
  width: 6px;
}

.template2Sidebar::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.template2Sidebar::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 10px;
}

.template2SidebarProfile {
  text-align: center;
  margin-bottom: 2.5rem;
  padding-bottom: 2.5rem;
  border-bottom: 2px solid rgba(102, 126, 234, 0.2);
  position: relative;
  margin-top: 2rem;
}

.template2SidebarProfile::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 2px;
}

.template2SidebarProfile img {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid transparent;
  background: linear-gradient(135deg, #667eea, #764ba2);
  padding: 4px;
  margin-bottom: 1.5rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
}

.template2SidebarProfile img:hover {
  transform: scale(1.05);
  box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
}

.template2SidebarProfile h2 {
  font-size: 1.75rem;
  margin: 0 0 0.5rem 0;
  color: #1a202c;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.template2SidebarProfile p {
  color: #4a5568;
  font-size: 1.1rem;
  margin: 0;
  font-weight: 500;
  opacity: 0.8;
}

.template2SidebarNav ul {
  list-style: none;
  padding: 0;
  margin: 0 0 2.5rem 0;
}

.template2SidebarNav li {
  margin-bottom: 0.8rem;
}

.template2SidebarNav a {
  display: block;
  padding: 1rem 1.5rem;
  color: #2d3748;
  text-decoration: none;
  border-radius: 15px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 600;
  position: relative;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.template2SidebarNav a::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: -1;
}

.template2SidebarNav a:hover::before {
  left: 0;
}

.template2SidebarNav a:hover {
  color: white;
  transform: translateX(5px);
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
}

.template2SidebarActions {
  margin-bottom: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.template2DarkModeToggle {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.8rem 1.2rem;
  border-radius: 12px;
  cursor: pointer;
  color: #2d3748;
  font-size: 0.95rem;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 0.8rem;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.template2DarkModeToggle::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: -1;
}

.template2DarkModeToggle:hover::before {
  left: 0;
}

.template2DarkModeToggle:hover {
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(102, 126, 234, 0.4);
}

.template2SocialLinks {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  padding-top: 2rem;
  border-top: 2px solid rgba(102, 126, 234, 0.2);
}

.template2SocialLinks a {
  color: #4a5568;
  font-size: 1.8rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0.8rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
}

.template2SocialLinks a:hover {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
}

.template2MainContent {
  margin-left: 320px;
  padding: 2rem;
  flex: 1;
  min-height: 100vh;
  position: relative;
  z-index: 1;
}

.template2Section {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2.5rem;
  margin-bottom: 2.5rem;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
  
}

.template2Section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 20px 20px 0 0;
}

.template2Section:hover {
  transform: translateY(-5px);
  box-shadow: 0 35px 70px rgba(0, 0, 0, 0.15);
}

.template2Section h2 {
  color: #1a202c;
  font-size: 2.2rem;
  margin-bottom: 2rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  padding-bottom: 1rem;
}

.template2Section h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 4px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 2px;
}

.template2Section p {
  color: #4a5568;
  line-height: 1.7;
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.template2Skills {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.template2Skills li {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  color: #667eea;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-size: 0.95rem;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid rgba(102, 126, 234, 0.2);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.template2Skills li::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: -1;
}

.template2Skills li:hover::before {
  left: 0;
}

.template2Skills li:hover {
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
}

.template2ExperienceItem {
  margin-bottom: 2.5rem;
  padding: 2rem;
  background: rgba(102, 126, 234, 0.05);
  border-radius: 15px;
  border-left: 4px solid;
  border-image: linear-gradient(135deg, #667eea, #764ba2) 1;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.template2ExperienceItem:hover {
  background: rgba(102, 126, 234, 0.1);
  transform: translateX(5px);
}

.template2ExperienceItem:last-child {
  margin-bottom: 0;
}

.template2ExperienceItem h3 {
  color: #1a202c;
  font-size: 1.4rem;
  margin-bottom: 0.8rem;
  font-weight: 700;
}

.template2Duration {
  color: #667eea;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: inline-block;
  background: rgba(102, 126, 234, 0.1);
  padding: 0.4rem 1rem;
  border-radius: 20px;
}

.template2ExperienceItem p {
  color: #4a5568;
  line-height: 1.7;
  margin: 0;
  font-size: 1.05rem;
}

.template2ProjectItem {
  margin-bottom: 2.5rem;
  padding: 2rem;
  background: rgba(118, 75, 162, 0.05);
  border-radius: 15px;
  border-left: 4px solid;
  border-image: linear-gradient(135deg, #764ba2, #667eea) 1;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.template2ProjectItem:hover {
  background: rgba(118, 75, 162, 0.1);
  transform: translateX(5px);
}

.template2ProjectItem:last-child {
  margin-bottom: 0;
}

.template2ProjectItem h3 {
  color: #1a202c;
  font-size: 1.4rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.template2ProjectItem a {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  margin-bottom: 1rem;
  display: inline-block;
  padding: 0.5rem 1rem;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.template2ProjectItem a:hover {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

.template2TechStack {
  color: #38a169;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: inline-block;
  background: rgba(56, 161, 105, 0.1);
  padding: 0.4rem 1rem;
  border-radius: 20px;
}

.template2ProjectItem p {
  color: #4a5568;
  line-height: 1.7;
  margin: 0;
  font-size: 1.05rem;
}

.template2EducationItem {
  margin-bottom: 2.5rem;
  padding: 2rem;
  background: rgba(56, 161, 105, 0.05);
  border-radius: 15px;
  border-left: 4px solid;
  border-image: linear-gradient(135deg, #38a169, #667eea) 1;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.template2EducationItem:hover {
  background: rgba(56, 161, 105, 0.1);
  transform: translateX(5px);
}

.template2EducationItem:last-child {
  margin-bottom: 0;
}

.template2EducationItem h3 {
  color: #1a202c;
  font-size: 1.4rem;
  margin-bottom: 0.8rem;
  font-weight: 700;
}

.template2EducationItem p {
  color: #4a5568;
  line-height: 1.7;
  margin: 0;
  font-size: 1.05rem;
}

.template2Section[id="contact"] span {
  color: #667eea;
  font-weight: 600;
  background: rgba(102, 126, 234, 0.1);
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
}

.template2Section[id="contact"] a {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  padding: 0.3rem 0.8rem;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.template2Section[id="contact"] a:hover {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

/* Dark mode styles */
.template2PortfolioRoot.template2DarkMode {
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
  color: #e2e8f0;
}

.template2DarkMode .template2MobileHeader {
  background: rgba(45, 55, 72, 0.95);
  border-bottom-color: rgba(255, 255, 255, 0.1);
}

.template2DarkMode .template2MobileProfileInfo h1 {
  color: #e2e8f0;
}

.template2DarkMode .template2MobileProfileInfo p {
  color: #a0aec0;
}

.template2DarkMode .template2HamburgerButton,
.template2DarkMode .template2MobileCloseButton {
  color: #667eea;
}

.template2DarkMode .template2Sidebar {
  background: rgba(45, 55, 72, 0.95);
  border-right-color: rgba(255, 255, 255, 0.1);
}

.template2DarkMode .template2SidebarProfile {
  border-bottom-color: rgba(102, 126, 234, 0.3);
}

.template2DarkMode .template2SidebarProfile img {
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.5);
}

.template2DarkMode .template2SidebarProfile h2 {
  color: #e2e8f0;
}

.template2DarkMode .template2SidebarProfile p {
  color: #a0aec0;
}

.template2DarkMode .template2SidebarNav a {
  color: #e2e8f0;
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

.template2DarkMode .template2SidebarNav a:hover {
  color: white;
}

.template2DarkMode .template2DarkModeToggle {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  color: #e2e8f0;
}

.template2DarkMode .template2SocialLinks {
  border-top-color: rgba(102, 126, 234, 0.3);
}

.template2DarkMode .template2SocialLinks a {
  color: #a0aec0;
  background: rgba(255, 255, 255, 0.1);
}

.template2DarkMode .template2SocialLinks a:hover {
  color: white;
}

.template2DarkMode .template2Section {
  background: rgba(45, 55, 72, 0.95);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
}

.template2DarkMode .template2Section h2 {
  color: #e2e8f0;
}

.template2DarkMode .template2Section p {
  color: #a0aec0;
}

.template2DarkMode .template2Skills li {
  background: rgba(102, 126, 234, 0.2);
  border-color: rgba(102, 126, 234, 0.4);
}

.template2DarkMode .template2Skills li:hover {
  color: white;
}

.template2DarkMode .template2ExperienceItem,
.template2DarkMode .template2ProjectItem,
.template2DarkMode .template2EducationItem {
  background: rgba(102, 126, 234, 0.1);
}

.template2DarkMode .template2ExperienceItem:hover,
.template2DarkMode .template2ProjectItem:hover,
.template2DarkMode .template2EducationItem:hover {
  background: rgba(102, 126, 234, 0.2);
}

.template2DarkMode .template2ExperienceItem h3,
.template2DarkMode .template2ProjectItem h3,
.template2DarkMode .template2EducationItem h3 {
  color: #e2e8f0;
}

.template2DarkMode .template2Duration {
  background: rgba(102, 126, 234, 0.2);
}

.template2DarkMode .template2TechStack {
  background: rgba(56, 161, 105, 0.2);
}

.template2DarkMode .template2ProjectItem a {
  background: rgba(102, 126, 234, 0.2);
}

.template2DarkMode .template2Section[id="contact"] span,
.template2DarkMode .template2Section[id="contact"] a {
  background: rgba(102, 126, 234, 0.2);
}

/* Footer styles */
.footer {
  width: auto;
  padding: 1.7rem;
  margin-top: 2rem;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.18);
  text-align: center;
  transition: all 0.8s ease;
  color: #333;
}

.template2DarkMode .footer {
  background: rgba(15, 23, 42, 0.85);
  border-top: 1px solid rgba(148, 163, 184, 0.2);
  color: #e2e8f0;
}

.footer .container {
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

.template2DarkMode .footerLinks a {
  color: #cbd5e1;
}

.footerLinks a:hover {
  color: #007BFF;
  transform: scale(1.1);
}

.template2DarkMode .footerLinks a:hover {
  color: #60a5fa;
  transform: scale(1.15);
}

.footerNote {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #555;
}

.template2DarkMode .footerNote {
  color: #94a3b8;
}

.aboutLink {
  color: #007BFF;
  text-decoration: none;
  font-weight: 500;
}

.template2DarkMode .aboutLink {
  color: #60a5fa;
}

/* ===== TABLET STYLES (768px - 1024px) ===== */
@media (min-width: 768px) and (max-width: 1024px) {
  .template2PortfolioRoot {
    overflow-x: auto;
  }
  
  .template2Sidebar {
    width: 280px;
    padding: 1.5rem 1rem;
  }
  
  .template2MainContent, .footerWrapper {
    margin-left: 280px;
  }
  
  .template2MainContent {
    padding: 1.5rem;
  }
  
  .template2Section {
    padding: 2rem;
    margin-bottom: 2rem;
  }
  
  .template2Section h2 {
    font-size: 1.8rem;
  }
  
  .template2SidebarProfile img {
    width: 120px;
    height: 120px;
  }
  
  .template2SidebarProfile h2 {
    font-size: 1.5rem;
  }
  
  .template2SidebarProfile p {
    font-size: 1rem;
  }
  
  .template2SidebarNav a {
    padding: 0.8rem 1.2rem;
    font-size: 0.95rem;
  }
  
  .template2Skills {
    gap: 0.8rem;
  }
  
  .template2Skills li {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
  
  .template2ExperienceItem,
  .template2ProjectItem,
  .template2EducationItem {
    padding: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .template2ExperienceItem h3,
  .template2ProjectItem h3,
  .template2EducationItem h3 {
    font-size: 1.3rem;
  }
  
  .template2SocialLinks {
    gap: 1.2rem;
  }
  
  .template2SocialLinks a {
    width: 45px;
    height: 45px;
    font-size: 1.6rem;
  }
}

/* ===== MOBILE STYLES (320px - 767px) ===== */
@media (max-width: 767px) {
  .template2PortfolioRoot {
    overflow-x: hidden;
  }
  
  .template2MobileHeader {
    display: block;
    padding: 0.8rem 1rem;
  }
  
  .template2MobileProfileImage {
    width: 45px;
    height: 45px;
  }
  
  .template2MobileProfileInfo h1 {
    font-size: 1.1rem;
  }
  
  .template2MobileProfileInfo p {
    font-size: 0.85rem;
  }
  
  .template2MobileOverlay.open {
    display: block;
  }
  
  .template2Sidebar {
    width: 100%;
    max-width: 300px;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    border-right: none;
    border-radius: 0 25px 25px 0;
    padding: 1.5rem 1rem;
    padding-top: 4rem;
    transform: translateX(-100%);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .template2MobileSidebarOpen {
    transform: translateX(0) !important;
  }
  
  .template2MainContent, .footerWrapper {
    margin-left: 0;
  }
  
  .template2MainContent {
    margin-top: 75px;
    padding: 1rem;
  }
  
  .template2Section {
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    border-radius: 15px;
    margin-left: 0rem;
  }
  
  .template2Section h2 {
    font-size: 1.6rem;
    margin-bottom: 1.5rem;
  }
  
  .template2Section p {
    font-size: 1rem;
    line-height: 1.6;
  }
  
  .template2SidebarProfile {
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    margin-top: 1rem;
  }
  
  .template2SidebarProfile img {
    width: 100px;
    height: 100px;
    margin-bottom: 1rem;
  }
  
  .template2SidebarProfile h2 {
    font-size: 1.4rem;
    margin-bottom: 0.5rem;
  }
  
  .template2SidebarProfile p {
    font-size: 0.95rem;
  }
  
  .template2SidebarNav {
    margin-bottom: 2rem;
  }
  
  .template2SidebarNav li {
    margin-bottom: 0.6rem;
  }
  
  .template2SidebarNav a {
    padding: 0.8rem 1rem;
    font-size: 0.9rem;
    border-radius: 12px;
  }
  
  .template2SidebarActions {
    margin-bottom: 2rem;
  }
  
  .template2DarkModeToggle {
    padding: 0.7rem 1rem;
    font-size: 0.9rem;
  }
  
  .template2SocialLinks {
    gap: 1rem;
    padding-top: 1.5rem;
  }
  
  .template2SocialLinks a {
    width: 40px;
    height: 40px;
    font-size: 1.4rem;
  }
  
  .template2Skills {
    gap: 0.6rem;
  }
  
  .template2Skills li {
    padding: 0.6rem 1rem;
    font-size: 0.85rem;
  }
  
  .template2ExperienceItem,
  .template2ProjectItem,
  .template2EducationItem {
    padding: 1.2rem;
    margin-bottom: 1.5rem;
    border-radius: 12px;
  }
  
  .template2ExperienceItem h3,
  .template2ProjectItem h3,
  .template2EducationItem h3 {
    font-size: 1.2rem;
    margin-bottom: 0.6rem;
  }
  
  .template2Duration {
    font-size: 0.9rem;
    padding: 0.3rem 0.8rem;
  }
  
  .template2TechStack {
    font-size: 0.9rem;
    padding: 0.3rem 0.8rem;
  }
  
  .template2ProjectItem a {
    font-size: 0.9rem;
    padding: 0.4rem 0.8rem;
  }
  
  .template2Section[id="contact"] span,
  .template2Section[id="contact"] a {
    font-size: 0.9rem;
    padding: 0.25rem 0.6rem;
  }
  
  .footer {
    padding: 1.5rem 1rem;
    margin-top: 1.5rem;
  }
  
  .footerLinks {
    margin: 0.8rem 0;
  }
  
  .footerLinks a {
    margin: 0 1rem;
    font-size: 1.2rem;
  }
  
  .footerNote {
    font-size: 0.85rem;
  }
}

/* ===== SMALL MOBILE STYLES (320px - 480px) ===== */
@media (max-width: 480px) {
  .template2MobileHeader {
    padding: 0.7rem 0.8rem;
  }
  
  .template2MobileProfileImage {
    width: 40px;
    height: 40px;
  }
  
  .template2MobileProfileInfo h1 {
    font-size: 1rem;
  }
  
  .template2MobileProfileInfo p {
    font-size: 0.8rem;
  }
  
  .template2Sidebar {
    max-width: 280px;
    padding: 1rem 0.8rem;
    padding-top: 3.5rem;
  }
  
  .template2MainContent {
    margin-top: 70px;
    padding: 0.8rem;
  }
  
  .template2Section {
    padding: 1.2rem;
    margin-bottom: 1.2rem;
  }
  
  .template2Section h2 {
    font-size: 1.4rem;
    margin-bottom: 1.2rem;
  }
  
  .template2Section p {
    font-size: 0.95rem;
  }
  
  .template2SidebarProfile img {
    width: 90px;
    height: 90px;
  }
  
  .template2SidebarProfile h2 {
    font-size: 1.3rem;
  }
  
  .template2SidebarProfile p {
    font-size: 0.9rem;
  }
  
  .template2SidebarNav a {
    padding: 0.7rem 0.8rem;
    font-size: 0.85rem;
  }
  
  .template2DarkModeToggle {
    padding: 0.6rem 0.8rem;
    font-size: 0.85rem;
  }
  
  .template2SocialLinks a {
    width: 35px;
    height: 35px;
    font-size: 1.2rem;
  }
  
  .template2Skills li {
    padding: 0.5rem 0.8rem;
    font-size: 0.8rem;
  }
  
  .template2ExperienceItem,
  .template2ProjectItem,
  .template2EducationItem {
    padding: 1rem;
    margin-bottom: 1.2rem;
  }
  
  .template2ExperienceItem h3,
  .template2ProjectItem h3,
  .template2EducationItem h3 {
    font-size: 1.1rem;
  }
  
  .template2Duration {
    font-size: 0.85rem;
    padding: 0.25rem 0.7rem;
  }
  
  .template2TechStack {
    font-size: 0.85rem;
    padding: 0.25rem 0.7rem;
  }
  
  .template2ProjectItem a {
    font-size: 0.85rem;
    padding: 0.35rem 0.7rem;
  }
  
  .template2Section[id="contact"] span,
  .template2Section[id="contact"] a {
    font-size: 0.85rem;
    padding: 0.2rem 0.5rem;
  }
  
  .footer {
    padding: 1.2rem 0.8rem;
  }
  
  .footerLinks a {
    margin: 0 0.8rem;
    font-size: 1.1rem;
  }
  
  .footerNote {
    font-size: 0.8rem;
  }
}

`;
};

const generateJS = () => {
  return `
document.addEventListener('DOMContentLoaded', () => {
    const portfolioRoot = document.getElementById('portfolioRoot');
    const sidebar = document.getElementById('sidebar');
    const hamburgerButton = document.getElementById('hamburgerButton');
    const mobileCloseButton = document.getElementById('mobileCloseButton');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const navLinks = document.querySelectorAll('.nav-link');

    const openSidebar = () => {
        sidebar.classList.add('template2MobileSidebarOpen');
        mobileOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    };

    const closeSidebar = () => {
        sidebar.classList.remove('template2MobileSidebarOpen');
        mobileOverlay.classList.remove('open');
        document.body.style.overflow = 'unset';
    };

    hamburgerButton.addEventListener('click', (e) => {
        e.stopPropagation();
        openSidebar();
    });

    mobileCloseButton.addEventListener('click', closeSidebar);
    mobileOverlay.addEventListener('click', closeSidebar);

    darkModeToggle.addEventListener('click', () => {
        portfolioRoot.classList.toggle('template2DarkMode');
        const isDarkMode = portfolioRoot.classList.contains('template2DarkMode');
        localStorage.setItem('darkMode', isDarkMode);
        const icon = darkModeToggle.querySelector('i');
        const text = darkModeToggle.querySelector('span');
        if (isDarkMode) {
            icon.className = 'fas fa-sun';
            text.textContent = 'Light Mode';
        } else {
            icon.className = 'fas fa-moon';
            text.textContent = 'Dark Mode';
        }
    });

    // Check for saved theme
    if (localStorage.getItem('darkMode') === 'true') {
        portfolioRoot.classList.add('template2DarkMode');
        const icon = darkModeToggle.querySelector('i');
        const text = darkModeToggle.querySelector('span');
        icon.className = 'fas fa-sun';
        text.textContent = 'Light Mode';
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = window.innerWidth <= 768 ? 80 : 20;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
            if (window.innerWidth <= 768) {
                closeSidebar();
            }
        });
    });

    // Handle image errors
    const images = document.querySelectorAll('img');
    const placeholder = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iMzciIHI9IjE1IiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0yMCA3NUMyMCA2NS4wNTg5IDI4LjA1ODkgNTcgMzggNTdIMjJINjJDNzEuOTQxMSA1NyA4MCA2NS4wNTg5IDgwIDc1VjgwSDIwVjc1WiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4=";
    images.forEach(img => {
        img.onerror = () => {
            img.src = placeholder;
        };
        // Check if the src is null or empty and replace
        if (!img.getAttribute('src')) {
            img.src = placeholder;
        }
    });
});`;
};

export const generateStaticBundle = async (portfolioData) => {
  const zip = new JSZip();
  // Create a mutable copy of the portfolio data to avoid altering the original object
  const bundledData = { ...portfolioData };

  // Only attempt to fetch and bundle the image if a URL is provided
  if (portfolioData.image) {
    try {
      const response = await fetch(portfolioData.image);
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }
      
      const imageBlob = await response.blob();
      // Determine the file extension from the blob's MIME type, defaulting to 'png'
      const extension = imageBlob.type.split('/')[1]?.split('+')[0] || 'png';
      const imageName = `profile_image.${extension}`;
      
      // Add the image file to the zip archive
      zip.file(imageName, imageBlob, { binary: true });
      // Update the image path in our bundled data to the local file name
      bundledData.image = imageName;

    } catch (error) {
      console.error("Could not fetch or add profile image to bundle. Using placeholder.", error);
      // If fetching fails, clear the image path so the HTML template uses the default placeholder
      bundledData.image = ''; 
    }
  }

  // Generate the HTML using the (potentially modified) bundled data
  const html = generateHTML(bundledData);
  const css = generateCSS();
  const js = generateJS();

  zip.file("index.html", html);
  zip.file("styles.css", css);
  zip.file("script.js", js);

  // Generate the zip file and trigger the download
  zip.generateAsync({ type: "blob" }).then(function(content) {
    saveAs(content, `${portfolioData.name.replace(/\s+/g, '_')}_Portfolio.zip`);
  });
};