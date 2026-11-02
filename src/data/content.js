import {
  Brain, Trophy, Star, Code2, Network, Github, Linkedin,
  Braces, FileType2, FileCode2, FileCode, Atom, Layers, Globe, Palette, Wind,
  Server, FlaskConical, Workflow, Component, Database, Table2, Table,
  TestTube2, Send, BrainCircuit, Sigma, GitBranch, Gitlab, Container,
  AppWindow, Notebook,
} from 'lucide-react'

import jeeniPhoto from '../assets/me/jeeni.jpg'

import Hack4SafeFood from '../assets/achievements/Hack4SafeFood_certificate.jpg'
import Hultprize from '../assets/achievements/hultprize.png'
import IEEE from '../assets/achievements/Ecoflare.png'
import Deerhack from '../assets/achievements/DeerHack_certificate.jpg'
import Codeyatra from '../assets/achievements/Codeyatra.png'
import Shequal from '../assets/achievements/Shequal_certificate.jpg'
import Hackthecircle from '../assets/achievements/hackthecircle.png'

import dataScienceCert from '../assets/certificates/data-science.jpg'
import MLCert from '../assets/certificates/ML-cert.png'
import ML from '../assets/certificates/AI_ML.jpg'

export const site = {
  name: 'Jeeni Shrestha',
  initials: 'JS',
  title: 'Jeeni Shrestha',
  description:
    "Jeeni Shrestha — Full-stack developer working toward AI engineering, with hackathon-tested AI projects from emotion recognition to gender-aware diagnosis support.",
}

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#techstack' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Education', href: '#education' },
]

export const hero = {
  photo: jeeniPhoto,
  locationLine: 'Bhaktapur, Nepal — Open to full-stack & AI engineering roles',
  firstName: 'Jeeni',
  lastName: 'Shrestha.',
  roleLine: 'Full-Stack Developer',
  bio: 'Building reliable web applications and APIs with React, Next.js and Python, with hands-on AI/ML experience.',
  ctaPrimary: { label: 'View Projects', href: '#projects' },
  ctaSecondary: { label: "Let's Connect" },
  ctaDownload: { label: 'Download CV', href: '/Jeeni_Shrestha_CV.pdf' },
}

export const about = {
  sectionTitle: 'About',
  paragraphs: [
    "I'm a Computer Engineering graduate from Khwopa College of Engineering and a full-stack developer at Cloud Himalaya. I build web applications with React, Next.js and Python backends, design REST APIs with proper validation and error handling, and integrate machine learning where it adds real value.",
    "Hackathons taught me to ship working software under tight deadlines and work closely in teams. I'm especially interested in building reliable, well-documented software for public services in Nepal.",
  ],
  highlights: [
    { icon: Code2, label: 'Full-Stack Developer', desc: 'React, Next.js, Python' },
    { icon: Network, label: 'REST APIs & Integration', desc: 'Validation & error handling' },
    { icon: Brain, label: 'AI/ML Experience', desc: 'Scikit-learn, TensorFlow' },
    { icon: Trophy, label: '6 Awards Won', desc: 'Hackathons since 2025' },
  ],
}

export const education = {
  sectionTitle: 'Education & Training',
  sectionSubtitle: 'Degrees first, then courses and programs completed outside the classroom.',
  entries: [
    {
      degree: "Bachelor's in Computer Engineering",
      org: 'Khwopa College of Engineering, Bhaktapur',
      period: '2022 – 2026',
    },
    {
      degree: '+2 Science',
      org: "St. Xavier's College, Kathmandu",
      period: '2019 – 2022',
    },
  ],
}

export const experience = {
  items: [
    {
      role: 'Full-Stack Developer',
      org: 'Cloud Himalaya Pvt. Ltd.',
      period: '[TODO: start month/year] – Present',
      tech: ['Next.js', 'React', 'TypeScript', 'Payload CMS', 'PostgreSQL'],
      bullets: [
        'Built the company website with an integrated CMS, letting non-technical staff update content without code changes.',
        'Designed the site architecture and developed both frontend and backend, including PostgreSQL database integration.',
      ],
    },
    {
      role: 'Web Developer (Volunteer)',
      org: 'AWS Cloud Club TU',
      period: '[TODO: start – end month/year]',
      tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Zod', 'Docker'],
      bullets: [
        "Developed and maintained the club's official website with responsive layouts and reusable UI components.",
        'Implemented form validation using React Hook Form and Zod.',
        'Containerized the application with Docker and collaborated through Git.',
      ],
    },
  ],
}

export const leadership = {
  items: [
    {
      role: 'College Representative',
      org: 'AWS Cloud Club TU',
      period: '2025',
      description: 'Facilitated cloud computing workshops, coordinated community events and connected students with industry.',
    },
    {
      role: 'Campus Ambassador',
      org: 'LOCUS',
      period: '2025',
      description: 'Promoted tech initiatives, organized student events and built engagement across campus.',
    },
  ],
}

