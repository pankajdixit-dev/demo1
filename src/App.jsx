import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';
import Toast from './components/Toast';
import './App.css';

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme_preference') || 'dark';
  });

  const [resumeOpen, setResumeOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme_preference', theme);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    setToastMessage(`Switched to ${nextTheme === 'dark' ? 'Dark' : 'Light'} Mode`);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
  };

  return (
    <div className="portfolio-app-root">
      {/* Ambient Glow Orbs */}
      <div className="ambient-container" aria-hidden="true">
        <div className="ambient-blob blob-1"></div>
        <div className="ambient-blob blob-2"></div>
        <div className="ambient-blob blob-3"></div>
      </div>

      {/* Subtle Background Grid Texture */}
      <div className="bg-grid-overlay" aria-hidden="true"></div>

      {/* Main Navigation */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenResume={() => setResumeOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        <Hero
          onOpenResume={() => setResumeOpen(true)}
          onCopyContact={(msg) => showToast(msg)}
        />
        <About onOpenResume={() => setResumeOpen(true)} />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact onShowToast={showToast} />
      </main>

      {/* Footer */}
      <Footer onOpenResume={() => setResumeOpen(true)} />

      {/* Structured Resume Modal */}
      {resumeOpen && (
        <ResumeModal onClose={() => setResumeOpen(false)} />
      )}

      {/* Floating Toast Notification */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}
