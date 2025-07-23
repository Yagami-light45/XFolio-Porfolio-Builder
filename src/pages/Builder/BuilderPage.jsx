// BuilderPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./BuilderPage.module.css";
import PortfolioFooter from '../../components/PortfolioFooter/PortfolioFooter';
import { useAlert, AlertContainer } from '../../components/Alerts/Alert';

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className={styles.spinner}>
    <div className={styles.spinnerRing}></div>
  </div>
);

// Loading Modal Component
const LoadingModal = ({ isVisible, progress = 0 }) => (
  isVisible && (
    <div className={styles.loadingModal}>
      <div className={styles.loadingContent}>
        <LoadingSpinner />
        <h3>Creating Your Portfolio...</h3>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill} 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className={styles.loadingText}>
          {progress < 30 && "Processing your information..."}
          {progress >= 30 && progress < 60 && "Validating your data..."}
          {progress >= 60 && progress < 90 && "Generating portfolio structure..."}
          {progress >= 90 && "Almost ready! Finalizing..."}
        </p>
      </div>
    </div>
  )
);

const FormGroup = ({ label, id, value, onChange, type = "text", isTextArea = false, required = false, disabled = false, onKeyDown, ...props }) => (
  <div className={styles.builderPageFormGroup}>
    <label htmlFor={id}>{label}</label>
    {isTextArea ? (
      <textarea
        id={id}
        rows="4"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
        onKeyDown={onKeyDown}
        {...props}
      />
    ) : (
      <input
        type={type}
        id={id}
        value={type !== "file" ? value : undefined}
        onChange={type === "file" ? onChange : (e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
        onKeyDown={onKeyDown}
        {...props}
      />
    )}
  </div>
);

// Component for skill input .
const SkillInput = ({ skill, index, updateSkill, removeSkill, disabled, onKeyDown }) => (
  <div className={`${styles.builderPageSkillItem} ${styles.builderPageFormGroup}`}>
    <input
      type="text"
      className={styles.builderPageSkillInput}
      placeholder="e.g. HTML"
      value={skill.value}
      onChange={(e) => updateSkill(index, e.target.value)}
      maxLength="50"
      disabled={disabled}
      onKeyDown={onKeyDown}
    />
    <button 
      type="button" 
      className={styles.builderPageRemoveSkillBtn} 
      onClick={() => removeSkill(index)}
      disabled={disabled}
    >
      Remove
    </button>
  </div>
);

// Component for experience input.
const ExperienceInput = ({ exp, index, updateExperience, removeExperience, disabled, onKeyDown }) => (
  <div className={`${styles.builderPageExperienceItem} ${styles.builderPageFormGroup}`}>
    <input
      type="text"
      className={styles.builderPageExperienceTitle}
      placeholder="Job Title"
      value={exp.title}
      onChange={(e) => updateExperience(index, 'title', e.target.value)}
      maxLength="100"
      disabled={disabled}
      onKeyDown={onKeyDown}
    />
    <input
      type="text"
      className={styles.builderPageExperienceCompany}
      placeholder="Company"
      value={exp.company}
      onChange={(e) => updateExperience(index, 'company', e.target.value)}
      maxLength="100"
      disabled={disabled}
      onKeyDown={onKeyDown}
    />
    <input
      type="text"
      className={styles.builderPageExperienceDuration}
      placeholder="e.g., Jan 2020 - Dec 2022"
      value={exp.duration}
      onChange={(e) => updateExperience(index, 'duration', e.target.value)}
      maxLength="50"
      disabled={disabled}
      onKeyDown={onKeyDown}
    />
    <textarea
      className={styles.builderPageExperienceDescription}
      rows="3"
      placeholder="Responsibilities and achievements..."
      value={exp.description}
      onChange={(e) => updateExperience(index, 'description', e.target.value)}
      maxLength="500"
      disabled={disabled}
      onKeyDown={onKeyDown}
    />
    <button 
      type="button" 
      className={styles.builderPageRemoveExperienceBtn} 
      onClick={() => removeExperience(index)}
      disabled={disabled}
    >
      Remove
    </button>
  </div>
);

// project input 
const ProjectInput = ({ proj, index, updateProject, removeProject, disabled, onKeyDown }) => (
  <div className={`${styles.builderPageProjectItem} ${styles.builderPageFormGroup}`}>
    <input
      type="text"
      className={styles.builderPageProjectTitle}
      placeholder="Project Title"
      value={proj.title}
      onChange={(e) => updateProject(index, 'title', e.target.value)}
      maxLength="100"
      disabled={disabled}
      onKeyDown={onKeyDown}
    />
    <input
      type="url"
      className={styles.builderPageProjectLink}
      placeholder="Project URL  Include https://"
      value={proj.link}
      onChange={(e) => updateProject(index, 'link', e.target.value)}
      disabled={disabled}
      onKeyDown={onKeyDown}
    />
    <input
      type="text"
      className={styles.builderPageProjectTechStack}
      placeholder="Tech Stack (e.g., React, Node.js)"
      value={proj.techStack}
      onChange={(e) => updateProject(index, 'techStack', e.target.value)}
      maxLength="200"
      disabled={disabled}
      onKeyDown={onKeyDown}
    />
    <textarea
      className={styles.builderPageProjectDescription}
      rows="3"
      placeholder="Brief description of the project..."
      value={proj.description}
      onChange={(e) => updateProject(index, 'description', e.target.value)}
      maxLength="500"
      disabled={disabled}
      onKeyDown={onKeyDown}
    />
    <button 
      type="button" 
      className={styles.builderPageRemoveProjectBtn} 
      onClick={() => removeProject(index)}
      disabled={disabled}
    >
      Remove
    </button>
  </div>
);

// education input 
const EducationInput = ({ edu, index, updateEducation, removeEducation, disabled, onKeyDown }) => (
  <div className={`${styles.builderPageEducationItem} ${styles.builderPageFormGroup}`}>
    <input
      type="text"
      className={styles.builderPageEducationInstitution}
      placeholder="Institution Name"
      value={edu.institution}
      onChange={(e) => updateEducation(index, 'institution', e.target.value)}
      maxLength="100"
      disabled={disabled}
      onKeyDown={onKeyDown}
    />
    <input
      type="text"
      className={styles.builderPageEducationDegree}
      placeholder="Degree (e.g. B.Sc Computer Science)"
      value={edu.degree}
      onChange={(e) => updateEducation(index, 'degree', e.target.value)}
      maxLength="100"
      disabled={disabled}
      onKeyDown={onKeyDown}
    />
    <input
      type="text"
      className={styles.builderPageEducationDuration}
      placeholder="e.g., 2018 – 2022"
      value={edu.duration}
      onChange={(e) => updateEducation(index, 'duration', e.target.value)}
      maxLength="50"
      disabled={disabled}
      onKeyDown={onKeyDown}
    />
    <textarea
      className={styles.builderPageEducationDescription}
      rows="2"
      placeholder="Notes, GPA, honors..."
      value={edu.description}
      onChange={(e) => updateEducation(index, 'description', e.target.value)}
      maxLength="300"
      disabled={disabled}
      onKeyDown={onKeyDown}
    />
    <button 
      type="button" 
      className={styles.builderPageRemoveEducationBtn} 
      onClick={() => removeEducation(index)}
      disabled={disabled}
    >
      Remove
    </button>
  </div>
);

const PreviewSkills = ({ skills }) => (
  <div className={styles.builderPagePreviewSectionContent}>
    <h4>Skills</h4>
    <ul>
      {skills.some(skill => skill.value.trim()) ? (
        skills.map((skill, index) => skill.value.trim() && <li key={index}>{skill.value}</li>)
      ) : (
        <li style={{ color: '#888' }}>No skills added yet</li>
      )}
    </ul>
  </div>
);

const PreviewExperiences = ({ experiences }) => (
  <div className={styles.builderPagePreviewSectionContent}>
    <h4>Experience</h4>
    <div>
      {experiences.some(exp => exp.title || exp.company || exp.duration || exp.description) ? (
        experiences.map((exp, index) => (
          (exp.title || exp.company || exp.duration || exp.description) && (
            <div key={index} className={styles.builderPagePreviewExperienceItem}>
              <h5>{exp.title || "Untitled Position"}{exp.company && ` at ${exp.company}`}</h5>
              <p className={styles.builderPageDuration}>{exp.duration || "Duration not specified"}</p>
              <p>{exp.description || "No description provided."}</p>
            </div>
          )
        ))
      ) : (
        <div className={styles.builderPagePreviewExperienceItem}>
          <h5>No experience added yet</h5>
          <p className={styles.builderPageDuration}>Add your work experience above</p>
          <p>Your professional experience will appear here.</p>
        </div>
      )}
    </div>
  </div>
);

const PreviewProjects = ({ projects, isValidURL }) => (
  <div className={styles.builderPagePreviewSectionContent}>
    <h4>Projects</h4>
    <div>
      {projects.some(proj => proj.title || proj.link || proj.techStack || proj.description) ? (
        projects.map((proj, index) => (
          (proj.title || proj.link || proj.techStack || proj.description) && (
            <div key={index} className={styles.builderPagePreviewProjectItem}>
              <h5>{proj.title || "Untitled Project"}</h5>
              {proj.link && (
                isValidURL(proj.link) ? (
                  <a href={proj.link} target="_blank" rel="noopener noreferrer">View Project</a>
                ) : (
                  <span style={{ color: '#ff6b6b' }}>Invalid URL: {proj.link}</span>
                )
              )}
              {proj.techStack && <p className={styles.builderPageTechStack}>Tech Stack: {proj.techStack}</p>}
              <p>{proj.description || "No description provided."}</p>
            </div>
          )
        ))
      ) : (
        <div className={styles.builderPagePreviewProjectItem}>
          <h5>No projects added yet</h5>
          <p className={styles.builderPageTechStack}>Add your projects above</p>
          <p>Your projects will appear here.</p>
        </div>
      )}
    </div>
  </div>
);

const PreviewEducation = ({ education }) => (
  <div className={styles.builderPagePreviewSectionContent}>
    <h4>Education</h4>
    <div>
      {education.some(edu => edu.institution || edu.degree || edu.duration || edu.description) ? (
        education.map((edu, index) => (
          (edu.institution || edu.degree || edu.duration || edu.description) && (
            <div key={index} className={styles.builderPagePreviewEducationItem}>
              <h5>{edu.degree || "Degree"}{edu.institution && ` at ${edu.institution}`}</h5>
              <p className={styles.builderPageDuration}>{edu.duration || "Duration not specified"}</p>
              <p>{edu.description || "No additional details."}</p>
            </div>
          )
        ))
      ) : (
        <div className={styles.builderPagePreviewEducationItem}>
          <h5>No education added yet</h5>
          <p className={styles.builderPageDuration}>Add your education details above</p>
          <p>Your educational background will appear here.</p>
        </div>
      )}
    </div>
  </div>
);

// Main component 
const BuilderPage = () => {
  // State for user information, skills, experiences, projects, and education.
  const [formData, setFormData] = useState({
    name: '', profession: '', bio: '', email: '', linkedin: '', github: '', image: null
  });
  const [skills, setSkills] = useState([{ value: '' }]);
  const [experiences, setExperiences] = useState([{ title: '', company: '', duration: '', description: '' }]);
  const [projects, setProjects] = useState([{ title: '', link: '', techStack: '', description: '' }]);
  const [education, setEducation] = useState([{ institution: '', degree: '', duration: '', description: '' }]);
  const [isLightMode, setIsLightMode] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const navigate = useNavigate();
  const { alerts, hideAlert, success, error, warning, info } = useAlert();

  useEffect(() => {
    const savedTheme = localStorage.getItem('lightMode') === 'true';
    setIsLightMode(savedTheme);
  }, []);

  const simulateProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        const increment = Math.random() * 15 + 5;
        return Math.min(prev + increment, 95);
      });
    }, 300);
    return interval;
  };

  // sanitize input by removing < and > characters.
  const sanitizeInput = (input) => input ? input.trim().replace(/[<>]/g, '') : '';
  const isValidURL = (string) => {
    if (!string) return false;
    try {
      new URL(string);
      return true;
    } catch (error) {
      return false;
    }
  };
  const isValidEmail = (email) => email ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) : false;

  const handleFormChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return error("Invalid File", "Please select a valid image file."), event.target.value = "";
    if (file.size > 3 * 1024 * 1024) return warning("File Too Large", "Please select an image smaller than 3MB."), event.target.value = "";
    const reader = new FileReader();
    reader.onload = (e) => {
      setFormData(prev => ({ ...prev, image: e.target.result }));
      success("Image Uploaded", "Your profile image has been uploaded successfully.");
    };
    reader.onerror = () => error("Upload Failed", "Error reading file. Please try again.");
    reader.readAsDataURL(file);
  };
  
  //ADD ,REMOVE,UPDATE FNS
  const addSkill = () => setSkills(prev => [...prev, { value: '' }]);
  const removeSkill = (index) => skills.length > 1 ? setSkills(prev => prev.filter((_, i) => i !== index)) : info("Minimum Required", "At least one skill field must remain.");
  const updateSkill = (index, value) => setSkills(prev => prev.map((skill, i) => i === index ? { value } : skill));

  const addExperience = () => setExperiences(prev => [...prev, { title: '', company: '', duration: '', description: '' }]);
  const removeExperience = (index) => experiences.length > 1 ? setExperiences(prev => prev.filter((_, i) => i !== index)) : info("Minimum Required", "At least one experience field must remain.");
  const updateExperience = (index, field, value) => setExperiences(prev => prev.map((exp, i) => i === index ? { ...exp, [field]: value } : exp));

  const addProject = () => setProjects(prev => [...prev, { title: '', link: '', techStack: '', description: '' }]);
  const removeProject = (index) => projects.length > 1 ? setProjects(prev => prev.filter((_, i) => i !== index)) : info("Minimum Required", "At least one project field must remain.");
  const updateProject = (index, field, value) => setProjects(prev => prev.map((proj, i) => i === index ? { ...proj, [field]: value } : proj));

  const addEducation = () => setEducation(prev => [...prev, { institution: '', degree: '', duration: '', description: '' }]);
  const removeEducation = (index) => education.length > 1 ? setEducation(prev => prev.filter((_, i) => i !== index)) : info("Minimum Required", "At least one education field must remain.");
  const updateEducation = (index, field, value) => setEducation(prev => prev.map((edu, i) => i === index ? { ...edu, [field]: value } : edu));
  
  //THEME TOGGLE
  const toggleTheme = () => {
    const newMode = !isLightMode;
    setIsLightMode(newMode);
    localStorage.setItem('lightMode', newMode.toString());
  };

  const resetForm = () => {
    if (isSubmitting) return;
    if (!window.confirm("Are you sure you want to reset all data? This action cannot be undone.")) return;
    setFormData({ name: '', profession: '', bio: '', email: '', linkedin: '', github: '', image: null });
    setSkills([{ value: '' }]);
    setExperiences([{ title: '', company: '', duration: '', description: '' }]);
    setProjects([{ title: '', link: '', techStack: '', description: '' }]);
    setEducation([{ institution: '', degree: '', duration: '', description: '' }]);
    success("Form Reset", "All data has been cleared successfully.");
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.tagName === 'TEXTAREA') {
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      const form = e.target.closest('form');
      if (!form) return;

      const focusable = Array.from(form.querySelectorAll('input, textarea, button:not([disabled])'));
      const index = focusable.indexOf(e.target);

      if (index > -1 && (index + 1) < focusable.length) {
        const nextElement = focusable[index + 1];
        nextElement.focus();
      }
    }
  };

  //SUBMIT FN
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; 
    
    if (!formData.name.trim()) return error("Required Field", "Please enter your name to continue.");
    
    setIsSubmitting(true);
    const progressInterval = simulateProgress();
    
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
    
    try {
      const response = await fetch('/api/portfolios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      
      if (response.ok) {
        clearInterval(progressInterval);
        setProgress(100);
        localStorage.setItem('lastGeneratedUsername', data.username);
        
        setTimeout(() => {
          navigate('/select-template', { state: { username: data.username } });
        }, 500);
      } else {
        clearInterval(progressInterval);
        setIsSubmitting(false);
        setProgress(0);
        console.error('Portfolio generation failed:', data.message);
        error("Portfolio Generation Failed", "Error generating portfolio. Please try again.");
      }
    } catch (err) {
      clearInterval(progressInterval);
      setIsSubmitting(false);
      setProgress(0);
      error("Network Error", "Could not connect to the server. Please try again.");
    }
  };

  // JSX structure
  return (
    <div className={`${styles.builderPageWrapper} ${isLightMode ? styles.lightMode : ''}`}>
      <LoadingModal isVisible={isSubmitting} progress={progress} />
      
      <nav className={styles.builderPageNavbar}>
        <div className={styles.builderPageBrand}>⚡XFolio</div>
        <ul className={`${styles.builderPageNavLinks} ${navOpen ? styles.active : ''}`} id="nav-links">
          <li><button onClick={resetForm} disabled={isSubmitting}>♻️ Reset</button></li>
          <li><button onClick={toggleTheme} disabled={isSubmitting}>{isLightMode ? '🌙 Dark Mode' : '☀ Light Mode'}</button></li>
        </ul>
        <div className={styles.builderPageHamburger} onClick={() => setNavOpen(!navOpen)}>☰</div>
      </nav>

      <div className={styles.builderPageContainer}>
        <div className={styles.builderPageInputSection}>
          <h2>Enter Your Details</h2>
          <form onSubmit={handleSubmit}>
            <FormGroup 
              label="Your Name:" 
              id="userName" 
              value={formData.name} 
              onChange={(value) => handleFormChange('name', value)} 
              required 
              placeholder="Enter your Name.." 
              disabled={isSubmitting}
              onKeyDown={handleKeyDown}
            />
            <FormGroup 
              label="Profession/Title:" 
              id="userProfession" 
              value={formData.profession} 
              onChange={(value) => handleFormChange('profession', value)} 
              placeholder="e.g., Web Developer" 
              disabled={isSubmitting}
              onKeyDown={handleKeyDown}
            />
            <FormGroup 
              label="Bio/About Me:" 
              id="userBio" 
              value={formData.bio} 
              onChange={(value) => handleFormChange('bio', value)} 
              isTextArea 
              placeholder="Tell us about yourself..." 
              disabled={isSubmitting}
              onKeyDown={handleKeyDown}
            />
            <FormGroup 
              label="Upload Your Image:" 
              id="userImage" 
              type="file" 
              onChange={handleImageUpload} 
              accept="image/*" 
              disabled={isSubmitting}
              onKeyDown={handleKeyDown}
            />

            <h2>Skills</h2>
            <div id="skillsContainer">
              {skills.map((skill, index) => (
                <SkillInput 
                  key={index} 
                  skill={skill} 
                  index={index} 
                  updateSkill={updateSkill} 
                  removeSkill={removeSkill} 
                  disabled={isSubmitting}
                  onKeyDown={handleKeyDown}
                />
              ))}
            </div>
            <button type="button" onClick={addSkill} disabled={isSubmitting}>Add Skill</button>

            <h2>Experience</h2>
            <div id="experienceContainer">
              {experiences.map((exp, index) => (
                <ExperienceInput 
                  key={index} 
                  exp={exp} 
                  index={index} 
                  updateExperience={updateExperience} 
                  removeExperience={removeExperience} 
                  disabled={isSubmitting}
                  onKeyDown={handleKeyDown}
                />
              ))}
            </div>
            <button type="button" onClick={addExperience} disabled={isSubmitting}>Add Experience</button>

            <h2>Projects</h2>
            <div id="projectsContainer">
              {projects.map((proj, index) => (
                <ProjectInput 
                  key={index} 
                  proj={proj} 
                  index={index} 
                  updateProject={updateProject} 
                  removeProject={removeProject} 
                  disabled={isSubmitting}
                  onKeyDown={handleKeyDown}
                />
              ))}
            </div>
            <button type="button" onClick={addProject} disabled={isSubmitting}>Add Project</button>

            <h2>Education</h2>
            <div id="educationContainer">
              {education.map((edu, index) => (
                <EducationInput 
                  key={index} 
                  edu={edu} 
                  index={index} 
                  updateEducation={updateEducation} 
                  removeEducation={removeEducation} 
                  disabled={isSubmitting}
                  onKeyDown={handleKeyDown}
                />
              ))}
            </div>
            <button type="button" onClick={addEducation} disabled={isSubmitting}>Add Education</button>

            <h2>Contact Information</h2>
            <FormGroup 
              label="Email:" 
              id="userEmail" 
              type="email" 
              value={formData.email} 
              onChange={(value) => handleFormChange('email', value)} 
              placeholder="your.email@example.com" 
              disabled={isSubmitting}
              onKeyDown={handleKeyDown}
            />
            <FormGroup 
              label="LinkedIn URL:" 
              id="userLinkedIn" 
              type="url" 
              value={formData.linkedin} 
              onChange={(value) => handleFormChange('linkedin', value)} 
              placeholder="https://linkedin.com/in/yourprofile" 
              disabled={isSubmitting}
              onKeyDown={handleKeyDown}
            />
            <FormGroup 
              label="GitHub URL:" 
              id="userGithub" 
              type="url" 
              value={formData.github} 
              onChange={(value) => handleFormChange('github', value)} 
              placeholder="https://github.com/yourusername" 
              disabled={isSubmitting}
              onKeyDown={handleKeyDown}
            />

            <button 
              type="submit" 
              className={`${styles.builderPageGeneratePortfolioBtn} ${isSubmitting ? styles.disabled : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <LoadingSpinner />
                  Creating Portfolio...
                </>
              ) : (
                <>
                  Generate Portfolio <span role="img" aria-label="rocket">🚀</span>
                </>
              )}
            </button>
          </form>
        </div>

        <div className={styles.builderPagePreviewSection}>
          <h2>Live Preview</h2>
          <div className={styles.builderPagePortfolioCard}>
            <div className={styles.builderPagePreviewHeader}>
              <img src={formData.image || "/placeholder.png"} alt="Profile pic here" className={styles.builderPageProfileImage} />
              <h3>{formData.name || "Your Name"}</h3>
              <p>{formData.profession || "Your Profession"}</p>
            </div>
            <div className={styles.builderPagePreviewSectionContent}>
              <h4>About Me</h4>
              <p id="previewBio">{formData.bio || "A brief description about yourself will appear here."}</p>
            </div>
            <PreviewSkills skills={skills} />
            <PreviewExperiences experiences={experiences} />
            <PreviewProjects projects={projects} isValidURL={isValidURL} />
            <PreviewEducation education={education} />
            <div className={styles.builderPagePreviewSectionContent}>
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
      <PortfolioFooter isDarkMode={!isLightMode} />
      <AlertContainer alerts={alerts} onHideAlert={hideAlert} />
    </div>
  );
};

export default BuilderPage;