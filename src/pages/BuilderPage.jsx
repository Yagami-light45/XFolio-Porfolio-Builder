import React, { useState, useEffect } from 'react';
import '../styles/BuilderPage.css'; 

const BuilderPage = () => {
  // Basic form state
  const [formData, setFormData] = useState({
    name: '',
    profession: '',
    bio: '',
    email: '',
    linkedin: '',
    github: '',
    image: null
  });

  // Dynamic sections state
  const [skills, setSkills] = useState([{ value: '' }]);
  const [experiences, setExperiences] = useState([{
    title: '',
    company: '',
    duration: '',
    description: ''
  }]);
  const [projects, setProjects] = useState([{
    title: '',
    link: '',
    techStack: '',
    description: ''
  }]);
  const [education, setEducation] = useState([{
    institution: '',
    degree: '',
    duration: '',
    description: ''
  }]);

  // Theme state
  const [isLightMode, setIsLightMode] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  // Initialize theme on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('lightMode') === 'true';
    setIsLightMode(savedTheme);
  }, []);

  // Utility functions
  const sanitizeInput = (input) => {
    if (!input) return '';
    return input.trim().replace(/[<>]/g, '');
  };

  const isValidURL = (string) => {
    if (!string) return false;
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const isValidEmail = (email) => {
    if (!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle basic form changes
  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      alert("File size is too large. Please select an image smaller than 3MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setFormData(prev => ({ ...prev, image: e.target.result }));
    };
    reader.onerror = () => {
      alert("Error reading file. Please try again.");
    };
    reader.readAsDataURL(file);
  };

  // Skills handlers
  const addSkill = () => {
    setSkills(prev => [...prev, { value: '' }]);
  };

  const removeSkill = (index) => {
    if (skills.length > 1) {
      setSkills(prev => prev.filter((_, i) => i !== index));
    } else {
      alert("At least one skill field must remain.");
    }
  };

  const updateSkill = (index, value) => {
    setSkills(prev => prev.map((skill, i) => i === index ? { value } : skill));
  };

  // Experience handlers
  const addExperience = () => {
    setExperiences(prev => [...prev, {
      title: '',
      company: '',
      duration: '',
      description: ''
    }]);
  };

  const removeExperience = (index) => {
    if (experiences.length > 1) {
      setExperiences(prev => prev.filter((_, i) => i !== index));
    } else {
      alert("At least one experience field must remain.");
    }
  };

  const updateExperience = (index, field, value) => {
    setExperiences(prev => prev.map((exp, i) => 
      i === index ? { ...exp, [field]: value } : exp
    ));
  };

  // Project handlers
  const addProject = () => {
    setProjects(prev => [...prev, {
      title: '',
      link: '',
      techStack: '',
      description: ''
    }]);
  };

  const removeProject = (index) => {
    if (projects.length > 1) {
      setProjects(prev => prev.filter((_, i) => i !== index));
    } else {
      alert("At least one project field must remain.");
    }
  };

  const updateProject = (index, field, value) => {
    setProjects(prev => prev.map((proj, i) => 
      i === index ? { ...proj, [field]: value } : proj
    ));
  };

  // Education handlers
  const addEducation = () => {
    setEducation(prev => [...prev, {
      institution: '',
      degree: '',
      duration: '',
      description: ''
    }]);
  };

  const removeEducation = (index) => {
    if (education.length > 1) {
      setEducation(prev => prev.filter((_, i) => i !== index));
    } else {
      alert("At least one education field must remain.");
    }
  };

  const updateEducation = (index, field, value) => {
    setEducation(prev => prev.map((edu, i) => 
      i === index ? { ...edu, [field]: value } : edu
    ));
  };

  // Theme toggle
  const toggleTheme = () => {
    const newMode = !isLightMode;
    setIsLightMode(newMode);
    localStorage.setItem('lightMode', newMode.toString());
  };

  // Reset form
  const resetForm = () => {
    if (!window.confirm("Are you sure you want to reset all data? This action cannot be undone.")) {
      return;
    }

    setFormData({
      name: '',
      profession: '',
      bio: '',
      email: '',
      linkedin: '',
      github: '',
      image: null
    });
    setSkills([{ value: '' }]);
    setExperiences([{
      title: '',
      company: '',
      duration: '',
      description: ''
    }]);
    setProjects([{
      title: '',
      link: '',
      techStack: '',
      description: ''
    }]);
    setEducation([{
      institution: '',
      degree: '',
      duration: '',
      description: ''
    }]);
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert("Please enter your name.");
      return;
    }

    const userData = {
      name: sanitizeInput(formData.name),
      profession: sanitizeInput(formData.profession),
      bio: sanitizeInput(formData.bio),
      email: sanitizeInput(formData.email),
      linkedin: sanitizeInput(formData.linkedin),
      github: sanitizeInput(formData.github),
      skills: skills.map(skill => sanitizeInput(skill.value)).filter(skill => skill),
      experience: experiences.map(exp => ({
        title: sanitizeInput(exp.title),
        company: sanitizeInput(exp.company),
        duration: sanitizeInput(exp.duration),
        description: sanitizeInput(exp.description)
      })).filter(exp => exp.title || exp.company || exp.duration || exp.description),
      projects: projects.map(proj => ({
        title: sanitizeInput(proj.title),
        link: sanitizeInput(proj.link),
        techStack: sanitizeInput(proj.techStack),
        description: sanitizeInput(proj.description)
      })).filter(proj => proj.title || proj.link || proj.techStack || proj.description),
      education: education.map(edu => ({
        institution: sanitizeInput(edu.institution),
        degree: sanitizeInput(edu.degree),
        duration: sanitizeInput(edu.duration),
        description: sanitizeInput(edu.description)
      })).filter(edu => edu.institution || edu.degree || edu.duration || edu.description)
    };

    console.log('Portfolio data:', userData);
    // Here you would typically save to localStorage or send to a server
    alert('Portfolio generated successfully! (This is a demo - check console for data)');
  };

  return (
    <div className={`builder-body ${isLightMode ? 'light-mode' : ''}`}>
      <div className="container">
        {/* NAVBAR */}
        <nav className="navbar">
          <div className="brand">⚡XFolio</div>
          <ul className={`nav-links ${navOpen ? 'active' : ''}`} id="nav-links">
            <li><button onClick={resetForm}>♻️ Reset</button></li>
            <li><button onClick={toggleTheme}>
              {isLightMode ? '🌙 Dark Mode' : '☀ Light Mode'}
            </button></li>
          </ul>
          <div className="hamburger" onClick={() => setNavOpen(!navOpen)}>☰</div>
        </nav>

        {/* INPUT SECTION */}
        <div className="input-section">
          <h2 id="Enter">Enter Your details</h2>
          <div onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="userName">Your Name:</label>
              <input
                type="text"
                id="userName"
                placeholder="Enter your Name.."
                value={formData.name}
                onChange={(e) => handleFormChange('name', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="userProfession">Profession/Title:</label>
              <input
                type="text"
                id="userProfession"
                placeholder="e.g., Web Developer"
                value={formData.profession}
                onChange={(e) => handleFormChange('profession', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="userBio">Bio/About Me:</label>
              <textarea
                id="userBio"
                rows="4"
                placeholder="Tell us about yourself..."
                value={formData.bio}
                onChange={(e) => handleFormChange('bio', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="userImage">Upload Your Image:</label>
              <input
                type="file"
                id="userImage"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>

            <h2>Skills</h2>
            <div id="skillsContainer">
              {skills.map((skill, index) => (
                <div key={index} className="skill-item form-group">
                  <input
                    type="text"
                    className="skill-input"
                    placeholder="e.g. HTML"
                    value={skill.value}
                    onChange={(e) => updateSkill(index, e.target.value)}
                    maxLength="50"
                  />
                  <button
                    type="button"
                    className="remove-skill-btn"
                    onClick={() => removeSkill(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button type="button" onClick={addSkill}>Add Skill</button>

            <h2>Experience</h2>
            <div id="experienceContainer">
              {experiences.map((exp, index) => (
                <div key={index} className="experience-item form-group">
                  <input
                    type="text"
                    className="experience-title"
                    placeholder="Job Title"
                    value={exp.title}
                    onChange={(e) => updateExperience(index, 'title', e.target.value)}
                    maxLength="100"
                  />
                  <input
                    type="text"
                    className="experience-company"
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => updateExperience(index, 'company', e.target.value)}
                    maxLength="100"
                  />
                  <input
                    type="text"
                    className="experience-duration"
                    placeholder="e.g., Jan 2020 - Dec 2022"
                    value={exp.duration}
                    onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                    maxLength="50"
                  />
                  <textarea
                    className="experience-description"
                    rows="3"
                    placeholder="Responsibilities and achievements..."
                    value={exp.description}
                    onChange={(e) => updateExperience(index, 'description', e.target.value)}
                    maxLength="500"
                  />
                  <button
                    type="button"
                    className="remove-experience-btn"
                    onClick={() => removeExperience(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button type="button" onClick={addExperience}>Add Experience</button>

            <h2>Projects</h2>
            <div id="projectsContainer">
              {projects.map((proj, index) => (
                <div key={index} className="project-item form-group">
                  <input
                    type="text"
                    className="project-title"
                    placeholder="Project Title"
                    value={proj.title}
                    onChange={(e) => updateProject(index, 'title', e.target.value)}
                    maxLength="100"
                  />
                  <input
                    type="url"
                    className="project-link"
                    placeholder="Project URL (optional)"
                    value={proj.link}
                    onChange={(e) => updateProject(index, 'link', e.target.value)}
                  />
                  <input
                    type="text"
                    className="project-techstack"
                    placeholder="Tech Stack (e.g., React, Node.js)"
                    value={proj.techStack}
                    onChange={(e) => updateProject(index, 'techStack', e.target.value)}
                    maxLength="200"
                  />
                  <textarea
                    className="project-description"
                    rows="3"
                    placeholder="Brief description of the project..."
                    value={proj.description}
                    onChange={(e) => updateProject(index, 'description', e.target.value)}
                    maxLength="500"
                  />
                  <button
                    type="button"
                    className="remove-project-btn"
                    onClick={() => removeProject(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button type="button" onClick={addProject}>Add Project</button>

            <h2>Education</h2>
            <div id="educationContainer">
              {education.map((edu, index) => (
                <div key={index} className="education-item form-group">
                  <input
                    type="text"
                    className="education-institution"
                    placeholder="Institution Name"
                    value={edu.institution}
                    onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                    maxLength="100"
                  />
                  <input
                    type="text"
                    className="education-degree"
                    placeholder="Degree (e.g. B.Sc Computer Science)"
                    value={edu.degree}
                    onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                    maxLength="100"
                  />
                  <input
                    type="text"
                    className="education-duration"
                    placeholder="e.g., 2018 – 2022"
                    value={edu.duration}
                    onChange={(e) => updateEducation(index, 'duration', e.target.value)}
                    maxLength="50"
                  />
                  <textarea
                    className="education-description"
                    rows="2"
                    placeholder="Notes, GPA, honors..."
                    value={edu.description}
                    onChange={(e) => updateEducation(index, 'description', e.target.value)}
                    maxLength="300"
                  />
                  <button
                    type="button"
                    className="remove-education-btn"
                    onClick={() => removeEducation(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button type="button" onClick={addEducation}>Add Education</button>

            <h2>Contact Information</h2>
            <div className="form-group">
              <label htmlFor="userEmail">Email:</label>
              <input
                type="email"
                id="userEmail"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => handleFormChange('email', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="userLinkedIn">LinkedIn URL:</label>
              <input
                type="url"
                id="userLinkedIn"
                placeholder="https://linkedin.com/in/yourprofile"
                value={formData.linkedin}
                onChange={(e) => handleFormChange('linkedin', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="userGithub">GitHub URL:</label>
              <input
                type="url"
                id="userGithub"
                placeholder="https://github.com/yourusername"
                value={formData.github}
                onChange={(e) => handleFormChange('github', e.target.value)}
              />
            </div>
            <button type="submit">Generate Portfolio (Client-Side Preview Only)</button>
          </div>
        </div>

        {/* PREVIEW SECTION */}
        <div className="preview-section">
          <h2>Live Preview</h2>
          <div className="portfolio-card">
            <div className="preview-header">
              <img
                src={formData.image || "/placeholder.png"}
                alt="Profile pic here"
                className="profile-image"
              />
              <h3>{formData.name || "Your Name"}</h3>
              <p>{formData.profession || "Your Profession"}</p>
            </div>

            <div className="preview-section-content">
              <h4>About Me</h4>
              <p id="previewBio">
                {formData.bio || "A brief description about yourself will appear here."}
              </p>
            </div>

            <div className="preview-section-content">
              <h4>Skills</h4>
              <ul>
                {skills.some(skill => skill.value.trim()) ? (
                  skills.map((skill, index) => 
                    skill.value.trim() && (
                      <li key={index}>{skill.value}</li>
                    )
                  )
                ) : (
                  <li style={{ color: '#888' }}>No skills added yet</li>
                )}
              </ul>
            </div>

            <div className="preview-section-content">
              <h4>Experience</h4>
              <div>
                {experiences.some(exp => exp.title || exp.company || exp.duration || exp.description) ? (
                  experiences.map((exp, index) => {
                    if (exp.title || exp.company || exp.duration || exp.description) {
                      return (
                        <div key={index} className="preview-experience-item">
                          <h5>{exp.title || "Untitled Position"}{exp.company && ` at ${exp.company}`}</h5>
                          <p className="duration">{exp.duration || "Duration not specified"}</p>
                          <p>{exp.description || "No description provided."}</p>
                        </div>
                      );
                    }
                    return null;
                  })
                ) : (
                  <div className="preview-experience-item">
                    <h5>No experience added yet</h5>
                    <p className="duration">Add your work experience above</p>
                    <p>Your professional experience will appear here.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="preview-section-content">
              <h4>Projects</h4>
              <div>
                {projects.some(proj => proj.title || proj.link || proj.techStack || proj.description) ? (
                  projects.map((proj, index) => {
                    if (proj.title || proj.link || proj.techStack || proj.description) {
                      return (
                        <div key={index} className="preview-project-item">
                          <h5>{proj.title || "Untitled Project"}</h5>
                          {proj.link && (
                            isValidURL(proj.link) ? (
                              <a href={proj.link} target="_blank" rel="noopener noreferrer">View Project</a>
                            ) : (
                              <span style={{ color: '#ff6b6b' }}>Invalid URL: {proj.link}</span>
                            )
                          )}
                          {proj.techStack && <p className="tech-stack">Tech Stack: {proj.techStack}</p>}
                          <p>{proj.description || "No description provided."}</p>
                        </div>
                      );
                    }
                    return null;
                  })
                ) : (
                  <div className="preview-project-item">
                    <h5>No projects added yet</h5>
                    <p className="tech-stack">Add your projects above</p>
                    <p>Your projects will appear here.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="preview-section-content">
              <h4>Education</h4>
              <div>
                {education.some(edu => edu.institution || edu.degree || edu.duration || edu.description) ? (
                  education.map((edu, index) => {
                    if (edu.institution || edu.degree || edu.duration || edu.description) {
                      return (
                        <div key={index} className="preview-education-item">
                          <h5>{edu.degree || "Degree"}{edu.institution && ` at ${edu.institution}`}</h5>
                          <p className="duration">{edu.duration || "Duration not specified"}</p>
                          <p>{edu.description || "No additional details."}</p>
                        </div>
                      );
                    }
                    return null;
                  })
                ) : (
                  <div className="preview-education-item">
                    <h5>No education added yet</h5>
                    <p className="duration">Add your education details above</p>
                    <p>Your educational background will appear here.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="preview-section-content">
              <h4>Contact</h4>
              <p>Email: <span style={{ color: !formData.email ? '' : !isValidEmail(formData.email) ? '#ff6b6b' : '' }}>
                {formData.email || "your.email@example.com"}
                {formData.email && !isValidEmail(formData.email) && " (Invalid email)"}
              </span></p>
              <p>LinkedIn: <a 
                href={formData.linkedin && isValidURL(formData.linkedin) ? formData.linkedin : "#"} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: formData.linkedin && !isValidURL(formData.linkedin) ? '#ff6b6b' : '' }}
              >
                LinkedIn Profile
                {formData.linkedin && !isValidURL(formData.linkedin) && " (Invalid URL)"}
              </a></p>
              <p>GitHub: <a 
                href={formData.github && isValidURL(formData.github) ? formData.github : "#"} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: formData.github && !isValidURL(formData.github) ? '#ff6b6b' : '' }}
              >
                GitHub Profile
                {formData.github && !isValidURL(formData.github) && " (Invalid URL)"}
              </a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuilderPage;