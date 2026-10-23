export const personalData = {
  name: "Pankaj Dixit",
  role: "Full Stack Trainee & React Developer",
  subtitles: [
    "Full Stack MERN Developer",
    "React.js Specialist",
    "RESTful API & Node.js Builder",
    "MongoDB Database Enthusiast",
    "Responsive UI/UX Engineer"
  ],
  phone: "+91 8962129815",
  email: "pankaj.dixit9070@gmail.com",
  linkedin: "https://www.linkedin.com/in/pankaj-dixit-brahm",
  github: "https://github.com/pankaj-dixit-brahm",
  location: "Vishnupuri, Indore, Madhya Pradesh, India",
  dob: "04 July 1999",
  fatherName: "Mr. Sanjay Dixit",
  avatar: "/images/avatar.png",
  objective:
    "Full Stack Trainee with hands-on experience in React.js, Node.js, Express.js, and MongoDB. Passionate about developing full-stack web applications and optimizing UI/UX with responsive, modern design. Skilled in building scalable web solutions with a keen focus on performance, clean architecture, and delightful user experience.",
  stats: [
    { value: "6+", label: "Months Internship Exp", icon: "Clock" },
    { value: "2+", label: "Full-Stack MERN Projects", icon: "Code2" },
    { value: "10+", label: "Modern Web Technologies", icon: "Layers" },
    { value: "75.4%", label: "B.Tech CS Degree", icon: "GraduationCap" }
  ]
};

export const skillsData = [
  {
    category: "Front-End",
    skills: [
      { name: "React.js", level: 90, desc: "Functional components, Hooks (useState, useEffect, useContext), Custom Hooks, SPA routing", icon: "Atom", popular: true },
      { name: "JavaScript (ES6+)", level: 88, desc: "Async/await, Promises, DOM manipulation, closures, modules, ES6 syntax", icon: "FileCode", popular: true },
      { name: "HTML5", level: 95, desc: "Semantic markup, accessibility (a11y), forms, SEO-friendly layout structure", icon: "Code", popular: false },
      { name: "CSS3 & Modern Styling", level: 90, desc: "Flexbox, CSS Grid, media queries, animations, glassmorphism, responsive design", icon: "Palette", popular: true },
      { name: "Bootstrap", level: 85, desc: "Grid systems, responsive utilities, rapid component prototyping", icon: "LayoutGrid", popular: false },
      { name: "jQuery", level: 78, desc: "DOM traversal, animation effects, event handling, AJAX integration", icon: "Workflow", popular: false }
    ]
  },
  {
    category: "Back-End & Database",
    skills: [
      { name: "Node.js", level: 85, desc: "Event-driven runtime, asynchronous I/O, npm package ecosystem, server scripts", icon: "Server", popular: true },
      { name: "Express.js", level: 86, desc: "RESTful API routes, middleware, request handling, error handling, CORS", icon: "Cpu", popular: true },
      { name: "MongoDB", level: 84, desc: "NoSQL document collections, CRUD operations, indexing, aggregation pipeline", icon: "Database", popular: true },
      { name: "RESTful APIs", level: 90, desc: "API endpoint architecture, JSON response serialization, status codes, query filtering", icon: "Send", popular: true }
    ]
  },
  {
    category: "Tools & Soft Skills",
    skills: [
      { name: "Git & GitHub", level: 85, desc: "Version control, branching, pull requests, collaboration workflow", icon: "GitBranch", popular: true },
      { name: "Postman", level: 88, desc: "API testing, payload debugging, environment variables, documentation", icon: "Terminal", popular: false },
      { name: "Vite & Tooling", level: 88, desc: "Modern frontend bundling, rapid HMR, build optimization", icon: "Zap", popular: false },
      { name: "Teamwork & Attitude", level: 95, desc: "Positive learning mindset, collaborative problem solving, agility", icon: "Users", popular: true }
    ]
  }
];

export const experienceData = [
  {
    role: "Full Stack Intern",
    company: "Ypsilon IT Solutions Pvt. Ltd.",
    location: "Indore, India",
    period: "05/2025 - 11/2025",
    type: "Internship (6 Months)",
    description:
      "Spearheaded development and maintenance of end-to-end full-stack web applications using the MERN stack (React.js, Node.js, Express.js, and MongoDB).",
    highlights: [
      "Developed Full Stack Applications – Built and maintained web applications using React.js, Node.js, Express.js, and MongoDB, ensuring smooth frontend and backend integration.",
      "API Development & Integration – Designed and implemented RESTful APIs for seamless data exchange between the frontend and backend.",
      "Database Management – Handled CRUD operations and optimized MongoDB queries for better performance and response times.",
      "Frontend & UI Enhancements – Improved user experience by implementing responsive and dynamic UI components with React.js and JavaScript."
    ],
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "JavaScript (ES6+)", "CSS3", "Git"]
  }
];

