import React, { useState } from 'react';
import { 
  Code2, 
  Layers, 
  Palette,
  FileCode,
  LayoutGrid,
  Workflow,
  Server,
  Cpu,
  Database,
  Send,
  GitBranch,
  Terminal,
  Users,
  Zap
} from 'lucide-react';
import { skillsData } from '../data/portfolioData';

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Front-End', 'Back-End & Database', 'Tools & Soft Skills'];

  const filteredSkills = selectedCategory === 'All'
    ? skillsData.flatMap(cat => cat.skills)
    : skillsData.find(cat => cat.category === selectedCategory)?.skills || [];

  const getSkillIcon = (iconName) => {
    switch (iconName) {
      case 'Atom': return <Code2 size={20} className="skill-cat-icon text-amber" />;
      case 'FileCode': return <FileCode size={20} className="skill-cat-icon text-amber" />;
      case 'Palette': return <Palette size={20} className="skill-cat-icon text-emerald" />;
      case 'LayoutGrid': return <LayoutGrid size={20} className="skill-cat-icon text-amber" />;
      case 'Workflow': return <Workflow size={20} className="skill-cat-icon text-emerald" />;
      case 'Server': return <Server size={20} className="skill-cat-icon text-emerald" />;
      case 'Cpu': return <Cpu size={20} className="skill-cat-icon text-amber" />;
      case 'Database': return <Database size={20} className="skill-cat-icon text-emerald" />;
      case 'Send': return <Send size={20} className="skill-cat-icon text-amber" />;
      case 'GitBranch': return <GitBranch size={20} className="skill-cat-icon text-amber" />;
      case 'Terminal': return <Terminal size={20} className="skill-cat-icon text-titanium" />;
      case 'Users': return <Users size={20} className="skill-cat-icon text-emerald" />;
      case 'Zap': return <Zap size={20} className="skill-cat-icon text-amber" />;
      default: return <Code2 size={20} className="skill-cat-icon text-amber" />;
    }
  };

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <Layers size={14} />
            <span>Technical Arsenal</span>
          </span>
          <h2 className="section-title">
            Skills &amp; <span className="gradient-text">Proficiencies</span>
          </h2>
          <p className="section-desc">
            A comprehensive suite of technologies and frameworks mastered through professional internship experience and project development.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="skills-filter-container">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`skills-filter-pill ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="skills-grid">
          {filteredSkills.map((skill, index) => (
            <div key={index} className="skill-card glass-card">
              <div className="skill-header">
                <div className="skill-title-group">
                  <div className="skill-icon-wrap">
                    {getSkillIcon(skill.icon)}
                  </div>
                  <span className="skill-name">{skill.name}</span>
                </div>
                <span className="skill-percent">{skill.level}%</span>
              </div>

              {/* Progress Meter Bar */}
              <div className="skill-bar-track">
                <div 
                  className="skill-bar-fill" 
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>

              <p className="skill-desc">{skill.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