export const techStack = {
  sectionSubtitle: 'Tools I reach for when something needs building.',
  categories: [
    {
      name: 'Programming',
      skills: [
        { name: 'Python', icon: Code2 },
        { name: 'JavaScript', icon: Braces },
        { name: 'TypeScript', icon: FileType2 },
        { name: 'C++', icon: FileCode2 },
        { name: 'C', icon: FileCode },
      ],
    },
    {
      name: 'Frontend',
      skills: [
        { name: 'React.js', icon: Atom },
        { name: 'Next.js', icon: Layers },
        { name: 'HTML', icon: Globe },
        { name: 'CSS', icon: Palette },
        { name: 'Tailwind CSS', icon: Wind },
      ],
    },
    {
      name: 'Backend & APIs',
      skills: [
        { name: 'FastAPI', icon: Server },
        { name: 'Flask', icon: FlaskConical },
        { name: 'Node.js', icon: Workflow },
        { name: 'REST APIs', icon: Network },
        { name: 'API Integration', icon: Component },
      ],
    },
    {
      name: 'Databases',
      skills: [
        { name: 'PostgreSQL', icon: Database },
        { name: 'MySQL', icon: Table2 },
        { name: 'SQL', icon: Table },
      ],
    },
    {
      name: 'Testing & Debugging',
      skills: [
        { name: 'pytest', icon: TestTube2 },
        { name: 'Postman', icon: Send },
      ],
    },
    {
      name: 'AI/ML',
      skills: [
        { name: 'TensorFlow', icon: BrainCircuit },
        { name: 'Scikit-learn', icon: Brain },
        { name: 'Pandas', icon: Table },
        { name: 'NumPy', icon: Sigma },
      ],
    },
    {
      name: 'Tools',
      skills: [
        { name: 'Git', icon: GitBranch },
        { name: 'GitHub', icon: Github },
        { name: 'GitLab', icon: Gitlab },
        { name: 'Docker', icon: Container },
        { name: 'VS Code', icon: AppWindow },
        { name: 'Jupyter Notebook', icon: Notebook },
      ],
    },
  ],
}

export const projects = {
  sectionSubtitle: 'Full-stack builds with APIs, integration and data underneath.',
  items: [
    {
      number: '01',
      name: 'DiagHer',
      tagline: 'AI-Powered Clinical Decision Support System',
      badge: "Top 16 – Nepal's Largest All-Female Hackathon (2025)",
      description:
        "Built a full-stack platform that gives gender-aware diagnostic insights; Top 16 at Nepal's largest all-female hackathon (2025).",
      bullets: [
        'Developed a versioned Flask REST API (12 endpoints) with request validation, error handling and rate limiting, integrated with a React + TypeScript frontend.',
        'Integrated Scikit-learn models predicting 22 conditions from 97 symptom features.',
      ],
      stack: ['Flask', 'REST APIs', 'React', 'TypeScript', 'Scikit-learn'],
      github: 'https://github.com/Jeeni18/DiagHer-AI',
      featured: true,
    },
    {
      number: '02',
      name: 'Revolv',
      tagline: 'Digital Growth Platform for Small Businesses',
      description:
        'Built a web platform that recommends digital tools to small businesses based on a business-profile questionnaire.',
      bullets: [
        'Developed a Flask prediction API serving a Random Forest model and integrated it with a React frontend through Axios.',
        'Built QR code generation and job posting and listing features.',
      ],
      stack: ['Flask', 'REST APIs', 'React', 'Axios', 'Scikit-learn'],
      github: 'https://github.com/Jeeni18/Revolv',
    },
    {
      number: '03',
      name: 'FER',
      tagline: 'Facial Expression Recognition',
      description:
        'CNN-based system that classifies human emotion from facial images.',
      bullets: [
        'Trained and compared four CNN architectures — VGG19, DenseNet-121, ResNet18, ResNet50 — to find the best-performing model.',
        'Built the face detection and preprocessing pipeline, including data augmentation to improve accuracy and robustness.',
        'Integrated the trained model into a real-time interface for live emotion recognition.',
      ],
      stack: ['Python', 'React', 'ML', 'Data Analysis'],
      github: 'https://github.com/Jeeni18/Facial-Expression-Recognition-System-FER',
    },
    {
      number: '04',
      name: 'Chronova',
      tagline: 'AR tourism app',
      description:
        "AR app built for Hack the Circle that layers real-time personalization and storytelling onto Nepal's historical sites.",
      bullets: [
        'Layered real-time personalization and cultural storytelling onto physical sites via AR, instead of a static plaque or brochure.',
        'Built with React Native on the frontend and a Python/ML backend driving the personalization.',
      ],
      stack: ['React Native', 'Python', 'ML'],
      github: 'https://github.com/Jeeni18/Chronova',
    },
    {
      number: '05',
      name: 'Lumen',
      tagline: 'Anti-doomscrolling app',
      description:
        'Behavioral-tech app that notices when scrolling turns mindless and interrupts the pattern.',
      bullets: [
        'Built a behavior-detection model in Python to recognize mindless scrolling patterns rather than just tracking screen time.',
        'React Native app that nudges the user mid-scroll instead of showing a passive end-of-day report.',
      ],
      stack: ['React Native', 'Python', 'Behavior ML'],
      github: 'https://github.com/jeenishrestha',
    },
  ],
}

