import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Github, ArrowUpRight, ExternalLink } from 'lucide-react'
import SectionWrapper, { SectionTitle } from '../components/SectionWrapper'
import { projects } from '../data/content'

function ProjectCard({ project, index }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`card rounded-md p-7 ${project.featured ? 'md:col-span-2' : ''}`}
      style={project.featured ? { borderColor: 'rgba(217, 130, 63, 0.4)' } : undefined}
    >
      <div className="flex items-start justify-between mb-4 gap-4">
        <div>
          <p className="font-mono text-[10px] text-rust-500 tracking-wide uppercase mb-1.5">
            {project.tagline}
          </p>
          <h3 className="font-display font-semibold text-xl text-ink-100">
            {project.name}
          </h3>
        </div>
        {project.badge ? (
          <span className="text-[9px] font-mono px-2 py-1 border border-rust-500/50 text-rust-500 uppercase tracking-wide text-right flex-shrink-0">
            {project.badge}
          </span>
        ) : project.featured && (
          <span className="text-[9px] font-mono px-2 py-1 border border-ink-700 text-ink-500 uppercase tracking-wide">
            Featured
          </span>
        )}
      </div>

      <p className="font-body text-ink-400 text-sm leading-relaxed mb-6">
        {project.description}
      </p>

      {project.bullets && (
        <ul className="mb-6 space-y-1.5">
          {project.bullets.map((b, i) => (
            <li key={i} className="font-body text-ink-400 text-sm leading-relaxed pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-ink-600">
              {b}
            </li>
          ))}
        </ul>
      )}

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

      <div className="flex items-center gap-5">
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
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs text-ink-500 hover:text-rust-500 transition-colors duration-200 group/link"
          >
            <ExternalLink size={13} />
            <span>Live</span>
          </a>
        )}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <SectionWrapper id="projects">
      <SectionTitle
        title="Projects"
        subtitle={projects.sectionSubtitle}
      />

      <div className="grid md:grid-cols-2 gap-5">
        {projects.items.map((project, i) => (
          <ProjectCard key={project.name} project={project} index={i} />
        ))}
      </div>
    </SectionWrapper>
  )
}
