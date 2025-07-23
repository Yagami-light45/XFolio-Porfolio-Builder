// Alert.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { X, AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import styles from './Alert.module.css';

// Modern Alert Component
const Alert = ({ type = 'info', title, message, onClose, duration = 5000 }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 300);
  }, [onClose]);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, handleClose]);

  const getAlertConfig = () => {
    switch (type) {
      case 'success':
        return {
          icon: CheckCircle,
          className: styles.success
        };
      case 'error':
        return {
          icon: AlertCircle,
          className: styles.error
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          className: styles.warning
        };
      default:
        return {
          icon: Info,
          className: styles.info
        };
    }
  };

  if (!isVisible) return null;

  const config = getAlertConfig();
  const Icon = config.icon;

  return (
    <div className={`${styles.alert} ${config.className} ${isClosing ? styles.closing : ''}`}>
      <Icon size={20} className={styles.icon} />
      <div className={styles.content}>
        {title && <h4 className={styles.title}>{title}</h4>}
        <p className={styles.message}>{message}</p>
      </div>
      <button
        onClick={handleClose}
        className={styles.closeButton}
      >
        <X size={16} />
      </button>
    </div>
  );
};

// Alert Hook
export const useAlert = () => {
  const [alerts, setAlerts] = useState([]);

  const showAlert = (type, title, message, duration = 5000) => {
    const id = Date.now() + Math.random();
    const newAlert = { id, type, title, message, duration };
    
    setAlerts(prev => [...prev, newAlert]);
  };

  const hideAlert = (id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  return {
    alerts,
    showAlert,
    hideAlert,
    success: (title, message, duration) => showAlert('success', title, message, duration),
    error: (title, message, duration) => showAlert('error', title, message, duration),
    warning: (title, message, duration) => showAlert('warning', title, message, duration),
    info: (title, message, duration) => showAlert('info', title, message, duration)
  };
};

// Alert Container
export const AlertContainer = ({ alerts, onHideAlert }) => {
  return (
    <div className={styles.alertContainer}>
      {alerts.map((alert, index) => (
        <div key={alert.id} style={{ marginBottom: '12px' }}>
          <Alert
            type={alert.type}
            title={alert.title}
            message={alert.message}
            duration={alert.duration}
            onClose={() => onHideAlert(alert.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default Alert;