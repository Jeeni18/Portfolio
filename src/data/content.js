import { Brain, Trophy, Star, Code2, Network, Github, Linkedin } from 'lucide-react'

import jeeniPhoto from '../assets/me/jeeni.jpg'

import cplus from '../assets/techStack/c++.png'
import python from '../assets/techStack/python.png'
import c from '../assets/techStack/c.png'
import java from '../assets/techStack/java.png'

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

export const techStack = {
  sectionSubtitle: 'Tools I reach for when something needs building.',
  categories: [
    {
      name: 'Programming',
      skills: [
        { name: 'Python', img: python },
        { name: 'C', img: c },
        { name: 'C++', img: cplus },
        { name: 'Java', img: java },
      ],
    },
    {
      name: 'AI / Data',
      skills: [
        { name: 'Pandas', icon: '🐼' },
        { name: 'NumPy', icon: '🔢' },
        { name: 'Scikit-learn', icon: '🤖' },
      ],
    },
    {
      name: 'Web',
      skills: [
        { name: 'React', icon: '⚛️' },
        { name: 'HTML', icon: '🌐' },
        { name: 'CSS', icon: '🎨' },
        { name: 'Tailwind CSS', icon: '💨' },
      ],
    },
    {
      name: 'Tools',
      skills: [
        { name: 'Git', icon: '🌿' },
        { name: 'GitHub', icon: '🐙' },
      ],
    },
  ],
}

export const projects = {
  sectionSubtitle: "What I build when nobody's paying me to — mostly AI.",
  items: [
    {
      number: '01',
      name: 'FER',
      tagline: 'Facial Expression Recognition',
      description:
        "Four CNN architectures — VGG19, DenseNet-121, ResNet18, ResNet50 — trained on FER2013 to read emotion from faces. The hard part wasn't the model, it was getting face detection and preprocessing solid enough that accuracy held up outside the dataset.",
      stack: ['Python', 'React', 'ML', 'Data Analysis'],
      github: 'https://github.com/Jeeni18/Facial-Expression-Recognition-System-FER',
      featured: true,
    },
    {
      number: '02',
      name: 'DiagHer',
      tagline: 'Gender-aware diagnosis support',
      description:
        "Built for SheQual, Nepal's largest all-female hackathon — Top 16 out of the field. DiagHer flags where a patient's symptoms are being read through a male-default lens and surfaces what might be getting missed.",
      stack: ['Python', 'React', 'ML', 'Data Analysis'],
      github: 'https://github.com/Jeeni18/DiagHer-AI',
      featured: true,
    },
    {
      number: '03',
      name: 'Chronova',
      tagline: 'AR tourism app',
      description:
        "An AR app built for Hack the Circle that layers real-time personalization and cultural storytelling onto Nepal's old stories, so a historical site tells you something instead of just sitting there.",
      stack: ['React Native', 'Python', 'ML'],
      github: 'https://github.com/Jeeni18/Chronova',
    },
    {
      number: '04',
      name: 'Revolv',
      tagline: 'Digital tooling for small businesses',
      description:
        "Most small businesses in Nepal can't afford a dev team to go digital. Revolv looks at what a given business actually needs — QR ordering, a webpage, social scheduling — and recommends that, instead of handing over a generic toolkit.",
      stack: ['React Native', 'Python', 'ML'],
      github: 'https://github.com/Jeeni18/Revolv',
    },
    {
      number: '05',
      name: 'Lumen',
      tagline: 'Anti-doomscrolling app',
      description:
        'A behavioral-tech app that notices when scrolling turns mindless and interrupts the pattern, instead of just logging screen-time numbers nobody looks at.',
      stack: ['React Native', 'Python', 'Behavior ML'],
      github: 'https://github.com/jeenishrestha',
    },
  ],
}

export const achievements = {
  sectionSubtitle: 'Competitions won, stages reached, since 2024.',
  items: [
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
      title: 'Winner — Hack the Circle',
      project: 'Project: Chronova',
      description: 'Won with an AR app that brings Nepali history to life on-site.',
      year: '2025',
      image: Hackthecircle,
      badge: 'Winner',
      link: 'https://drive.google.com/file/d/1WFoeC9w77ENXA6zz2ppfxMgq0bJSwh24/view?usp=sharing',
    },
    {
      icon: Trophy,
      title: 'Ed-Tech Winner — DeerHack',
      project: 'Project: Histoury',
      description: 'Won the Ed-Tech track with Histoury.',
      year: '2025',
      image: Deerhack,
      badge: 'Winner',
      link: 'https://drive.google.com/file/d/11T8k8LCvDc2KE2P-JZ38TpMEJFcDxDrw/view?usp=sharing',
    },
    {
      icon: Trophy,
      title: 'Winner — Hult Prize On-Campus',
      project: 'Project: NOOK',
      description: 'Won the campus round with a social-impact business concept.',
      year: '2024',
      image: Hultprize,
      badge: 'Winner',
      link: 'https://drive.google.com/file/d/1fLbW1nDikEGQ-18Xuqc5044vFe31RYoW/view?usp=sharing',
    },
    {
      icon: Star,
      title: "People's Choice Award — CodeYatra",
      project: 'Project: Revolv',
      description: "Won People's Choice with Revolv.",
      year: '2024',
      image: Codeyatra,
      badge: 'Winner',
      link: 'https://drive.google.com/file/d/11ZfLULkGij1dKI3AXDKrcM39bD_l-9O4/view?usp=sharing',
    },
    {
      icon: Star,
      title: 'Best Poster Award — Khwopa CEEL',
      project: 'Final-year research poster',
      description: 'Awarded best poster at the Khwopa Center for Engineering Education & Learning showcase.',
      year: '2026',
      image: null,
      badge: 'Winner',
      link: null,
    },
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
      title: "Top 16 — SheQual, Nepal's Largest All-Female Hackathon",
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
