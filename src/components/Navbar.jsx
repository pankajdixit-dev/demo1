import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, FileText, Sparkles, Send } from 'lucide-react';

export default function Navbar({ theme, toggleTheme, onOpenResume }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'education', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Education', href: '#education', id: 'education' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar-wrapper ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-inner">
        {/* Brand Logo */}
        <a href="#hero" className="brand-logo" onClick={(e) => handleLinkClick(e, '#hero')}>
          <div className="logo-badge">
            <span className="logo-brackets">&lt;</span>
            <span className="logo-initials">PD</span>
            <span className="logo-brackets">/&gt;</span>
          </div>
          <div className="logo-details">
            <span className="logo-name">Pankaj Dixit</span>
            <span className="logo-subtitle">Full Stack Dev</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-pills">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className={`nav-item ${activeSection === link.id ? 'active' : ''}`}
                  onClick={(e) => handleLinkClick(e, link.href)}
                >
                  {link.label}
                  {activeSection === link.id && <span className="nav-indicator" />}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Buttons */}
        <div className="nav-actions">
          {/* Resume Modal Trigger */}
          <button
            type="button"
            className="btn btn-outline btn-sm resume-btn"
            onClick={onOpenResume}
            title="View Structured Resume"
          >
            <FileText size={15} />
            <span>Resume</span>
          </button>

          {/* Theme Toggle */}
          <button
            type="button"
            className="theme-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun size={18} className="theme-icon sun-icon" />
            ) : (
              <Moon size={18} className="theme-icon moon-icon" />
            )}
          </button>

          {/* Hire Me / Let's Talk CTA */}
          <a
            href="#contact"
            className="btn btn-primary btn-sm hire-btn"
            onClick={(e) => handleLinkClick(e, '#contact')}
          >
            <Send size={14} />
            <span>Let's Talk</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-drawer animate-fadeIn">
          <ul className="mobile-nav-list">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className={`mobile-nav-item ${activeSection === link.id ? 'active' : ''}`}
                  onClick={(e) => handleLinkClick(e, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="mobile-action-item">
              <button
                type="button"
                className="btn btn-outline btn-full"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
              >
                <FileText size={16} />
                <span>View Full Resume</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
