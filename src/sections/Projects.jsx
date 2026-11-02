import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Github, ArrowUpRight } from 'lucide-react'
import SectionWrapper, { SectionTitle } from '../components/SectionWrapper'

const projects = [
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
]

function ProjectCard({ project, index }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="card rounded-md p-7"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="font-mono text-[10px] text-rust-500 tracking-wide uppercase mb-1.5">
            {project.tagline}
          </p>
          <h3 className="font-display font-semibold text-xl text-ink-100">
            {project.name}
          </h3>
        </div>
        {project.featured && (
          <span className="text-[9px] font-mono px-2 py-1 border border-ink-700 text-ink-500 uppercase tracking-wide">
            Featured
          </span>
        )}
      </div>

      <p className="font-body text-ink-400 text-sm leading-relaxed mb-6">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-6">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="font-mono text-[10px] px-2.5 py-1 bg-ink-900 text-ink-500 border border-ink-800"
          >
            {tech}
          </span>
        ))}
      </div>

      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 font-mono text-xs text-ink-500 hover:text-ink-100 transition-colors duration-200 group/link"
      >
        <Github size={13} />
        <span>View on GitHub</span>
        <ArrowUpRight size={11} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
      </a>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <SectionWrapper id="projects">
      <SectionTitle
        title="Projects"
        subtitle="What I build when nobody's paying me to — mostly AI."
      />

      <div className="grid md:grid-cols-2 gap-5">
        {projects.map((project, i) => (
          <ProjectCard key={project.name} project={project} index={i} />
        ))}
      </div>
    </SectionWrapper>
  )
}
