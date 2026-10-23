import React, { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

export default function Toast({ message, onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3200);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="toast-notification animate-slideUp">
      <div className="toast-icon-wrap">
        <CheckCircle2 size={18} className="text-emerald" />
      </div>
      <span className="toast-text">{message}</span>
      <button 
        type="button" 
        className="toast-close-btn" 
        onClick={onClose}
        aria-label="Dismiss notification"
      >
        <X size={14} />
      </button>
    </div>
  );
}
