import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import styles from './ShareModal.module.css'; // Create this CSS file next
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';

const ShareModal = ({ portfolioUrl, onClose, isDarkMode }) => {
  const canvasRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (portfolioUrl && canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, portfolioUrl, {
        width: 220,
        margin: 2,
        color: {
          dark: isDarkMode ? '#FFFFFF' : '#000000',
          light: isDarkMode ? '#222222' : '#FFFFFF',
        },
      });
    }
  }, [portfolioUrl, isDarkMode]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(portfolioUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  };

  if (!portfolioUrl) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={`${styles.modal} ${isDarkMode ? styles.darkMode : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeButton} onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h3>Share Portfolio</h3>
        <div className={styles.qrContainer}>
          <canvas ref={canvasRef} />
        </div>
        <p className={styles.instructions}>
          Scan the QR code with your phone or copy the link below.
        </p>
        <div className={styles.linkContainer}>
          <input type="text" value={portfolioUrl} readOnly />
          <button onClick={handleCopyLink}>
            <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;