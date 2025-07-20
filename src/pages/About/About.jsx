import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Github, ExternalLink, Users, Code, Zap, Heart } from 'lucide-react';
import styles from './About.module.css';
import PortfolioFooter from '../../components/PortfolioFooter/PortfolioFooter';

const About = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "Is XFolio really free to use?",
      answer: "Yes! XFolio is completely free and open-source. You can use it to build unlimited portfolios without any cost. We believe everyone should have access to professional portfolio creation tools."
    },
    {
      question: "Do I need coding knowledge to use XFolio?",
      answer: "Not at all! XFolio is designed for everyone, regardless of technical background. Simply fill out the form with your details, and we'll generate a beautiful portfolio for you automatically."
    },
    {
      question: "Can I customize the design of my portfolio?",
      answer: "Currently, XFolio offers a professionally designed template with light/dark mode options. We're working on adding more customization options and themes in future updates."
    },
    {
      question: "How do I share my portfolio?",
      answer: "Once you create your portfolio, you'll get a shareable link that you can send to anyone. You can also download the complete HTML/CSS files to host on your own domain."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we take privacy seriously. Your data is processed locally in your browser when possible, and we don't store personal information unnecessarily. Check our privacy policy for detailed information."
    },
    {
      question: "Can I edit my portfolio after creating it?",
      answer: "Yes! You can return to the builder anytime to update your information. The live preview feature lets you see changes in real-time as you edit."
    },
    {
      question: "What file formats can I download?",
      answer: "You can download your portfolio as complete HTML/CSS files, ready to host anywhere. We also provide options to download your resume as a PDF."
    },
    {
      question: "Is XFolio mobile-friendly?",
      answer: "Absolutely! All portfolios created with XFolio are fully responsive and look great on mobile devices, tablets, and desktops."
    }
  ];

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Generate your portfolio in seconds, not hours"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "No Code Required",
      description: "Professional portfolios without technical knowledge"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "For Everyone",
      description: "Perfect for students, developers, designers, and professionals"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Open Source",
      description: "Free forever, built by the community"
    }
  ];

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerFlex}>
            <a href="/" className={styles.logo}>
              <span className={styles.logoIcon}>⚡</span>
              <span className={styles.logoText}>XFolio</span>
            </a>
            <nav className={styles.nav}>
              <a href="/" className={styles.navLink}>Home</a>
              <a href="/builder" className={styles.navLink}>Builder</a>
              <a href="https://github.com/Yagami-light45/XFolio-Porfolio-Builder" target="_blank" rel="noopener noreferrer" className={styles.navLinkGithub}>
                <Github className={styles.githubIcon} />
                <span>GitHub</span>
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={`${styles.heroTitle} ${isAnimated ? styles.fadeIn : styles.hidden}`}>
            About XFolio
          </h1>
          <p className={`${styles.heroSubtitle} ${isAnimated ? styles.fadeIn : styles.hidden} ${styles.fadeInDelay}`}>
            Empowering everyone to build stunning portfolios without the complexity of coding. 
            Our mission is to democratize professional web presence creation.
          </p>
        </div>
      </section>

      {/* Project Overview */}
      <section className={styles.overview}>
        <div className={styles.overviewContent}>
          <div className={styles.overviewGrid}>
            <div className={styles.overviewText}>
              <h2 className={styles.sectionTitle}>What is XFolio?</h2>
              <p className={styles.overviewParagraph}>
                XFolio is an instant portfolio builder that eliminates the technical barriers between you and your professional online presence. 
                Whether you're a student showcasing your projects, a developer displaying your skills, or a professional building your brand, 
                XFolio makes it simple and fast.
              </p>
              <p className={styles.overviewParagraph}>
                Built with modern web technologies and designed with user experience in mind, XFolio generates responsive, 
                professional portfolios that look great on any device. No coding required, no complex setup – just your information 
                and our technology working together.
              </p>
              <div className={styles.overviewButtons}>
                <a href="/builder" className={styles.primaryButton}>
                  Try It Now
                </a>
                <a href="https://github.com/Yagami-light45/XFolio-Porfolio-Builder" target="_blank" rel="noopener noreferrer" className={styles.secondaryButton}>
                  <Github className={styles.buttonIcon} />
                  <span>View Source</span>
                </a>
              </div>
            </div>
            <div className={styles.featuresGrid}>
              {features.map((feature, index) => (
                <div key={index} className={styles.featureCard}>
                  <div className={styles.featureIcon}>
                    {feature.icon}
                  </div>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDescription}>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className={styles.techStack}>
        <div className={styles.techStackContent}>
          <h2 className={styles.techStackTitle}>Built With Modern Technology</h2>
          <div className={styles.techGrid}>
            <div className={styles.techItem}>
              <div className={`${styles.techIcon} ${styles.techIconReact}`}>
                <span className={styles.techIconText}>R</span>
              </div>
              <h3 className={styles.techTitle}>React</h3>
              <p className={styles.techDescription}>Modern UI library for interactive interfaces</p>
            </div>
            <div className={styles.techItem}>
              <div className={`${styles.techIcon} ${styles.techIconJS}`}>
                <span className={styles.techIconText}>JS</span>
              </div>
              <h3 className={styles.techTitle}>JavaScript</h3>
              <p className={styles.techDescription}>Dynamic functionality and interactivity</p>
            </div>
            <div className={styles.techItem}>
              <div className={`${styles.techIcon} ${styles.techIconCSS}`}>
                <span className={styles.techIconText}>CSS</span>
              </div>
              <h3 className={styles.techTitle}>CSS3</h3>
              <p className={styles.techDescription}>Beautiful styling and animations</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <div className={styles.faqContent}>
          <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
          <div className={styles.faqList}>
            {faqs.map((faq, index) => (
              <div key={index} className={styles.faqItem}>
                <button
                  onClick={() => toggleFAQ(index)}
                  className={styles.faqQuestion}
                >
                  <span className={styles.faqQuestionText}>{faq.question}</span>
                  {openFAQ === index ? (
                    <ChevronUp className={styles.faqIcon} />
                  ) : (
                    <ChevronDown className={styles.faqIcon} />
                  )}
                </button>
                {openFAQ === index && (
                  <div className={styles.faqAnswer}>
                    <p className={styles.faqAnswerText}>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={styles.teamSection}>
        <div className={styles.teamContent}>
          <h2 className={styles.teamTitle}>Built by Team XFolio</h2>
          <p className={styles.teamDescription}>
            XFolio is developed by a passionate team of developers who believe in making web development accessible to everyone. 
            We're committed to continuous improvement and adding new features based on community feedback.
          </p>
          <div className={styles.teamLinks}>
            <a href="https://github.com/Yagami-light45/XFolio-Porfolio-Builder" target="_blank" rel="noopener noreferrer" className={styles.teamLink}>
              <Github className={styles.teamLinkIcon} />
              <span>Contribute on GitHub</span>
            </a>
            <a href="https://github.com/Yagami-light45/XFolio-Porfolio-Builder/issues" target="_blank" rel="noopener noreferrer" className={styles.teamLink}>
              <ExternalLink className={styles.teamLinkIcon} />
              <span>Report Issues</span>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Ready to Build Your Portfolio?</h2>
          <p className={styles.ctaDescription}>
            Join thousands of users who have already created stunning portfolios with XFolio.
          </p>
          <a href="/builder" className={styles.ctaButton}>
            Start Building Now
          </a>
        </div>
      </section>

      {/* Footer */}
      <PortfolioFooter  isDarkMode={true}/>
    </div>
  );
};

export default About;