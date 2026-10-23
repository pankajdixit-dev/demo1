import React from 'react';
import { ArrowUp, Heart, Mail, Phone, Code2 } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './SocialIcons';
import { personalData } from '../data/portfolioData';

export default function Footer({ onOpenResume }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="container footer-container">
        
        <div className="footer-top-row">
          <div className="footer-brand-block">
            <div className="footer-logo">
              <span className="logo-brackets">&lt;</span>
              <span className="logo-initials">PD</span>
              <span className="logo-brackets">/&gt;</span>
              <span className="footer-name">{personalData.name}</span>
            </div>
            <p className="footer-tagline">
              Full Stack Trainee &amp; React.js Developer dedicated to building performant, responsive web applications and reliable RESTful services.
            </p>
          </div>

          <div className="footer-nav-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links-list">
              <li><a href="#about">About</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#experience">Internship</a></li>
              <li><a href="#education">Education</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-nav-col">
            <h4 className="footer-col-title">Quick Connect</h4>
            <ul className="footer-links-list">
              <li>
                <a href={personalData.linkedin} target="_blank" rel="noreferrer" style={{display: 'inline-flex', alignItems: 'center', gap: '6px'}}>
                  <LinkedinIcon size={14} />
                  <span>LinkedIn Profile</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${personalData.email}`}>
                  {personalData.email}
                </a>
              </li>
              <li>
                <a href={`tel:${personalData.phone}`}>
                  {personalData.phone}
                </a>
              </li>
              <li>
                <button type="button" className="footer-text-btn" onClick={onOpenResume}>
                  Download Verified Resume
                </button>
              </li>
            </ul>
          </div>

          <div className="footer-action-col">
            <button
              type="button"
              className="back-to-top-btn"
              onClick={scrollToTop}
              title="Scroll to Top"
              aria-label="Scroll back to top"
            >
              <ArrowUp size={18} />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

        <div className="footer-bottom-divider"></div>

        <div className="footer-bottom-row">
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} Pankaj Dixit. All rights reserved.
          </p>
          <p className="footer-tech-credit">
            Developed with <span className="heart-icon">❤️</span> using <strong>React.js</strong>, Modern CSS &amp; Clean Architecture.
          </p>
        </div>

      </div>
    </footer>
  );
}
