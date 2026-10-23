import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Download, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Code2, 
  Sparkles,
  Layers,
  GraduationCap,
  Clock
} from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './SocialIcons';
import { personalData } from '../data/portfolioData';

export default function Hero({ onOpenResume, onCopyContact }) {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const currentString = personalData.subtitles[currentRoleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentString.substring(0, displayedText.length + 1));
        if (displayedText === currentString) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayedText(currentString.substring(0, displayedText.length - 1));
        if (displayedText === '') {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % personalData.subtitles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentRoleIndex]);

  return (
    <section id="hero" className="section hero-section">
      <div className="container hero-container">
        
        {/* Left Column: Hero Copy & CTAs */}
        <div className="hero-content">
          {/* Availability Pill */}
          <div className="hero-badge-wrapper">
            <span className="live-status-dot"></span>
            <span className="hero-badge-text">Available for Full Stack Trainee &amp; React Roles</span>
          </div>

          <h1 className="hero-title">
            <span className="hero-greeting">Hi there, I'm</span>
            <span className="hero-name gradient-text">Pankaj Dixit</span>
          </h1>

          {/* Dynamic Rotating Role */}
          <div className="hero-role-wrapper">
            <span className="role-prefix">I build scalable web apps as a </span>
            <span className="dynamic-role-text">
              {displayedText}
              <span className="typewriter-cursor">|</span>
            </span>
          </div>

          <p className="hero-bio">
            {personalData.objective}
          </p>

          {/* Primary Action Buttons */}
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary hero-btn-main">
              <span>View My Projects</span>
              <ArrowRight size={17} />
            </a>

            <button
              type="button"
              className="btn btn-outline hero-btn-sub"
              onClick={onOpenResume}
            >
              <Download size={17} />
              <span>Resume &amp; CV</span>
            </button>

            <a href="#contact" className="btn btn-secondary hero-btn-contact">
              <Mail size={17} />
              <span>Contact Me</span>
            </a>
          </div>

          {/* Quick Contact & Socials Bar */}
          <div className="hero-social-bar">
            <a
              href={personalData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="social-pill"
              title="LinkedIn Profile"
            >
              <LinkedinIcon size={16} />
              <span>LinkedIn</span>
            </a>

            <a
              href={`mailto:${personalData.email}`}
              className="social-pill"
              title="Send Direct Email"
            >
              <Mail size={16} />
              <span>Email</span>
            </a>

            <a
              href={`tel:${personalData.phone}`}
              className="social-pill"
              title="Direct Phone Call"
            >
              <Phone size={16} />
              <span>+91 8962129815</span>
            </a>

            <div className="location-pill" title="Current Location">
              <MapPin size={15} />
              <span>Indore, MP, India</span>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Avatar Card with Floating Badges */}
        <div className="hero-visual">
          <div className="hero-card-glow"></div>
          
          <div className="hero-avatar-card glass-card">
            {/* Top Terminal Header */}
            <div className="terminal-bar">
              <div className="terminal-dots">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
              <span className="terminal-title">pankaj-dixit.dev ~ mern-stack</span>
            </div>

            {/* Avatar Frame */}
            <div className="avatar-frame">
              <img
                src={personalData.avatar}
                alt="Pankaj Dixit Full Stack Developer"
                className="hero-avatar-img"
              />
              <div className="avatar-overlay-gradient"></div>

              {/* Status Pill on image */}
              <div className="avatar-status-tag">
                <CheckCircle2 size={14} className="text-emerald" />
                <span>MERN Certified</span>
              </div>
            </div>

            {/* Bottom Card Summary */}
            <div className="avatar-card-footer">
              <div className="footer-code-snippet">
                <span className="code-comment">// Full Stack Trainee @ Ypsilon IT Solutions</span>
                <span className="code-line">
                  <span className="code-keyword">const</span> <span className="code-var">developer</span> = <span className="code-brace">&#123;</span>
                </span>
                <span className="code-line indent">
                  stack: <span className="code-string">['React', 'Node', 'Express', 'MongoDB']</span>,
                </span>
                <span className="code-line indent">
                  status: <span className="code-string">'Ready to Deliver High Impact'</span>
                </span>
                <span className="code-line"><span className="code-brace">&#125;</span>;</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Stats Counter Strip */}
      <div className="container stats-strip-wrapper">
        <div className="stats-grid glass-card">
          {personalData.stats.map((stat, idx) => {
            const getIcon = () => {
              if (stat.icon === 'Clock') return <Clock size={24} className="stat-icon" />;
              if (stat.icon === 'Code2') return <Code2 size={24} className="stat-icon" />;
              if (stat.icon === 'Layers') return <Layers size={24} className="stat-icon" />;
              return <GraduationCap size={24} className="stat-icon" />;
            };

            return (
              <div key={idx} className="stat-card">
                <div className="stat-icon-wrapper">
                  {getIcon()}
                </div>
                <div className="stat-info">
                  <span className="stat-number gradient-text">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
