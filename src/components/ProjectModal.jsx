import React, { useEffect } from 'react';
import { X, ExternalLink, CheckCircle, Cpu, Zap, Layers, Server } from 'lucide-react';
import { GithubIcon } from './SocialIcons';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="modal-backdrop animate-fadeIn" onClick={onClose}>
      <div 
        className="modal-content glass-card animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button 
          type="button" 
          className="modal-close-btn" 
          onClick={onClose}
          aria-label="Close project modal"
        >
          <X size={20} />
        </button>

        {/* Modal Header Image */}
        <div className="modal-image-wrapper">
          <img 
            src={project.image} 
            alt={project.title} 
            className="modal-image"
          />
          <div className="modal-image-overlay">
            <span className="badge badge-emerald">{project.category}</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          <div className="modal-title-row">
            <div>
              <h3 className="modal-title">{project.title}</h3>
              <p className="modal-subtitle">{project.subtitle}</p>
            </div>
            
            <div className="modal-actions-top">
              {project.githubRepo && (
                <a
                  href={project.githubRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm"
                  title="View GitHub Repository"
                >
                  <GithubIcon size={15} />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </div>

          {/* Tech Badges */}
          <div className="modal-tech-pills">
            {project.tech.map((t, i) => (
              <span key={i} className="tech-tag">
                {t}
              </span>
            ))}
          </div>

          {/* Overview */}
          <div className="modal-section-block">
            <h4 className="modal-section-heading">Project Overview</h4>
            <p className="modal-text">{project.summary}</p>
          </div>

          {/* Key Contributions & Implementation details */}
          <div className="modal-section-block">
            <h4 className="modal-section-heading">Key Implementation &amp; Technical Highlights</h4>
            <ul className="modal-bullets-list">
              {project.bullets.map((bullet, idx) => (
                <li key={idx} className="modal-bullet-item">
                  <CheckCircle size={17} className="text-emerald bullet-icon" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Metrics Card */}
          {project.metrics && (
            <div className="modal-metrics-card">
              <h4 className="modal-section-heading">Performance &amp; Scale Metrics</h4>
              <div className="modal-metrics-grid">
                {Object.entries(project.metrics).map(([key, val], idx) => (
                  <div key={idx} className="modal-metric-item">
                    <span className="metric-val gradient-text">{val}</span>
                    <span className="metric-label">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer CTAs */}
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close Preview
            </button>
            <a
              href={project.githubRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <span>Explore Source Code</span>
              <ExternalLink size={15} />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
