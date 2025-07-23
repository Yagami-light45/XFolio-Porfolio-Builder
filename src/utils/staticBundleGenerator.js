import JSZip from 'jszip';

export const generateStaticBundle = (data, isDarkMode = false) => {
  const zip = new JSZip();
    
    
        // Generate complete HTML content
        const htmlContent = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${data.name || 'User Portfolio'}</title>
      <link rel="stylesheet" href="styles/portfolio.css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    </head>
    <body${isDarkMode ? ' class="dark-mode"' : ''}>
      <nav class="glass-navbar">
        <div class="navbar-container">
          <div class="logo">My Portfolio</div>
          <ul class="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#education">Education</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <div class="hamburger">
            <i class="fas fa-bars"></i>
          </div>
        </div>
      </nav>
    
      <div class="container">
        <div class="profile">
          <img src="${data.image || 'images/placeholder.png'}" alt="Profile" />
          <h1>${data.name || 'Your Name'}</h1>
          <p class="subtitle">${data.profession || 'Your Profession'}</p>
        </div>
    
        <section id="about">
          <h2>About Me</h2>
          <p>${data.bio || 'Short bio...'}</p>
        </section>
    
        <section id="skills">
          <h2>Skills</h2>
          ${data.skills && data.skills.length ? `
            <ul class="skills">
              ${data.skills.map(skill => `<li>${skill}</li>`).join('')}
            </ul>
          ` : '<p>No skills listed.</p>'}
        </section>
    
        <section id="experience">
          <h2>Experience</h2>
          ${data.experience && data.experience.length ? `
            <div>
              ${data.experience.map(exp => `
                <div class="experience-item">
                  <h3>${exp.title || ''} at ${exp.company || ''}</h3>
                  <p class="duration">${exp.duration || ''}</p>
                  <p>${exp.description || ''}</p>
                </div>
              `).join('')}
            </div>
          ` : '<p>No experience listed.</p>'}
        </section>
    
        <section id="projects">
          <h2>Projects</h2>
          ${data.projects && data.projects.length ? `
            <div>
              ${data.projects.map(project => `
                <div class="project-item">
                  <h3>${project.title || ''}</h3>
                  <a href="${project.link || '#'}" target="_blank" rel="noopener noreferrer">View Project</a>
                  <p class="tech-stack">Tech Stack: ${project.techStack || ''}</p>
                  <p>${project.description || ''}</p>
                </div>
              `).join('')}
            </div>
          ` : '<p>No projects listed.</p>'}
        </section>
    
        <section id="education">
          <h2>Education</h2>
          ${data.education && data.education.length ? `
            <div>
              ${data.education.map(ed => `
                <div class="education-item">
                  <h3>${ed.degree || ''} at ${ed.institution || ''}</h3>
                  <p class="duration">${ed.duration || ''}</p>
                  <p>${ed.description || ''}</p>
                </div>
              `).join('')}
            </div>
          ` : '<p>No education listed.</p>'}
        </section>
    
        <section id="contact">
          <h2>Contact</h2>
          <p>Email: <span>${data.email || ''}</span></p>
          <p>LinkedIn: <a href="${data.linkedin || '#'}" target="_blank" rel="noopener noreferrer">Profile</a></p>
          <p>GitHub: <a href="${data.github || '#'}" target="_blank" rel="noopener noreferrer">Repository</a></p>
        </section>
      </div>
    
      <<footer class="footer">
        <div class="container">
          <p>Crafted with ❤️ by the <strong>XFolio</strong> Team.</p>
          <div class="footer-links">
            <a href="me240003034@iiti.ac.in" aria-label="Email">
              <i class="fas fa-envelope"></i>
            </a>
            <a href="https://github.com/Yagami-light45" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <i class="fab fa-github"></i>
            </a>
            <a href="https://www.instagram.com/itx_harshith_p" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i class="fab fa-instagram"></i>
            </a>
          </div>
          <p class="footer-note">© 2025 XFolio. All rights reserved.</p>
        </div>
      </footer>
    
      <script src="scripts/portfolio.js"></script>
    </body>
    </html>`;
    
        // Generate complete CSS content (without nav buttons)
        const cssContent = `* {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      margin: 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-image: url('../images/bgblur.png');
      background-color: #f4f4f4;
      background-attachment: fixed;
      background-size: cover;
      background-position: center;
      scroll-behavior: smooth;
      color: #333;
      transition: background-color 0.8s ease, color 0.8s ease, background-image 0.8s ease;
    }
    
    .container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    p {
      overflow-wrap: break-word;
      word-wrap: break-word;
    }
    
    #about, #skills, #experience, #projects, #contact, #education {
      scroll-margin-top: 6rem;
    }
    
    .education-item {
      
      margin-bottom: 1.5rem;
    }
    
    #education h2 {
      padding-top: 1.5rem;
    }
    #contact p{
      margin: 0.7rem 0;
    }
    .education-item h3 {
      margin: 0 0 0.3rem;
      font-size: 1.2rem;
      font-weight: 600;
      color: #0056b3;
    }
    
    .glass-navbar {
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 1000;
      backdrop-filter: blur(7px);
      -webkit-backdrop-filter: blur(8px);
      background-color: rgba(255, 255, 255, 0.4);
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
      padding: 0.8rem 0;
      transition: background-color 0.8s ease, border-color 0.8s ease;
    }
    
    .navbar-container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
    }
    
    .logo {
      font-size: 1.5rem;
      font-weight: bold;
      color: #333;
      transition: color 0.8s ease;
      flex-shrink: 0;
    }
    
    .nav-links {
      list-style: none;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 2rem;
      margin: 0;
      padding: 0;
      flex-grow: 1;
    }
    
    .nav-links li a {
      text-decoration: none;
      color: #333;
      font-weight: 500;
      transition: color 0.3s ease;
    }
    
    .nav-links li a:hover {
      color: #007BFF;
    }
    
    .hamburger {
      display: none;
      background: none;
      border: none;
      font-size: 1.5rem;
      color: #2c3e50;
      cursor: pointer;
      transition: color 0.8s ease;
    }
    
    .profile {
      text-align: center;
      margin-top: 6rem;
      border-radius: 10px;
      margin-bottom : 1.5rem;
    }
    
    .profile img {
      border-radius: 50%;
      width: 150px;
      height: 150px;
      object-fit: cover;
      border: 4px solid #fff;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
      transition: border-color 0.8s ease;
    }
    
    .subtitle {
      color: #555;
      font-size: 1.2rem;
      transition: color 0.8s ease;
    }
    
    section {
      margin-bottom: 2rem;
      padding: 0.75rem 2rem 2rem 2rem;
      background-color: rgba(255, 255, 255, 0.5);
      backdrop-filter: blur(10px);
      border-radius: 15px;
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
      border: 1px solid rgba(255, 255, 255, 0.18);
      transition: background-color 0.8s ease, border-color 0.8s ease;
    }
    
    section h2 {
      border-bottom: 2px solid #007BFF;
      transition: border-color 0.8s ease;
      padding-bottom: 0.5rem;
      margin-bottom: 1rem;
    }
    
    .skills {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      padding: 0;
    }
    
    .skills li {
      list-style: none;
      background: #0070f3;
      color: #fff;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-weight: 500;
      transition: background-color 0.8s ease;
    }
    
    .experience-item, .project-item, .education-item {
      margin-bottom: 1.5rem;
    }
    
    .experience-item h3, .project-item h3, .education-item h3 {
      color: #0056b3;
      transition: color 0.8s ease;
      margin-bottom: 0.5rem;
    }
    
    .duration {
      font-style: italic;
      color: #666;
      margin-bottom: 0.5rem;
      transition: color 0.8s ease;
    }
    
    .project-item a {
      color: #007BFF;
      transition: color 0.8s ease;
      text-decoration: none;
      margin-bottom: 0.5rem;
      display: inline-block;
    }
    
    .project-item a:hover {
      text-decoration: underline;
    }
    
    .tech-stack {
      color: #555;
      transition: color 0.8s ease;
      font-weight: 500;
    }
    
    .footer {
      margin-top: 5rem;
      background: rgba(255, 255, 255, 0.5);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border-top: 1px solid rgba(255, 255, 255, 0.18);
      text-align: center;
      padding: 2rem 0;
      transition: background-color 0.8s ease, border-color 0.8s ease, color 0.8s ease;
    }
    
    .footer-links {
      margin: 0.5rem 0;
    }
    
    .footer-links a {
      margin: 0 1rem;
      font-size: 1.4rem;
      color: #333;
      transition: color 0.3s ease, transform 0.3s ease;
      text-decoration: none;
    }
    
    .footer-links a:hover {
      color: #007BFF;
      transform: scale(1.1);
    }
    
    .footer-note {
      margin-top: 0.5rem;
      font-size: 0.9rem;
      color: #555;
      transition: color 0.8s ease;
    }
    
    /* Dark Mode Styles */
    body.dark-mode {
      background-color: #0f1624;
      background-image: url('../images/bgblur.png');
      color: #ffffff;
    }
    
    body.dark-mode .glass-navbar {
      background-color: rgba(10, 20, 40, 0.6);
      border-color: rgba(255, 255, 255, 0.1);
    }
    
    body.dark-mode .logo,
    body.dark-mode .nav-links li a,
    body.dark-mode .hamburger,
    body.dark-mode .footer-links a {
      color: #ffffffff;
    }
    
    body.dark-mode .nav-links li a:hover,
    body.dark-mode .footer-links a:hover {
      color: #1e90ff;
    }
    
    body.dark-mode .profile img {
      border-color: #333;
    }
    
    body.dark-mode .subtitle {
      color: #cccccc;
    }
    
    body.dark-mode section {
      background-color: rgba(20, 30, 50, 0.5);
      border: 1px solid #2c3e50;
    }
    
    body.dark-mode section h2 {
      border-color: #1e90ff;
    }
    
    body.dark-mode .skills li {
      background: #1e90ff;
    }
    
    body.dark-mode .experience-item h3,
    body.dark-mode .project-item h3,
    body.dark-mode .project-item a,
    body.dark-mode .education-item h3 {
      color: #1e90ff;
    }
    
    body.dark-mode .duration,
    body.dark-mode .tech-stack,
    body.dark-mode .footer-note {
      color: #aaaaaa;
    }
    
    
    .footer {
      margin-top: 5rem;
      background: rgba(255, 255, 255, 0.5);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border-top: 1px solid rgba(255, 255, 255, 0.18);
      text-align: center;
      padding: 2rem 0;
      transition: background-color 0.8s ease, border-color 0.8s ease, color 0.8s ease;
    }
    
    .footer-links {
      margin: 0.5rem 0;
    }
    
    .footer-links a {
      margin: 0 1rem;
      font-size: 1.4rem;
      color: #333;
      transition: color 0.3s ease, transform 0.3s ease;
      text-decoration: none;
    }
    
    .footer-links a:hover {
      color: #007BFF;
      transform: scale(1.1);
    }
    
    .footer-note {
      margin-top: 0.5rem;
      font-size: 0.9rem;
      color: #555;
      transition: color 0.8s ease;
    }
    body.dark-mode .footer-links a {
      color: #ffffff;
    }
    body.dark-mode .footer-links a:hover {
      color: #1e90ff;
    }
    body.dark-mode .footer {
      background: rgba(10, 20, 40, 0.6);
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
    body.dark-mode .footer-note {
      color: #aaaaaa;
    }

    
    /* Responsive Design */
    @media(max-width: 768px) {
      .nav-links {
        display: none;
        flex-direction: column;
        width: 100%;
        background-color: rgba(255, 255, 255, 0.95);
        position: absolute;
        top: 68px;
        left: 0;
        padding: 1rem 0;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        transition: background-color 0.8s ease;
      }
    
      .nav-links.active {
        display: flex;
      }
    
      .nav-links li {
        text-align: center;
        padding: 0.5rem 0;
      }
    
      .hamburger {
        display: block;
      }
    
      body.dark-mode .nav-links {
        background-color: rgba(10, 20, 40, 0.95);
      }
    
      .container {
        padding: 1rem;
      }
    
      section {
        padding: 1rem;
      }
    
      .profile {
        margin-top: 4rem;
      }
    }
    
    @media (max-width: 480px) {
      .profile h1 { 
        font-size: 2rem; 
      }
      
      .subtitle { 
        font-size: 1.1rem; 
      }
      
      .navbar-container {
        padding: 0 1rem;
      }
    }`;
    
        // Generate JavaScript for basic functionality
        const jsContent = `document.addEventListener('DOMContentLoaded', () => {
      const hamburger = document.querySelector('.hamburger');
      const navLinks = document.querySelector('.nav-links');
      const navItems = document.querySelectorAll('.nav-links a');
    
      // Hamburger Menu Logic
      if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
          navLinks.classList.toggle('active');
        });
      }
    
      // Close menu when clicking nav items
      if (navItems && navLinks) {
        navItems.forEach(link => {
          link.addEventListener('click', () => {
            navLinks.classList.remove('active');
          });
        });
      }
    
      // Smooth scrolling for navigation links
      navItems.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = link.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
            const navbarHeight = 80;
            const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - navbarHeight;
    
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        });
      });
    });`;
    
        // Add files to zip
        zip.file('index.html', htmlContent);
        zip.file('styles/portfolio.css', cssContent);
        zip.file('scripts/portfolio.js', jsContent);
    
        // Add profile image if it exists
        if (data.image && data.image.startsWith('data:')) {
          const imgName = data.image.includes('data:image/png') ? 'images/profile.png' : 'images/profile.jpg';
          zip.file(imgName, data.image.split(',')[1], { base64: true });
        } else {
          // Add placeholder image
          zip.file('images/placeholder.png', '');
        }
    
        // Add background image placeholder
        zip.file('images/bgblur.png', '');
    
        // Generate and download zip
        zip.generateAsync({ type: 'blob' }).then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'portfolio-bundle.zip';
          a.click();
          window.URL.revokeObjectURL(url);
        });
      };
    

