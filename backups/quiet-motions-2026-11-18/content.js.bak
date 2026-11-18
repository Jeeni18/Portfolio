import { Github, Linkedin } from 'lucide-react'

import dataScienceCert from '../assets/certificates/data-science.webp'
import MLCert from '../assets/certificates/ML-cert.webp'
import ML from '../assets/certificates/AI_ML.webp'

// The CV, bundled by Vite (hashed URL); `fileName` is what the download is saved as.
import cvPdf from '../assets/CV/Jeeni_Shrestha_CV.pdf'

// Project screenshots (Works panels)
import diagherShot from '../assets/hackathon/Diagher.png'
import revolvShot from '../assets/hackathon/Revolv.png'
import ferShot from '../assets/hackathon/FER System .png'
import chronovaShot from '../assets/hackathon/Chronova.png'

export const site = {
  name: 'Jeeni Shrestha',
  initials: 'JS',
  title: 'Jeeni Shrestha',
  description:
    "Jeeni Shrestha — Full-stack developer working toward AI engineering, with hackathon-tested AI projects from emotion recognition to gender-aware diagnosis support.",
}

// Top nav: about, skills, works, awards + CV and the contact button.
export const navLinks = [
  { label: 'about', href: '#about' },
  { label: 'skills', href: '#skills' },
  { label: 'works', href: '#projects' },
  { label: 'awards', href: '#awards' },
]

// Every section, in page order (mobile menu, active-link tracking).
export const sectionIndex = [
  { label: 'introduction', href: '#hero', number: '01' },
  { label: 'about', href: '#about', number: '02' },
  { label: 'skills', href: '#skills', number: '03' },
  { label: 'works', href: '#projects', number: '04' },
  { label: 'awards', href: '#awards', number: '05' },
  { label: 'education', href: '#education', number: '06' },
  { label: 'contact', href: '#contact', number: '07' },
]

export const hero = {
  locationLine: 'Kathmandu, Nepal — Open to full-stack & AI engineering roles',
  firstName: 'Jeeni',
  lastName: 'Shrestha.',
  roleLine: 'Full-Stack Developer',
  bio: 'Building reliable web applications and APIs with React, Next.js and Python, with hands-on AI/ML experience.',
  // Departure board (hero)
  board: {
    label: 'now showing',
    place: 'Kathmandu',
    role: 'Full-stack developer',
    field: 'AI / ML',
    stack: ['React', 'Next.js', 'Python'],
    status: 'open to roles',
    footnote: '4× hackathon winner',
    index: '01 / 07',
  },
  ctaPrimary: { label: 'view projects', href: '#projects' },
  ctaSecondary: { label: "let's connect" },
  availability: 'Open to full-stack & AI engineering roles',
  ctaDownload: { label: 'Download CV', href: cvPdf, fileName: 'Jeeni_Shrestha_CV.pdf' },
}

// 02 — About
export const about = {
  // Three lines from 1024px up; wraps naturally on smaller screens.
  statementLines: ['I build reliable, scalable', 'applications that solve', 'real-world problems.'],
  body: 'Computer Engineering graduate from Khwopa College of Engineering, working across frontend, backend, APIs and databases, alone and in teams, with a growing focus on applied AI/ML.',
  cvLabel: 'read the full cv',
  board: [
    { label: 'based in', value: 'Kathmandu, Nepal', variant: 'cream' },
    { label: 'degree', value: 'B.E. Computer Engineering', variant: 'dark' },
    { label: 'focus', value: 'full-stack · AI/ML', variant: 'dark' },
    { label: 'status', value: 'open to roles', variant: 'status' },
  ],
}

// 03 — Skills (from the CV)
export const skills = [
  { category: 'programming', items: ['Python', 'JavaScript', 'TypeScript', 'C++', 'C'] },
  { category: 'frontend', items: ['React', 'Next.js', 'HTML', 'CSS'] },
  { category: 'backend & apis', items: ['FastAPI', 'Node.js', 'REST APIs', 'API integration'] },
  { category: 'databases', items: ['PostgreSQL', 'MySQL', 'SQL'] },
  { category: 'testing', items: ['pytest', 'Postman'] },
  { category: 'tools', items: ['Git', 'GitLab', 'Docker', 'Jupyter', 'VS Code'] },
]

