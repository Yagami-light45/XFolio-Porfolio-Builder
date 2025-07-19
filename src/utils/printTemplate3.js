// src/utils/printUtils.js


export const printPortfolio = (styles) => {
  // Create a style element with enhanced print-specific CSS
  const printStyles = document.createElement('style');
  printStyles.innerHTML = `
    @media print {
      @page {
        size: A4;
        margin: 0.75in;
      }

      body {
        -webkit-print-color-adjust: exact; /* Chrome, Safari */
        color-adjust: exact; /* Firefox */
        background-color: #ffffff !important;
        font-size: 11pt;
      }

      /* Hide non-essential elements */
      .${styles.template3Header},
      .${styles.template3HeroActions},
      .${styles.template3Hamburger},
      .${styles.template3DarkModeToggle}{
        display: none !important;
      }

      /* Ensure root is in light mode for printing */
      .${styles.template3PortfolioRoot} {
        background-color: #ffffff !important;
        color: #000000 !important;
      }
      
      /* Reset layout for printing */
      .${styles.template3Container} {
        margin-top: 0 !important;
        padding-top: 0 !important;
        box-shadow: none !important;
      }
      
      /* Style sections for clarity */
      .${styles.template3Section} {
        page-break-inside: avoid;
        padding: 10px 0;
        border-bottom: 1px solid #e0e0e0;
      }

      .${styles.template3Section}:last-of-type {
        border-bottom: none;
      }

      h1, h2, h3 {
        color: #000000 !important;
      }

      a {
        color: #0056b3 !important;
        text-decoration: none;
      }
    }
  `;

  // Append styles, trigger print, and clean up
  document.head.appendChild(printStyles);
  window.print();
  document.head.removeChild(printStyles);
};