export const achievements = {
  sectionSubtitle: 'Wins first, then finalist and ranked stages.',
  items: [
    // -- Wins --
    {
      icon: Trophy,
      title: 'Winner — Hack4SafeFood',
      project: 'Project: Aahar',
      description: 'Won the national-level hackathon with a food safety app.',
      year: '2025',
      image: Hack4SafeFood,
      badge: 'Winner',
      link: 'https://drive.google.com/file/d/11ZebDYPQxgVnsRm4kQnLj1H4X9bQC1GP/view?usp=sharing',
    },
    {
      icon: Trophy,
      title: 'Winner — HackTheCircle',
      project: 'Project: Chronova',
      description: 'Won with an AR app that brings Nepali history to life on-site.',
      year: '2025',
      image: Hackthecircle,
      badge: 'Winner',
      link: 'https://drive.google.com/file/d/1WFoeC9w77ENXA6zz2ppfxMgq0bJSwh24/view?usp=sharing',
    },
    {
      icon: Trophy,
      title: 'Ed-Tech Category Winner — DeerHack',
      project: 'Project: Histoury',
      description: 'Won the Ed-Tech track with Histoury.',
      year: '2025',
      image: Deerhack,
      badge: 'Winner',
      link: 'https://drive.google.com/file/d/11T8k8LCvDc2KE2P-JZ38TpMEJFcDxDrw/view?usp=sharing',
    },
    {
      icon: Trophy,
      title: "People's Choice Award — CodeYatra",
      project: 'Project: Revolv',
      description: "Won People's Choice with Revolv.",
      year: '2025',
      image: Codeyatra,
      badge: 'Winner',
      link: 'https://drive.google.com/file/d/11ZfLULkGij1dKI3AXDKrcM39bD_l-9O4/view?usp=sharing',
    },
    {
      icon: Trophy,
      title: 'Best Poster Award — Khwopa CEEL',
      project: 'Final-year research poster',
      description: 'Awarded best poster at the Khwopa Center for Engineering Education & Learning showcase.',
      year: '2026',
      image: null,
      badge: 'Winner',
      link: null,
    },
    {
      icon: Trophy,
      title: 'On-Campus Winner — Hult Prize',
      project: 'Project: NOOK',
      description: 'Won the campus round with a social-impact business concept.',
      year: '2024',
      image: Hultprize,
      badge: 'Winner',
      link: 'https://drive.google.com/file/d/1fLbW1nDikEGQ-18Xuqc5044vFe31RYoW/view?usp=sharing',
    },
    // -- Finalist / ranked (newest first) --
    {
      icon: Star,
      title: 'Finalist — Hacking for a Carbon-Neutral Future',
      project: 'Shequal & UNESCO',
      description: 'Reached the finals of a climate-focused hackathon run with UNESCO.',
      year: '2026',
      image: null,
      badge: 'Finalist',
      link: null,
    },
    {
      icon: Star,
      title: "Top 16 — SheQual Foundation's All-Female Hackathon",
      project: 'Project: DiagHer',
      description: 'Reached the Top 16 with DiagHer, a gender-aware diagnosis support tool.',
      image: Shequal,
      year: '2025',
      badge: 'Top 16',
      link: 'https://drive.google.com/file/d/11Uv7My8LcxcLhSACKUKTlPWzYBQe9Dzi/view?usp=sharing',
    },
    {
      icon: Star,
      title: 'Finalist — IEEE Climate Tech Idea Pitch',
      project: 'Project: Ecoflare',
      description: 'Reached the finals of the IEEE WIE climate technology pitch competition.',
      year: '2024',
      image: IEEE,
      badge: 'Finalist',
      link: 'https://drive.google.com/file/d/1f9N-uWpvE1-q1bs3mzkV2hKIctsqh2G2/view?usp=sharing',
    },
  ],
}

export const certifications = {
  sectionSubtitle: 'Courses and programs completed outside the classroom.',
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

export const footer = {
  tagline: 'Full-stack by day, AI by obsession',
}

export const socials = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/Jeeni18' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/jeeni-shrestha-a041912b5/' },
]

export const contact = {
  heading: "Let's Work Together",
  subtext: "I'll get back to you within 24 hours.",
}
