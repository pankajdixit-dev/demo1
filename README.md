# 🚀 Pankaj Dixit | Modern Full Stack & React.js Portfolio

A responsive, high-performance personal developer portfolio web application built with **React.js**, modern **CSS3** (glassmorphism, CSS variables, dark/light themes), and vanilla JavaScript. Showcases full-stack MERN projects, technical skills, internship experience, education, and an interactive developer playground.

---

## 🌟 Key Features

- 🌓 **Dynamic Dark & Light Mode**: Seamless theme switching with preference persistence in `localStorage`.
- ⚡ **Interactive Hero & Typewriter Role**: Rotating dynamic roles (*Full Stack MERN Developer*, *React.js Specialist*, *RESTful API Builder*), live availability status beacon, and quick social links.
- 🧪 **Interactive Tech Lab**:
  - **REST API Simulator (MERN)**: Select simulated endpoints (`/api/projects`, `/api/internship`, `/api/skills/mern`, `/api/contact`), trigger requests with simulated latency, and view formatted JSON payload responses.
  - **Interactive React State Lab**: Real-time component state playground with step multipliers and like toggle.
- 💼 **Featured Projects & Deep-Dive Modals**:
  - **Full-Stack E-Commerce Platform**: MERN platform with product catalog, cart, REST API routes, and MongoDB CRUD operations.
  - **Personal Developer Portfolio**: Interactive responsive portfolio in React.js with modern CSS architecture.
  - **MERN DevMetrics & TaskFlow**: Agile project management and server API monitoring dashboard.
  - Detailed case study modals displaying architectural breakdown, metrics, and source code links.
- 🏢 **Internship Timeline**: Comprehensive timeline of 6-month full-stack internship at **Ypsilon IT Solutions Pvt. Ltd., Indore** (05/2025 – 11/2025).
- 🎓 **Education & Certifications Dual View**:
  - B.Tech in Computer Science (**75.4%** distinction from TIT&S Bhopal, RGPV).
  - Polytechnic Diploma (**60.02%** from Govt. Polytechnic College Betul).
  - Verified MERN Full Stack Developer Certification from Universal Informatics, Indore.
  - MERN Internship Certification from Ypsilon IT Solutions Pvt. Ltd.
- 📄 **Interactive Structured Resume Modal**: Complete digital CV preview matching Pankaj Dixit's credentials with 1-click **Print / Save as PDF** support.
- 📬 **Interactive Contact Section**:
  - 1-Click **Copy Email / Phone to Clipboard** with celebratory confetti animation (`canvas-confetti`).
  - Contact form with real-time field validation, character counter, loading spinner, and success feedback.
- 📱 **100% Mobile & Tablet Responsive**: Responsive grid layouts and custom mobile drawer navigation.

---

## 🛠️ Technology Stack

- **Frontend Core**: React 19 (Functional Components, Hooks: `useState`, `useEffect`)
- **Styling**: Vanilla CSS3 (Custom Properties/Tokens, Glassmorphism, CSS Grid, Flexbox, Media Queries)
- **Icons**: Lucide React & Handcrafted SVGs
- **Build Tool**: Vite (Lightning-fast HMR and bundle optimization)
- **Interactive Effects**: `canvas-confetti`

---

## 📁 Project Architecture

```text
pankaj-portfolio/
├── public/
│   └── images/
│       ├── avatar.jpg          # High-resolution developer portrait
│       ├── ecommerce.jpg       # E-Commerce platform preview
│       ├── portfolio.jpg       # Portfolio project preview
│       └── mern_dashboard.jpg  # MERN DevMetrics dashboard preview
├── src/
│   ├── components/
│   │   ├── About.jsx           # Bio, highlights, and personal essentials
│   │   ├── Contact.jsx         # Contact cards, copy buttons, and validated form
│   │   ├── Education.jsx       # Academic journey & verified certificates
│   │   ├── Experience.jsx      # Ypsilon IT Solutions internship timeline
│   │   ├── Footer.jsx          # Site footer & back-to-top button
│   │   ├── Hero.jsx            # Dynamic hero banner, typewriter, stats strip
│   │   ├── Navbar.jsx          # Frosted navbar, theme toggle, mobile drawer
│   │   ├── ProjectModal.jsx    # Deep-dive project case study modal
│   │   ├── Projects.jsx        # Project grid & category filters
│   │   ├── ResumeModal.jsx     # Printable structured CV viewer
│   │   ├── Skills.jsx          # Skill proficiency cards & interactive lab
│   │   ├── SocialIcons.jsx     # SVG icons for LinkedIn and GitHub
│   │   └── Toast.jsx           # Floating notification toast
│   ├── data/
│   │   └── portfolioData.js    # Data model for projects, skills, and bio
│   ├── App.css                 # Component styles, animations, responsive design
│   ├── App.jsx                 # App composition, theme state, and modal management
│   ├── index.css               # Design system tokens and global reset
│   └── main.jsx                # Application root entry
├── index.html                  # SEO meta tags, Google Fonts, and viewport setup
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started Locally

### 1. Install Dependencies
```powershell
npm install
```

### 2. Run the Development Server
```powershell
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your web browser.

### 3. Build for Production
```powershell
npm run build
```
The optimized production bundle will be generated in the `dist/` directory.

---

## 👤 Developer Profile

- **Name**: Pankaj Dixit
- **Role**: Full Stack Trainee & React Developer
- **Email**: [pankaj.dixit9070@gmail.com](mailto:pankaj.dixit9070@gmail.com)
- **Phone**: [+91 8962129815](tel:+918962129815)
- **LinkedIn**: [linkedin.com/in/pankaj-dixit-brahm](https://www.linkedin.com/in/pankaj-dixit-brahm)
- **Location**: Vishnupuri, Indore, Madhya Pradesh, India
