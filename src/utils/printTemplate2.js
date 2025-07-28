export const printPortfolio = (styles) => {
  const printStyles = document.createElement('style');
  printStyles.innerHTML = `
    @media print {
      @page { size: A4 landscape; margin: 0.6in; }
      body {
        -webkit-print-color-adjust: exact !important;
        color-adjust: exact !important;
        background: white !important;
        font-size: 11pt;
        line-height: 1.4;
      }
      .${styles.template2MobileHeader},
      .${styles.template2MobileOverlay},
      .${styles.template2HamburgerButton},
      .${styles.footerWrapper},
      .${styles.template2SidebarActions} {
        display: none !important;
      }
      .${styles.template2PortfolioRoot} { background: white !important; }
      .${styles.contentWrapper} { display: flex !important; width: 100% !important; }
      .${styles.template2Sidebar} {
        width: 250px !important;
        min-width: 250px !important;
        background: #f8f9fa !important;
        border-right: 1px solid #e0e0e0 !important;
        padding: 1rem !important;
        position: relative !important;
        transform: none !important;
        display: block !important;
      }
      .${styles.template2SidebarProfile} img {
        width: 100px !important;
        height: 100px !important;
        border-radius: 50% !important;
        margin-bottom: 1rem !important;
      }
      .${styles.template2SidebarProfile} h2 {
        font-size: 14pt !important;
        color: #000 !important;
        margin-bottom: 0.5rem !important;
      }
      .${styles.template2SidebarProfile} p {
        font-size: 10pt !important;
        color: #666 !important;
        margin-bottom: 1rem !important;
      }
      .${styles.template2SidebarNav} ul { list-style: none !important; padding: 0 !important; }
      .${styles.template2SidebarNav} li { margin-bottom: 0.5rem !important; }
      .${styles.template2SidebarNav} a {
        color: #333 !important;
        text-decoration: none !important;
        font-size: 10pt !important;
      }
      .${styles.template2SocialLinks} {
        margin-top: 1rem !important;
        display: flex !important;
        gap: 0.5rem !important;
      }
      .${styles.template2SocialLinks} a { color: #666 !important; font-size: 12pt !important; }
      .${styles.template2MainContent} {
        flex: 1 !important;
        padding: 1rem !important;
        background: white !important;
      }
      .${styles.template2Section} {
        page-break-inside: avoid;
        margin-bottom: 1.5rem !important;
        border-bottom: 1px solid #eee !important;
        padding-bottom: 1rem !important;
      }
      .${styles.template2Section} h2 {
        color: #000 !important;
        font-size: 14pt !important;
        margin-bottom: 0.8rem !important;
        page-break-after: avoid;
      }
      .${styles.template2Section} h3 {
        color: #333 !important;
        font-size: 12pt !important;
        margin-bottom: 0.3rem !important;
      }
      .${styles.template2Section} p { color: #000 !important; margin-bottom: 0.5rem !important; }
      .${styles.template2ExperienceItem},
      .${styles.template2ProjectItem},
      .${styles.template2EducationItem} {
        page-break-inside: avoid;
        margin-bottom: 1rem !important;
        padding-left: 0.5rem !important;
        border-left: 2px solid #ddd !important;
      }
      .${styles.template2Duration} { color: #666 !important; font-style: italic !important; font-size: 9pt !important; }
      .${styles.template2TechStack} { color: #444 !important; font-weight: bold !important; font-size: 9pt !important; }
      .${styles.template2Skills} {
        display: flex !important;
        flex-wrap: wrap !important;
        gap: 0.3rem !important;
       
        padding: 0 !important;
      }
      .${styles.template2Skills} li {
        background: #f0f0f0 !important;
        padding: 0.2rem 0.4rem !important;
        border-radius: 3px !important;
        font-size: 9pt !important;
        color: #000 !important;
        border: 1px solid #ccc !important;
      }
      a { color: #0056b3 !important; text-decoration: underline !important; }
      p, li { orphans: 2; widows: 2; }
    }
  `;
  document.head.appendChild(printStyles);
  setTimeout(() => {
    window.print();
    setTimeout(() => {
      if (document.head.contains(printStyles)) {
        document.head.removeChild(printStyles);
      }
    }, 1000);
  }, 100);
};