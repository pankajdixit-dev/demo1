import React, { useState } from 'react';
import { 
  GraduationCap, 
  Award, 
  Calendar, 
  CheckCircle2, 
  BookOpen, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';
import { educationData, certificatesData } from '../data/portfolioData';

export default function Education() {
  const [activeTab, setActiveTab] = useState('education');

  return (
    <section id="education" className="section education-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <GraduationCap size={14} />
            <span>Academic &amp; Qualifications</span>
          </span>
          <h2 className="section-title">
            Education &amp; <span className="gradient-text">Certifications</span>
          </h2>
          <p className="section-desc">
            Strong academic roots in Computer Science complemented by industry-standard MERN certifications.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="edu-tabs-wrapper">
          <button
            type="button"
            className={`edu-tab-btn ${activeTab === 'education' ? 'active' : ''}`}
            onClick={() => setActiveTab('education')}
          >
            <GraduationCap size={16} />
            <span>Formal Education</span>
          </button>
          <button
            type="button"
            className={`edu-tab-btn ${activeTab === 'certificates' ? 'active' : ''}`}
            onClick={() => setActiveTab('certificates')}
          >
            <Award size={16} />
            <span>Professional Certifications</span>
          </button>
        </div>

        {/* Education Tab Content */}
        {activeTab === 'education' ? (
          <div className="education-grid">
            {educationData.map((item, index) => (
              <div key={index} className="edu-card glass-card">
                
                <div className="edu-card-top">
                  <div className="edu-icon-box">
                    <GraduationCap size={22} className="text-amber" />
                  </div>
                  <div className="edu-score-badge">
                    <span className="badge badge-emerald">{item.score}</span>
                  </div>
                </div>

                <h3 className="edu-degree-title">{item.degree}</h3>
                <h4 className="edu-institution-name">{item.institution}</h4>

                <div className="edu-period-row">
                  <Calendar size={14} />
                  <span>{item.period}</span>
                </div>

                <p className="edu-desc">{item.description}</p>

                <div className="edu-card-footer">
                  <span className="edu-distinction-tag">
                    <CheckCircle2 size={13} className="text-emerald" />
                    <span>{item.badge}</span>
                  </span>
                </div>

              </div>
            ))}
          </div>
        ) : (
          /* Certifications Tab Content */
          <div className="certificates-grid">
            {certificatesData.map((cert, index) => (
              <div key={index} className="cert-card glass-card">
                
                <div className="cert-card-top">
                  <div className="cert-icon-box">
                    <Award size={24} className="text-amber" />
                  </div>
                  <span className="badge badge-amber">{cert.type}</span>
                </div>

                <h3 className="cert-title">{cert.title}</h3>
                <h4 className="cert-issuer">Issued by: <strong>{cert.issuer}</strong></h4>
                
                <p className="cert-desc">{cert.description}</p>

                <div className="cert-skills-block">
                  <span className="cert-skills-heading">Core Skills Certified:</span>
                  <div className="cert-pills-list">
                    {cert.skills.map((s, idx) => (
                      <span key={idx} className="badge badge-emerald">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="cert-footer">
                  <div className="verified-seal">
                    <ShieldCheck size={16} className="text-emerald" />
                    <span>Verified Credential</span>
                  </div>
                  <span className="cert-id-badge">ID: {cert.credentialId}</span>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
