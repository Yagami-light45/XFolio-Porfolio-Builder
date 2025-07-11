import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./BuilderPage.module.css";

const BuilderPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    profession: '',
    bio: '',
    email: '',
    linkedin: '',
    github: '',
    image: null
  });

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

  const [isLightMode, setIsLightMode] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem('lightMode') === 'true';
    setIsLightMode(savedTheme);
  }, []);

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

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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

  const toggleTheme = () => {
    const newMode = !isLightMode;
    setIsLightMode(newMode);
    localStorage.setItem('lightMode', newMode.toString());
  };

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
      image: formData.image,
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
    localStorage.setItem('portfolioData', JSON.stringify(userData));
    
    navigate('/portfolio');
  };

  return (
    <div className={`${styles.builderBody} ${isLightMode ? styles.lightMode : ''}`}>
      <div className={styles.container}>
        <nav className={styles.navbar}>
          <div className={styles.brand}>⚡XFolio</div>
          <ul className={`${styles.navLinks} ${navOpen ? styles.active : ''}`} id="nav-links">
            <li><button onClick={resetForm}>♻️ Reset</button></li>
            <li><button onClick={toggleTheme}>
              {isLightMode ? '🌙 Dark Mode' : '☀ Light Mode'}
            </button></li>
          </ul>
          <div className={styles.hamburger} onClick={() => setNavOpen(!navOpen)}>☰</div>
        </nav>

        <div className={styles.inputSection}>
          <h2 id="Enter">Enter Your details</h2>
          <div onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
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

            <div className={styles.formGroup}>
              <label htmlFor="userProfession">Profession/Title:</label>
              <input
                type="text"
                id="userProfession"
                placeholder="e.g., Web Developer"
                value={formData.profession}
                onChange={(e) => handleFormChange('profession', e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="userBio">Bio/About Me:</label>
              <textarea
                id="userBio"
                rows="4"
                placeholder="Tell us about yourself..."
                value={formData.bio}
                onChange={(e) => handleFormChange('bio', e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
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
                <div key={index} className={`${styles.skillItem} ${styles.formGroup}`}>
                  <input
                    type="text"
                    className={styles.skillInput}
                    placeholder="e.g. HTML"
                    value={skill.value}
                    onChange={(e) => updateSkill(index, e.target.value)}
                    maxLength="50"
                  />
                  <button
                    type="button"
                    className={styles.removeSkillBtn}
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
                <div key={index} className={`${styles.experienceItem} ${styles.formGroup}`}>
                  <input
                    type="text"
                    className={styles.experienceTitle}
                    placeholder="Job Title"
                    value={exp.title}
                    onChange={(e) => updateExperience(index, 'title', e.target.value)}
                    maxLength="100"
                  />
                  <input
                    type="text"
                    className={styles.experienceCompany}
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => updateExperience(index, 'company', e.target.value)}
                    maxLength="100"
                  />
                  <input
                    type="text"
                    className={styles.experienceDuration}
                    placeholder="e.g., Jan 2020 - Dec 2022"
                    value={exp.duration}
                    onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                    maxLength="50"
                  />
                  <textarea
                    className={styles.experienceDescription}
                    rows="3"
                    placeholder="Responsibilities and achievements..."
                    value={exp.description}
                    onChange={(e) => updateExperience(index, 'description', e.target.value)}
                    maxLength="500"
                  />
                  <button
                    type="button"
                    className={styles.removeExperienceBtn}
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
                <div key={index} className={`${styles.projectItem} ${styles.formGroup}`}>
                  <input
                    type="text"
                    className={styles.projectTitle}
                    placeholder="Project Title"
                    value={proj.title}
                    onChange={(e) => updateProject(index, 'title', e.target.value)}
                    maxLength="100"
                  />
                  <input
                    type="url"
                    className={styles.projectLink}
                    placeholder="Project URL (optional)"
                    value={proj.link}
                    onChange={(e) => updateProject(index, 'link', e.target.value)}
                  />
                  <input
                    type="text"
                    className={styles.projectTechStack}
                    placeholder="Tech Stack (e.g., React, Node.js)"
                    value={proj.techStack}
                    onChange={(e) => updateProject(index, 'techStack', e.target.value)}
                    maxLength="200"
                  />
                  <textarea
                    className={styles.projectDescription}
                    rows="3"
                    placeholder="Brief description of the project..."
                    value={proj.description}
                    onChange={(e) => updateProject(index, 'description', e.target.value)}
                    maxLength="500"
                  />
                  <button
                    type="button"
                    className={styles.removeProjectBtn}
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
                <div key={index} className={`${styles.educationItem} ${styles.formGroup}`}>
                  <input
                    type="text"
                    className={styles.educationInstitution}
                    placeholder="Institution Name"
                    value={edu.institution}
                    onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                    maxLength="100"
                  />
                  <input
                    type="text"
                    className={styles.educationDegree}
                    placeholder="Degree (e.g. B.Sc Computer Science)"
                    value={edu.degree}
                    onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                    maxLength="100"
                  />
                  <input
                    type="text"
                    className={styles.educationDuration}
                    placeholder="e.g., 2018 – 2022"
                    value={edu.duration}
                    onChange={(e) => updateEducation(index, 'duration', e.target.value)}
                    maxLength="50"
                  />
                  <textarea
                    className={styles.educationDescription}
                    rows="2"
                    placeholder="Notes, GPA, honors..."
                    value={edu.description}
                    onChange={(e) => updateEducation(index, 'description', e.target.value)}
                    maxLength="300"
                  />
                  <button
                    type="button"
                    className={styles.removeEducationBtn}
                    onClick={() => removeEducation(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button type="button" onClick={addEducation}>Add Education</button>

            <h2>Contact Information</h2>
            <div className={styles.formGroup}>
              <label htmlFor="userEmail">Email:</label>
              <input
                type="email"
                id="userEmail"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => handleFormChange('email', e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="userLinkedIn">LinkedIn URL:</label>
              <input
                type="url"
                id="userLinkedIn"
                placeholder="https://linkedin.com/in/yourprofile"
                value={formData.linkedin}
                onChange={(e) => handleFormChange('linkedin', e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="userGithub">GitHub URL:</label>
              <input
                type="url"
                id="userGithub"
                placeholder="https://github.com/yourusername"
                value={formData.github}
                onChange={(e) => handleFormChange('github', e.target.value)}
              />
            </div>
            <button type="submit" onClick={handleSubmit} className={styles.generatePortfolioBtn}>
              Generate Portfolio
              <span role="img" aria-label="rocket">🚀</span>
            </button>
          </div>
        </div>

        <div className={styles.previewSection}>
          <h2>Live Preview</h2>
          <div className={styles.portfolioCard}>
            <div className={styles.previewHeader}>
              <img
                src={formData.image || "/placeholder.png"}
                alt="Profile pic here"
                className={styles.profileImage}
              />
              <h3>{formData.name || "Your Name"}</h3>
              <p>{formData.profession || "Your Profession"}</p>
            </div>

            <div className={styles.previewSectionContent}>
              <h4>About Me</h4>
              <p id="previewBio">
                {formData.bio || "A brief description about yourself will appear here."}
              </p>
            </div>

            <div className={styles.previewSectionContent}>
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

            <div className={styles.previewSectionContent}>
              <h4>Experience</h4>
              <div>
                {experiences.some(exp => exp.title || exp.company || exp.duration || exp.description) ? (
                  experiences.map((exp, index) => {
                    if (exp.title || exp.company || exp.duration || exp.description) {
                      return (
                        <div key={index} className={styles.previewExperienceItem}>
                          <h5>{exp.title || "Untitled Position"}{exp.company &&` at ${exp.company}`}</h5>
                          <p className={styles.duration}>{exp.duration || "Duration not specified"}</p>
                          <p>{exp.description || "No description provided."}</p>
                        </div>
                      );
                    }
                    return null;
                  })
                ) : (
                  <div className={styles.previewExperienceItem}>
                    <h5>No experience added yet</h5>
                    <p className={styles.duration}>Add your work experience above</p>
                    <p>Your professional experience will appear here.</p>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.previewSectionContent}>
              <h4>Projects</h4>
              <div>
                {projects.some(proj => proj.title || proj.link || proj.techStack || proj.description) ? (
                  projects.map((proj, index) => {
                    if (proj.title || proj.link || proj.techStack || proj.description) {
                      return (
                        <div key={index} className={styles.previewProjectItem}>
                          <h5>{proj.title || "Untitled Project"}</h5>
                          {proj.link && (
                            isValidURL(proj.link) ? (
                              <a href={proj.link} target="_blank" rel="noopener noreferrer">View Project</a>
                            ) : (
                              <span style={{ color: '#ff6b6b' }}>Invalid URL: {proj.link}</span>
                            )
                          )}
                          {proj.techStack && <p className={styles.techStack}>Tech Stack: {proj.techStack}</p>}
                          <p>{proj.description || "No description provided."}</p>
                        </div>
                      );
                    }
                    return null;
                  })
                ) : (
                  <div className={styles.previewProjectItem}>
                    <h5>No projects added yet</h5>
                    <p className={styles.techStack}>Add your projects above</p>
                    <p>Your projects will appear here.</p>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.previewSectionContent}>
              <h4>Education</h4>
              <div>
                {education.some(edu => edu.institution || edu.degree || edu.duration || edu.description) ? (
                  education.map((edu, index) => {
                    if (edu.institution || edu.degree || edu.duration || edu.description) {
                      return (
                        <div key={index} className={styles.previewEducationItem}>
                          <h5>{edu.degree || "Degree"}{edu.institution && ` at ${edu.institution}`}</h5>
                          <p className={styles.duration}>{edu.duration || "Duration not specified"}</p>
                          <p>{edu.description || "No additional details."}</p>
                        </div>
                      );
                    }
                    return null;
                  })
                ) : (
                  <div className={styles.previewEducationItem}>
                    <h5>No education added yet</h5>
                    <p className={styles.duration}>Add your education details above</p>
                    <p>Your educational background will appear here.</p>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.previewSectionContent}>
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