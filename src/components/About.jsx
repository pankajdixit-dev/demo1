import React from 'react';
import { 
  User, 
  MapPin, 
  Mail, 
  Phone, 
  Calendar, 
  GraduationCap, 
  Briefcase, 
  Check, 
  Layers, 
  Cpu, 
  Database, 
  Layout, 
  ShieldCheck
} from 'lucide-react';
import { personalData } from '../data/portfolioData';

export default function About({ onOpenResume }) {
  const highlights = [
    {
      icon: <Layout className="highlight-icon text-amber" size={26} />,
      title: "Dynamic React Frontends",
      desc: "Creating responsive, interactive web interfaces with modern React, hooks, component modularity, and smooth CSS animations."
    },
    {
      icon: <Cpu className="highlight-icon text-amber" size={26} />,
      title: "Robust RESTful APIs",
      desc: "Architecting backend services with Node.js and Express.js for scalable client-server communication and reliable data flow."
    },
    {
      icon: <Database className="highlight-icon text-emerald" size={26} />,
      title: "MongoDB Database Management",
      desc: "Designing document schemas, managing CRUD operations, and tuning MongoDB queries for optimal performance."
    },
    {
      icon: <ShieldCheck className="highlight-icon text-emerald" size={26} />,
      title: "Production Internship Rigor",
      desc: "Hands-on experience delivering full-stack web applications during a 6-month intensive internship at Ypsilon IT Solutions."
    }
  ];

  return (
    <section id="about" className="section about-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <User size={14} />
            <span>Know Me Better</span>
          </span>
          <h2 className="section-title">
            Passionate About Crafting <span className="gradient-text">Full-Stack Solutions</span>
          </h2>
          <p className="section-desc">
            Bridging technical engineering fundamentals with modern web development to build scalable, high-performance digital products.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="about-grid">
          
          {/* Left Column: Narrative & Highlights */}
          <div className="about-narrative">
            <h3 className="about-subtitle">Full Stack Trainee &amp; React.js Developer</h3>
            <p className="about-text">
              I am a dedicated Full Stack Trainee with extensive hands-on experience in <strong>React.js, Node.js, Express.js, and MongoDB</strong>. 
              Holding a <strong>Bachelor of Technology in Computer Science</strong> with <strong>75.4%</strong> distinction from Technocrats Institute of Technology, Bhopal (RGPV), I combine solid algorithmic foundations with agile development practices.
            </p>
            <p className="about-text">
              During my 6-month full-stack internship at <strong>Ypsilon IT Solutions Pvt. Ltd., Indore</strong>, I spearheaded full-stack application development, engineered secure RESTful APIs, optimized MongoDB queries for fast data retrieval, and enriched frontend UX with responsive React components.
            </p>

            {/* Highlights Grid */}
            <div className="highlights-grid">
              {highlights.map((item, index) => (
                <div key={index} className="highlight-card glass-card">
                  <div className="highlight-icon-box">{item.icon}</div>
                  <div>
                    <h4 className="highlight-title">{item.title}</h4>
                    <p className="highlight-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Personal Info Card */}
          <div className="about-meta-card glass-card">
            <div className="meta-card-header">
              <span className="meta-badge">Profile Essentials</span>
              <h4 className="meta-title">Personal Information</h4>
            </div>

            <ul className="meta-list">
              <li className="meta-item">
                <div className="meta-icon-wrapper"><User size={16} /></div>
                <div className="meta-content">
                  <span className="meta-label">Full Name</span>
                  <span className="meta-value">Pankaj Dixit</span>
                </div>
              </li>

              <li className="meta-item">
                <div className="meta-icon-wrapper"><Briefcase size={16} /></div>
                <div className="meta-content">
                  <span className="meta-label">Experience</span>
                  <span className="meta-value">6 Months Full Stack Intern @ Ypsilon IT</span>
                </div>
              </li>

              <li className="meta-item">
                <div className="meta-icon-wrapper"><GraduationCap size={16} /></div>
                <div className="meta-content">
                  <span className="meta-label">Education</span>
                  <span className="meta-value">B.Tech in Computer Science (75.4%)</span>
                </div>
              </li>

              <li className="meta-item">
                <div className="meta-icon-wrapper"><MapPin size={16} /></div>
                <div className="meta-content">
                  <span className="meta-label">Location</span>
                  <span className="meta-value">Vishnupuri, Indore, MP, India</span>
                </div>
              </li>

              <li className="meta-item">
                <div className="meta-icon-wrapper"><Mail size={16} /></div>
                <div className="meta-content">
                  <span className="meta-label">Email</span>
                  <a href={`mailto:${personalData.email}`} className="meta-link">
                    {personalData.email}
                  </a>
                </div>
              </li>

              <li className="meta-item">
                <div className="meta-icon-wrapper"><Phone size={16} /></div>
                <div className="meta-content">
                  <span className="meta-label">Phone</span>
                  <a href={`tel:${personalData.phone}`} className="meta-link">
                    {personalData.phone}
                  </a>
                </div>
              </li>

              <li className="meta-item">
                <div className="meta-icon-wrapper"><Calendar size={16} /></div>
                <div className="meta-content">
                  <span className="meta-label">Date of Birth</span>
                  <span className="meta-value">{personalData.dob}</span>
                </div>
              </li>
            </ul>

            <div className="meta-card-footer">
              <button 
                type="button" 
                className="btn btn-primary btn-full"
                onClick={onOpenResume}
              >
                <span>Download Verified Resume</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
