// src/utils/template4Print.js


export const printPortfolio = (styles) => {
  // Create a style element with print-specific CSS
  const printStyles = document.createElement('style');
  printStyles.innerHTML = `
    @media print {
      @page {
        size: A4;
        margin: 0.75in;
      }

      body {
        -webkit-print-color-adjust: exact !important;
        color-adjust: exact !important;
        background-color: #ffffff !important;
        font-size: 10pt;
      }

      /* Hide non-printable elements */
      .${styles.template4Header},
      .${styles.template4HeroButtons},
      .${styles.template4ImageFrame}{
        display: none !important;
      }

      /* Force light theme and remove shadows */
      .${styles.template4PortfolioRoot} {
        background: #ffffff !important;
        color: #000000 !important;
      }
      * {
        box-shadow: none !important;
        border-color: #ccc !important;
        color: #000 !important;
      }

      /* Reset layout for printing */
      .${styles.template4Main}, .${styles.template4HeroSection} {
        padding: 0 !important;
        margin: 0 !important;
      }

      /* Avoid breaking elements across pages */
      .${styles.template4Section},
      .${styles.template4ProjectCard},
      .${styles.template4TimelineItem} {
        page-break-inside: avoid;
      }

      /* Simplify timeline visuals */
      .${styles.template4Timeline}::before {
        background-color: #ccc !important;
      }
      .${styles.template4TimelineMarker} {
        background-color: #333 !important;
      }

      a, .${styles.template4ProjectLink} {
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