// 04 — Works. Every project from the previous site. `status` only where
// the CV / site states a fact; otherwise the row shows an outline "view".
// `image`: screenshot (null shows a placeholder); `live`: the project's
// website ("view live demo"); `code`: its GitHub repo ("github").
export const projects = [
  {
    number: '01',
    name: 'DiagHer',
    tagline: 'AI-powered clinical decision support.',
    stack: ['Flask', 'React', 'TS', 'sklearn'],
    status: 'top 16', // Shequal Foundation's all-female hackathon, 2025
    bullets: [
      'gender-aware diagnostic insights',
      'versioned Flask API, 12 endpoints',
      '22 conditions from 97 symptoms',
    ],
    image: diagherShot,
    live: 'https://diag-her-ai-e2nz.vercel.app/',
    code: 'https://github.com/Jeeni18/DiagHer-AI',
    // The system workflow (click a step for what it does).
    workflow: [
      {
        id: 'frontend',
        label: 'React + TypeScript',
        title: 'Frontend',
        explanation:
          'Pages for symptom input, diagnosis results with charts (Recharts) and drug side-effect analysis. Sends JSON to the API and shows clear errors when something fails.',
        code: 'fetch("/api/v1/diagnosis", { method: "POST" })',
      },
      {
        id: 'api',
        label: 'Flask REST API',
        title: 'REST API (12 versioned endpoints)',
        explanation:
          'Every request is validated before it reaches the model. Errors come back in one standard format, rate limiting protects the service, and logging plus a /health endpoint make debugging easier.',
        code: 'POST /api/v1/diagnosis -> 200 { "top_conditions": [...] }',
        default: true,
      },
      {
        id: 'ml',
        label: 'Scikit-learn models',
        title: 'Machine learning',
        explanation:
          'Random Forest and Logistic Regression were compared; the model predicts 22 conditions from 97 symptom features. It is loaded once and served through the API.',
        code: 'model.predict_proba(features)  # 22 classes',
      },
    ],
  },
  {
    number: '02',
    name: 'Revolv',
    tagline: 'Digital growth platform for small businesses.',
    stack: ['Flask', 'React', 'Axios', 'sklearn'],
    status: "people's choice", // CodeYatra Hackathon, 2025
    bullets: [
      'recommends digital tools from a business-profile questionnaire',
      'Flask API serving a Random Forest model',
      'QR codes, job posting and listings',
    ],
    image: revolvShot,
    live: 'https://revolv-self.vercel.app/',
    code: 'https://github.com/Jeeni18/Revolv',
  },
  {
    number: '03',
    name: 'FER',
    tagline: 'Facial expression recognition with CNNs.',
    stack: ['Python', 'React', 'ML'],
    status: null,
    bullets: [
      'compared VGG19, DenseNet-121, ResNet18, ResNet50',
      'face detection, preprocessing, augmentation',
      'real-time emotion recognition interface',
    ],
    image: ferShot,
    live: null,
    code: 'https://github.com/Jeeni18/Facial-Expression-Recognition-System-FER',
  },
  {
    number: '04',
    name: 'Chronova',
    tagline: "AR storytelling at Nepal's historical sites.",
    stack: ['React Native', 'Python', 'ML'],
    status: 'winner', // HackTheCircle, 2025
    bullets: [
      'built for HackTheCircle',
      'real-time personalization and storytelling in AR',
      'React Native app, Python/ML backend',
    ],
    image: chronovaShot,
    live: null,
    code: 'https://github.com/Jeeni18/Chronova',
  },
]

