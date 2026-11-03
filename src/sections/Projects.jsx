import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Github, ArrowUpRight, ExternalLink } from 'lucide-react'
import SectionWrapper, { SectionTitle } from '../components/SectionWrapper'
import ArchitectureDiagram from '../components/ArchitectureDiagram'
import { projects, projectFilters } from '../data/content'

function ProjectCard({ project, index }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <motion.div
      layout
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, delay: inView ? index * 0.06 : 0 }}
      className={`card p-7 ${project.featured ? 'md:col-span-2 card-featured' : ''}`}
    >
      <div className="flex items-start justify-between mb-4 gap-4">
        <div>
          <p className="font-mono text-xs text-plum/60 tracking-wide uppercase mb-1.5">
            {project.tagline}
          </p>
          <h3 className="font-display text-2xl text-plum">
            {project.name}
          </h3>
        </div>
        {project.badge ? (
          <span className="tag text-right flex-shrink-0">
            {project.badge}
          </span>
        ) : project.featured && (
          <span className="tag">
            Featured
          </span>
        )}
      </div>

      <p className="font-body text-plum/85 text-[15px] leading-relaxed mb-6">
        {project.description}
      </p>

      {project.bullets && (
        <ul className="mb-6 space-y-1.5">
          {project.bullets.map((b, i) => (
            <li key={i} className="font-body text-plum/85 text-[15px] leading-relaxed pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-plum/40">
              {b}
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap gap-1.5 mb-6">
        {project.stack.map((tech) => (
          <span key={tech} className="tag-chip">
            {tech}
          </span>
        ))}
      </div>

      {project.name === 'DiagHer' && <ArchitectureDiagram />}

      <div className="flex items-center gap-5 mt-6">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-xs text-plum/70 hover:text-plum transition-colors duration-200 group/link"
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
            className="inline-flex items-center gap-2 font-mono text-xs text-plum/70 hover:text-plum transition-colors duration-200 group/link"
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
  const [filter, setFilter] = useState('all')

  const visibleProjects = useMemo(() => {
    if (filter === 'all') return projects.items
    return projects.items.filter((p) => p.categories?.includes(filter))
  }, [filter])

  return (
    <SectionWrapper id="projects">
      <SectionTitle
        apiLabel="GET /projects"
        title="Projects"
        subtitle={projects.sectionSubtitle}
      />

      <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter projects by category">
        {projectFilters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            aria-pressed={filter === f.id}
            className={`font-mono text-xs px-4 py-2 rounded-full border-2 border-plum transition-colors duration-150 ${
              filter === f.id ? 'bg-plum text-cream' : 'bg-transparent text-plum hover:bg-plum/10'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <motion.div layout className="grid md:grid-cols-2 gap-5">
        <AnimatePresence mode="popLayout">
          {visibleProjects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>
    </SectionWrapper>
  )
}