export const projectsData = [
  {
    id: "ecommerce-web",
    title: "E-Commerce Web Platform",
    subtitle: "Full-Stack MERN E-Commerce Storefront & Admin",
    category: "Full Stack (MERN)",
    image: "/images/ecommerce.jpg",
    summary:
      "A feature-rich e-commerce platform built with React.js frontend and Node/Express/MongoDB backend, designed to deliver seamless shopping experiences with real-time cart handling and robust product management.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "RESTful APIs", "CSS3", "JavaScript"],
    bullets: [
      "Developed an e-commerce platform Frontend leveraging React.js as the primary frontend framework, designed to provide a seamless shopping experience for users.",
      "Implemented React.js state management and hooks, ensuring scalable and efficient data handling throughout the application.",
      "Built RESTful API endpoints with Express and Node.js for product cataloging, category filtering, cart operations, and order placement.",
      "Engineered MongoDB schemas with Mongoose models, handling CRUD operations and query optimizations for instant search and filtering."
    ],
    liveDemo: "https://github.com/pankaj-dixit-brahm",
    githubRepo: "https://github.com/pankaj-dixit-brahm",
    featured: true,
    metrics: {
      loadTime: "< 0.8s",
      components: "25+ Reusable Components",
      apiEndpoints: "14 REST APIs"
    }
  },
  {
    id: "personal-portfolio",
    title: "Personal Developer Portfolio",
    subtitle: "Interactive Responsive Portfolio Website in React",
    category: "Frontend React",
    image: "/images/portfolio.jpg",
    summary:
      "A sleek, responsive, and interactive developer portfolio showcasing full-stack projects, skill assessments, internship journey, and an interactive contact system with modern CSS styling and best practices.",
    tech: ["React.js", "JavaScript (ES6+)", "HTML5", "Modern CSS3", "Lucide Icons"],
    bullets: [
      "Developed a fully responsive portfolio website using React.js, showcasing projects, and skills with an interactive UI.",
      "Designed and implemented an interactive UI with modern styling using CSS frameworks and best practices (glassmorphism, CSS variables, dark/light themes).",
      "Integrated dynamic modal previews, responsive mobile navigation drawer, and animated feedback systems."
    ],
    liveDemo: "#",
    githubRepo: "https://github.com/pankaj-dixit-brahm",
    featured: true,
    metrics: {
      lighthouse: "98/100",
      responsiveness: "Mobile, Tablet & Desktop",
      themes: "Dark & Light Mode"
    }
  }
];

export const educationData = [
  {
    degree: "Bachelor of Technology (Computer Science)",
    institution: "Technocrats Institute of Technology and Science College Bhopal, RGPV",
    period: "08/2018 - 08/2021",
    score: "Percentage: 75.4%",
    description: "Core computer science fundamentals, data structures, algorithms, object-oriented programming, database management systems, and software engineering principles.",
    badge: "First Class with Distinction"
  },
  {
    degree: "Polytechnic Diploma in Engineering",
    institution: "Govt. Polytechnic College Betul, RGPV",
    period: "07/2014 - 06/2017",
    score: "Percentage: 60.02%",
    description: "Technical engineering foundation, computer hardware, operating systems, networking fundamentals, and computer programming.",
    badge: "Technical Diploma"
  },
  {
    degree: "12th Senior Secondary",
    institution: "Sandeepni Higher Secondary School Betul, M.P. Board",
    period: "2016",
    score: "Percentage: 50.8%",
    description: "Science & Mathematics curriculum establishing logical and analytical problem-solving skills.",
    badge: "Higher Secondary"
  },
  {
    degree: "10th High School",
    institution: "Shri Vinayakam Higher Secondary School Betul, M.P. Board",
    period: "2014",
    score: "Percentage: 68.66%",
    description: "Foundational education in mathematics, science, language, and social sciences.",
    badge: "High School"
  }
];

export const certificatesData = [
  {
    title: "MERN Full Stack Development",
    issuer: "Universal Informatics, Indore",
    credentialId: "UI-MERN-2025",
    type: "Professional Certification",
    skills: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "Modern Web Architecture"],
    description: "Comprehensive hands-on training covering front-to-back web application engineering, RESTful APIs, database schema design, and asynchronous full-stack programming."
  },
  {
    title: "MERN Full Stack Internship Completion",
    issuer: "Ypsilon IT Solutions Pvt. Ltd., Indore",
    credentialId: "YPS-FS-2025-11",
    type: "Industry Internship Certification",
    skills: ["Full Stack Engineering", "MongoDB Optimization", "API Integration", "UI/UX Enhancements"],
    description: "Awarded upon successful completion of 6 months production internship developing scalable MERN applications and high-performance UI components."
  }
];