// 05 — Awards. `win` = burgundy result blade. Links: certificates from the
// previous site (the same as in the CV).
export const awards = {
  hackathonsWon: '4',
  items: [
    { year: '2025', event: 'Hack4SafeFood', result: 'winner', win: true, link: 'https://drive.google.com/file/d/11ZebDYPQxgVnsRm4kQnLj1H4X9bQC1GP/view?usp=sharing' },
    { year: '2025', event: 'HackTheCircle', result: 'winner', win: true, link: 'https://drive.google.com/file/d/1WFoeC9w77ENXA6zz2ppfxMgq0bJSwh24/view?usp=sharing' },
    { year: '2025', event: 'DeerHack · ed-tech category', result: 'winner', win: true, link: 'https://drive.google.com/file/d/11T8k8LCvDc2KE2P-JZ38TpMEJFcDxDrw/view?usp=sharing' },
    { year: '2025', event: 'CodeYatra', result: "people's choice", win: true, link: 'https://drive.google.com/file/d/11ZfLULkGij1dKI3AXDKrcM39bD_l-9O4/view?usp=sharing' },
    { year: '2026', event: 'Khwopa CEEL', result: 'best poster', win: false, link: null },
    { year: '2024', event: 'Hult Prize · on-campus', result: 'winner', win: false, link: 'https://drive.google.com/file/d/1fLbW1nDikEGQ-18Xuqc5044vFe31RYoW/view?usp=sharing' },
  ],
  also: [
    { text: "finalist, Hacking for a Carbon-Neutral Future (Shequal & UNESCO) '26", link: null },
    { text: "finalist, IEEE Climate Tech Idea Pitch '24", link: 'https://drive.google.com/file/d/1f9N-uWpvE1-q1bs3mzkV2hKIctsqh2G2/view?usp=sharing' },
    { text: "top 16, Shequal Nepal's largest all-female hackathon '25", link: 'https://drive.google.com/file/d/11Uv7My8LcxcLhSACKUKTlPWzYBQe9Dzi/view?usp=sharing' },
  ],
}

// 06 — Education
export const education = {
  rows: [
    { years: '2022–2026', institution: 'Khwopa College of Engineering', programme: 'B.E. Computer Engineering', status: 'graduated', highlight: true },
    { years: '2019–2022', institution: "St. Xavier's College", programme: 'High school', status: 'completed', highlight: false },
  ],
}

// Training cards. `certId` opens the certificate image (CertModal).
export const training = [
  { title: 'Annual Nepal AI School (ANAIS)', meta: '2024 · 69 hrs', line: 'deep learning to LLMs and RL', certId: 2 },
  { title: 'Data Science with Python', meta: 'specialization · 70 hrs', line: 'analysis and data processing', certId: 1 },
  { title: 'AI/ML workshop', meta: 'industry-led sessions', line: 'ML and computer vision', certId: 3 },
]

export const certifications = {
  items: [
    {
      id: 1,
      title: 'Data Science with Python',
      org: 'Specialization Program',
      year: '2024',
      description: '70-hour program in Python-based data analysis, data processing, and data-driven problem solving.',
      image: dataScienceCert,
      initials: 'DS',
    },
    {
      id: 2,
      title: 'Annual Nepal AI School (ANAIS)',
      org: 'NAAMII',
      year: '2024',
      description: '69-hour intensive on deep learning, GNNs, graph transformers, foundation models, VLMs, LLMs, and RL, with hands-on labs and an AI hackathon.',
      image: MLCert,
      initials: 'AI',
    },
    {
      id: 3,
      title: 'AI/ML Workshop',
      org: 'Industry-led sessions',
      year: '2024',
      description: 'Practical exposure to AI, machine learning, and computer vision led by industry professionals.',
      image: ML,
      initials: 'ML',
    },
  ],
}

// 07 — Contact
export const contactBoard = {
  heading: "Let's build something.",
  email: 'jenyshrestha31@gmail.com',
  location: 'Kathmandu, Nepal · UTC+5:45',
}

export const footer = {
  credit: 'Designed and built by Jeeni Shrestha · Kathmandu, Nepal · 2026',
  links: ['#about', '#skills', '#projects', '#awards', '#education', '#contact'],
}

export const socials = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/Jeeni18' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/jeeni-shrestha-a041912b5/' },
]

// Contact form (the chat button's dialog)
export const contact = {
  heading: "Let's Work Together",
  subtext: "I'll get back to you within 24 hours.",
}
