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
      question: "What exactly is XFolio?",
      answer: "XFolio is a full-stack, open-source application that lets you build a professional portfolio website instantly. It uses a React frontend and a Node.js/MongoDB backend to provide a seamless, no-code experience."
    },
    {
      question: "Is this service completely free?",
      answer: "Yes, 100% free and open-source. There are no hidden costs, premium features, or limits. We believe everyone deserves a great portfolio."
    },
    {
      question: "Do I need to know how to code?",
      answer: "Not at all. The interface is a simple form. You provide the information—like your projects, skills, and experience—and XFolio handles all the code generation for you."
    },
    {
      question: "How can I customize my portfolio's design?",
      answer: "You can choose from multiple professionally designed templates to find a style that fits you. Your content automatically adapts to the selected layout, and you can toggle between light and dark modes."
    },
    {
      question: "How is my data stored and is it secure?",
      answer: "Your portfolio data is securely stored in a MongoDB database associated with your account. This allows you to return anytime to edit your information. We prioritize data privacy and do not share your information."
    },
    {
      question: "What are my options for sharing and downloading?",
      answer: "You have several options: you can download a visual portfolio as a PDF, generate a classic one-page resume, create a QR code for easy mobile sharing, or export the entire site as a static ZIP bundle (HTML/CSS) to host anywhere."
    },
    {
      question: "Can I switch templates after I've already entered all my information?",
      answer: " Yes. Your data is stored separately from the design. You can toggle between different templates at any time, and your information will automatically reformat to fit the new layout, allowing you to choose the best look without re-entering anything."
    },
    {
      question: "Will my portfolio work on mobile devices?",
      answer: "Yes. Every template is fully responsive and designed to look stunning on all devices, from large desktop monitors to tablets and mobile phones."
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
              <div className={`${styles.techIcon} ${styles.techIconNode}`}>
                <span className={styles.techIconText}>N</span>
              </div>
              <h3 className={styles.techTitle}>Node.js</h3>
              <p className={styles.techDescription}>Powerful runtime for server-side logic</p>
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
            Join             users who have already created stunning portfolios with XFolio.
          </p>
          <a href="/builder" className={styles.ctaButton}>
            Start Building Now
          </a>
        </div>
      </section>

      {/* Footer */}
      <PortfolioFooter isDarkMode={true} />
    </div>
  );
};

export default About;