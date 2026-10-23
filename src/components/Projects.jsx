import React, { useState } from 'react';
import { 
  Briefcase, 
  ExternalLink, 
  ArrowUpRight, 
  Eye, 
  CheckCircle2, 
  Sparkles,
  Code2
} from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { projectsData } from '../data/portfolioData';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [activeModalProject, setActiveModalProject] = useState(null);

  const categories = ['All', 'Full Stack (MERN)', 'Frontend React'];

  const filteredProjects = filter === 'All' 
    ? projectsData 
    : projectsData.filter(p => p.category === filter);

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <Briefcase size={14} />
            <span>Featured Works</span>
          </span>
          <h2 className="section-title">
            Projects &amp; <span className="gradient-text">Case Studies</span>
          </h2>
          <p className="section-desc">
            Production-grade web applications highlighting MERN stack proficiency, responsive frontends, and RESTful API integrations.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="projects-filter-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`filter-pill ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-card glass-card">
              
              {/* Card Image Banner */}
              <div className="project-image-box" onClick={() => setActiveModalProject(project)}>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="project-thumb"
                  loading="lazy"
                />
                <div className="project-image-glass">
                  <span className="view-case-study-btn">
                    <Eye size={16} />
                    <span>View Case Study</span>
                  </span>
                </div>
                <div className="project-card-badge">
                  <span className="badge badge-emerald">{project.category}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="project-card-body">
                <div className="project-card-header">
                  <h3 className="project-card-title">{project.title}</h3>
                  <p className="project-card-subtitle">{project.subtitle}</p>
                </div>

                <p className="project-card-desc">{project.summary}</p>

                {/* Key Bullet Highlights */}
                <ul className="project-mini-bullets">
                  {project.bullets.slice(0, 2).map((b, idx) => (
                    <li key={idx} className="project-mini-bullet-item">
                      <CheckCircle2 size={14} className="text-emerald mini-bullet-icon" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Pills */}
                <div className="project-tags-list">
                  {project.tech.map((tech, idx) => (
                    <span key={idx} className="project-tag-pill">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Card Action Buttons */}
                <div className="project-card-footer">
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={() => setActiveModalProject(project)}
                  >
                    <Eye size={14} />
                    <span>Deep Dive</span>
                  </button>

                  <a
                    href={project.githubRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    <span>View Code</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Interactive Modal */}
      {activeModalProject && (
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      )}
    </section>
  );
}
