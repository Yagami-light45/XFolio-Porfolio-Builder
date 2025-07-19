// src/utils/template2Print.js

export const printPortfolio = (styles) => {
  // Create a style element with print-specific CSS
  const printStyles = document.createElement('style');
  printStyles.innerHTML = `
    @media print {
      @page {
        size: A4;
        margin: 0.8in;
      }

      body {
        -webkit-print-color-adjust: exact !important;
        color-adjust: exact !important;
        background-color: #ffffff !important;
        font-size: 11pt;
      }

      .${styles.template2Sidebar},
      .${styles.template2MobileHeader}{
        display: none !important;
      }

      /* Expand the main content area to take up the full page width */
      .${styles.template2MainContent} {
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
      }

      /* Style sections for clarity and prevent them from splitting across pages */
      .${styles.template2Section} {
        page-break-inside: avoid;
        border-top: 1px solid #e0e0e0;
        padding-top: 1rem;
        margin-top: 1rem;
      }
      .${styles.template2Section}:first-of-type {
        border-top: none; /* No border for the very first section */
        margin-top: 0;
      }

      h2, h3, p {
        color: #000000 !important;
      }

      a {
        color: #0056b3 !important;
        text-decoration: none;
      }
    }
  `;

  // Append styles, trigger the print dialog, and then remove the styles
  document.head.appendChild(printStyles);
  window.print();
  document.head.removeChild(printStyles);
};