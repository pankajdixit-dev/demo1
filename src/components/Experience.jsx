import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, Building, ShieldCheck, Sparkles } from 'lucide-react';
import { experienceData } from '../data/portfolioData';

export default function Experience() {
  return (
    <section id="experience" className="section experience-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <Briefcase size={14} />
            <span>Career Journey</span>
          </span>
          <h2 className="section-title">
            Internship &amp; <span className="gradient-text">Experience</span>
          </h2>
          <p className="section-desc">
            Hands-on software engineering experience building real-world MERN applications and high-traffic RESTful interfaces.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="experience-timeline">
          {experienceData.map((exp, index) => (
            <div key={index} className="timeline-item">
              
              {/* Timeline Marker & Line */}
              <div className="timeline-marker-column">
                <div className="timeline-marker-dot">
                  <div className="marker-inner-pulse"></div>
                </div>
                <div className="timeline-marker-line"></div>
              </div>

              {/* Timeline Card */}
              <div className="timeline-card glass-card">
                
                <div className="timeline-card-header">
                  <div>
                    <div className="timeline-role-badge">
                      <span className="badge badge-amber">{exp.type}</span>
                    </div>
                    <h3 className="timeline-role-title">{exp.role}</h3>
                    <div className="timeline-company-info">
                      <span className="company-name">
                        <Building size={16} className="text-amber" />
                        {exp.company}
                      </span>
                      <span className="company-dot">•</span>
                      <span className="company-location">
                        <MapPin size={15} />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <div className="timeline-period-pill">
                    <Calendar size={15} />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <p className="timeline-summary-text">{exp.description}</p>

                {/* Key Deliverables & Responsibilities */}
                <div className="timeline-deliverables">
                  <h4 className="deliverables-title">Key Responsibilities &amp; Impact:</h4>
                  <ul className="deliverables-list">
                    {exp.highlights.map((highlight, hIdx) => {
                      const [title, desc] = highlight.split('–');
                      return (
                        <li key={hIdx} className="deliverable-item">
                          <CheckCircle2 size={16} className="text-emerald deliverable-icon" />
                          <div>
                            {desc ? (
                              <>
                                <strong>{title.trim()}</strong> — {desc.trim()}
                              </>
                            ) : (
                              <span>{highlight}</span>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Tech Stack Pills */}
                <div className="timeline-tech-stack">
                  <span className="tech-stack-label">Stack Used:</span>
                  <div className="timeline-tags-list">
                    {exp.tech.map((tech, tIdx) => (
                      <span key={tIdx} className="badge badge-emerald">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
