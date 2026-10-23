import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Copy, 
  Check, 
  MessageSquare, 
  Sparkles, 
  Clock, 
  CheckCircle2 
} from 'lucide-react';
import { LinkedinIcon } from './SocialIcons';
import confetti from 'canvas-confetti';
import { personalData } from '../data/portfolioData';

export default function Contact({ onShowToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [copiedField, setCopiedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedField(type);
    if (onShowToast) onShowToast(`Copied ${type} to clipboard!`);
    
    // Confetti pop!
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 }
    });

    setTimeout(() => {
      setCopiedField(null);
    }, 2500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please fill out all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMsg('Please provide a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      let response;
      try {
        response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(formData)
        });
      } catch (fetchErr) {
        console.warn('Relative /api/contact failed, trying port 5000 fallback...', fetchErr);
        // Fallback to backend port 5000
        response = await fetch('http://localhost:5000/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(formData)
        });
      }

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Server error occurred while transmitting your message.');
      }

      setIsSubmitting(false);
      setSubmitted(true);
      if (onShowToast) onShowToast('Message delivered directly to Pankaj Dixit via email!');

      // Celebratory Confetti!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (err) {
      console.error('Contact Form Submit Error:', err);
      setIsSubmitting(false);
      setErrorMsg(
        err.message || 'Failed to send message. You can also email directly at pankaj.dixit9070@gmail.com'
      );
      if (onShowToast) onShowToast('Failed to send email. Please check your connection.');
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <Mail size={14} />
            <span>Get In Touch</span>
          </span>
          <h2 className="section-title">
            Let's Build Something <span className="gradient-text">Exceptional</span>
          </h2>
          <p className="section-desc">
            Available for full-time Full Stack Trainee roles, React developer positions, and innovative web engineering collaborations.
          </p>
        </div>

        <div className="contact-grid">
          
          {/* Left Column: Direct Contact Info & Fast Copy */}
          <div className="contact-info-column">
            <h3 className="contact-column-title">Direct Communication</h3>
            <p className="contact-column-desc">
              Feel free to reach out directly via email, phone, or LinkedIn. I typically respond within a few hours.
            </p>

            <div className="contact-cards-stack">
              
              {/* Email Card */}
              <div className="contact-card glass-card">
                <div className="contact-card-icon-box">
                  <Mail size={22} className="text-amber" />
                </div>
                <div className="contact-card-info">
                  <span className="contact-card-label">Email Address</span>
                  <a href={`mailto:${personalData.email}`} className="contact-card-value">
                    {personalData.email}
                  </a>
                </div>
                <button
                  type="button"
                  className="contact-copy-btn"
                  onClick={() => handleCopy(personalData.email, 'Email')}
                  title="Copy email to clipboard"
                >
                  {copiedField === 'Email' ? (
                    <Check size={16} className="text-emerald" />
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
              </div>

              {/* Phone Card */}
              <div className="contact-card glass-card">
                <div className="contact-card-icon-box">
                  <Phone size={22} className="text-emerald" />
                </div>
                <div className="contact-card-info">
                  <span className="contact-card-label">Phone &amp; WhatsApp</span>
                  <a href={`tel:${personalData.phone}`} className="contact-card-value">
                    {personalData.phone}
                  </a>
                </div>
                <button
                  type="button"
                  className="contact-copy-btn"
                  onClick={() => handleCopy(personalData.phone, 'Phone')}
                  title="Copy phone to clipboard"
                >
                  {copiedField === 'Phone' ? (
                    <Check size={16} className="text-emerald" />
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
              </div>

              {/* LinkedIn Card */}
              <div className="contact-card glass-card">
                <div className="contact-card-icon-box">
                  <LinkedinIcon size={22} className="text-amber" />
                </div>
                <div className="contact-card-info">
                  <span className="contact-card-label">LinkedIn Profile</span>
                  <a
                    href={personalData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-card-value"
                  >
                    linkedin.com/in/pankaj-dixit-brahm
                  </a>
                </div>
              </div>

              {/* Location Card */}
              <div className="contact-card glass-card">
                <div className="contact-card-icon-box">
                  <MapPin size={22} className="text-amber" />
                </div>
                <div className="contact-card-info">
                  <span className="contact-card-label">Current Location</span>
                  <span className="contact-card-value">{personalData.location}</span>
                </div>
              </div>

            </div>

            {/* Quick Availability Badge */}
            <div className="quick-availability-box glass-card">
              <div className="avail-pulse-dot"></div>
              <div>
                <strong>Notice Period: Available Immediately</strong>
                <p>Ready to relocate or join hybrid/remote teams across India.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="contact-form-column">
            <div className="form-card glass-card">
              <div className="form-header">
                <h3 className="form-title">Send a Direct Message</h3>
                <p className="form-desc">Fill out the quick form below to discuss opportunities or inquiries.</p>
              </div>

              {submitted ? (
                <div className="form-success-box animate-fadeIn">
                  <div className="success-icon-wrap">
                    <CheckCircle2 size={48} className="text-emerald" />
                  </div>
                  <h4 className="success-title">Message Received!</h4>
                  <p className="success-desc">
                    Thank you for reaching out. I have received your message and will get back to you promptly at your provided email!
                  </p>
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={() => setSubmitted(false)}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  {errorMsg && (
                    <div className="form-error-banner animate-fadeIn">
                      {errorMsg}
                    </div>
                  )}

                  <div className="form-row-2">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">
                        Your Name <span className="req">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-input"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        Your Email <span className="req">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-input"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="form-input"
                      placeholder="Full Stack Opportunity / Project Discussion"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <div className="form-label-row">
                      <label htmlFor="message" className="form-label">
                        Your Message <span className="req">*</span>
                      </label>
                      <span className="char-count">{formData.message.length} / 500</span>
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      maxLength="500"
                      className="form-textarea"
                      placeholder="Hi Pankaj, I reviewed your portfolio and would like to discuss..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-full form-submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="btn-loading-state">
                        <span className="spinner-border"></span>
                        <span>Transmitting Message...</span>
                      </span>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
