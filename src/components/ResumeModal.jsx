import React, { useEffect } from 'react';
import { X, Printer, Download, Mail, Phone, MapPin, GraduationCap, Briefcase, Award, CheckCircle } from 'lucide-react';
import { LinkedinIcon } from './SocialIcons';
import { personalData, skillsData, experienceData, projectsData, educationData, certificatesData } from '../data/portfolioData';

export default function ResumeModal({ onClose }) {
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

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-backdrop animate-fadeIn" onClick={onClose}>
      <div 
        className="resume-modal-dialog glass-card animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Controls Bar */}
        <div className="resume-controls-bar no-print">
          <div className="resume-modal-title">
            <span>Official Resume Preview — Pankaj Dixit</span>
          </div>

          <div className="resume-actions-group">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handlePrint}
              title="Print or Save as PDF"
            >
              <Printer size={15} />
              <span>Print / Save PDF</span>
            </button>

            <button
              type="button"
              className="modal-close-icon-btn"
              onClick={onClose}
              aria-label="Close resume viewer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Printable Resume Sheet */}
        <div className="printable-resume-sheet" id="printable-area">
          {/* Header */}
          <div className="res-header">
            <h1 className="res-name">{personalData.name}</h1>
            <h2 className="res-title">{personalData.role}</h2>
            
            <div className="res-contact-row">
              <span className="res-contact-item">
                <Phone size={13} /> {personalData.phone}
              </span>
              <span className="res-separator">•</span>
              <span className="res-contact-item">
                <Mail size={13} /> {personalData.email}
              </span>
              <span className="res-separator">•</span>
              <a href={personalData.linkedin} target="_blank" rel="noreferrer" className="res-contact-item res-link">
                <LinkedinIcon size={13} /> linkedin.com/in/pankaj-dixit-brahm
              </a>
              <span className="res-separator">•</span>
              <span className="res-contact-item">
                <MapPin size={13} /> {personalData.location}
              </span>
            </div>
          </div>

          {/* Section: Career Objective */}
          <div className="res-section">
            <h3 className="res-section-title">CAREER OBJECTIVE</h3>
            <p className="res-text">{personalData.objective}</p>
          </div>

          {/* Section: Internship Experience */}
          <div className="res-section">
            <h3 className="res-section-title">INTERNSHIP EXPERIENCE</h3>
            {experienceData.map((exp, idx) => (
              <div key={idx} className="res-exp-block">
                <div className="res-exp-header">
                  <div>
                    <strong className="res-exp-role">{exp.role}</strong>
                    <div className="res-exp-company">{exp.company} — {exp.location}</div>
                  </div>
                  <span className="res-exp-period">{exp.period}</span>
                </div>

                <ul className="res-bullets">
                  {exp.highlights.map((h, hIdx) => {
                    const [head, body] = h.split('–');
                    return (
                      <li key={hIdx}>
                        <strong>{head.trim()}</strong> – {body ? body.trim() : ''}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          {/* Section: Skills */}
          <div className="res-section">
            <h3 className="res-section-title">TECHNICAL SKILLS</h3>
            <div className="res-skills-table">
              <div className="res-skill-row">
                <span className="res-skill-cat">Front-End:</span>
                <span className="res-skill-val">HTML, CSS, JavaScript (ES6+), ReactJS, jQuery, Bootstrap</span>
              </div>
              <div className="res-skill-row">
                <span className="res-skill-cat">Back-End:</span>
                <span className="res-skill-val">NodeJS, ExpressJS, MongoDB, RESTful APIs</span>
              </div>
              <div className="res-skill-row">
                <span className="res-skill-cat">Tools &amp; Soft-Skills:</span>
                <span className="res-skill-val">Git, GitHub, Postman, Vite, Positive Attitude, Teamwork</span>
              </div>
            </div>
          </div>

          {/* Section: Projects */}
          <div className="res-section">
            <h3 className="res-section-title">PROJECTS</h3>
            {projectsData.map((proj) => (
              <div key={proj.id} className="res-proj-block">
                <div className="res-proj-header">
                  <strong className="res-proj-title">{proj.title}</strong>
                  <span className="res-proj-tech">Tech: {proj.tech.join(', ')}</span>
                </div>
                <ul className="res-bullets">
                  {proj.bullets.map((b, bIdx) => (
                    <li key={bIdx}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Section: Education */}
          <div className="res-section">
            <h3 className="res-section-title">EDUCATION</h3>
            <div className="res-edu-list">
              {educationData.map((edu, idx) => (
                <div key={idx} className="res-edu-item">
                  <div className="res-edu-row-top">
                    <strong>{edu.degree}</strong>
                    <span className="res-edu-score">{edu.score}</span>
                  </div>
                  <div className="res-edu-row-bottom">
                    <span>{edu.institution}</span>
                    <span className="res-edu-period">{edu.period}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Certificates */}
          <div className="res-section">
            <h3 className="res-section-title">CERTIFICATES</h3>
            <ul className="res-bullets">
              {certificatesData.map((c, idx) => (
                <li key={idx}>
                  <strong>{c.title}</strong> — {c.issuer}
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Personal Details */}
          <div className="res-section">
            <h3 className="res-section-title">PERSONAL DETAILS</h3>
            <div className="res-personal-grid">
              <div><strong>Father's Name:</strong> {personalData.fatherName}</div>
              <div><strong>Date of Birth:</strong> {personalData.dob}</div>
              <div><strong>Address:</strong> {personalData.location}</div>
            </div>
          </div>

          {/* Declaration */}
          <div className="res-section res-declaration-block">
            <h3 className="res-section-title">DECLARATION</h3>
            <p className="res-text">
              I hereby declare that the information provided is true and correct to the best of my knowledge.
            </p>
            <div className="res-sig-row">
              <span>Date: {new Date().toLocaleDateString('en-GB')}</span>
              <strong>Pankaj Dixit</strong>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
