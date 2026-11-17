import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Github, ArrowUpRight, ExternalLink } from 'lucide-react'
import SectionWrapper, { SectionTitle } from '../components/SectionWrapper'
import ArchitectureDiagram from '../components/ArchitectureDiagram'
import { projects, projectFilters } from '../data/content'

function ProjectLinks({ project }) {
  return (
    <div className="flex items-center gap-6 mt-6">
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-ink/70 hover:text-ink transition-colors duration-200 group/link"
      >
        <Github size={13} strokeWidth={1.5} />
        <span className="border-b border-ink/30 group-hover/link:border-ink pb-0.5">GitHub</span>
        <ArrowUpRight size={11} className="opacity-50 group-hover/link:opacity-100 transition-opacity" />
      </a>
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-ink/70 hover:text-ink transition-colors duration-200 group/link"
        >
          <ExternalLink size={13} strokeWidth={1.5} />
          <span className="border-b border-ink/30 group-hover/link:border-ink pb-0.5">Live</span>
        </a>
      )}
    </div>
  )
}

function Bullets({ items, size = 'text-[15px]' }) {
  if (!items) return null
  return (
    <ul className="mb-6 space-y-1.5">
      {items.map((b, i) => (
        <li key={i} className={`font-body text-ink/80 ${size} leading-relaxed pl-5 relative before:content-['—'] before:absolute before:left-0 before:text-rose`}>
          {b}
        </li>
      ))}
    </ul>
  )
}

function Stack({ items }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((tech) => (
        <span key={tech} className="tag-chip">
          {tech}
        </span>
      ))}
    </div>
  )
}

function FeaturedCard({ project, index }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <motion.article
      layout
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, delay: inView ? index * 0.05 : 0 }}
      className="md:col-span-2 card shadow-soft p-7 md:p-10"
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-rose">Featured</span>
        <span className="h-px w-8 bg-ink/25" aria-hidden="true" />
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/60">{project.tagline}</span>
        {project.badge && <span className="tag ml-auto">{project.badge}</span>}
      </div>

      <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-6 md:gap-12 mb-2">
        <h3 className="font-display text-ink leading-[1] tracking-tight" style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)' }}>
          {project.name}
        </h3>
        <div>
          <p className="font-body text-ink/85 text-[16px] leading-relaxed mb-5">
            {project.description}
          </p>
          <Bullets items={project.bullets} />
          <Stack items={project.stack} />
        </div>
      </div>

      <ArchitectureDiagram />

      <ProjectLinks project={project} />
    </motion.article>
  )
}

function IndexCard({ project, index }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <motion.article
      layout
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, delay: inView ? index * 0.05 : 0 }}
      className="border-t border-ink/20 pt-7 pb-4"
    >
      <div className="flex items-baseline justify-between gap-4 mb-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-rose">{project.tagline}</span>
        <span className="font-mono text-[11px] text-ink/40">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <h3 className="font-display text-3xl text-ink leading-tight mb-4">
        {project.name}
      </h3>

      <p className="font-body text-ink/80 text-[15px] leading-relaxed mb-5">
        {project.description}
      </p>

      <Bullets items={project.bullets} size="text-sm" />
      <Stack items={project.stack} />
      <ProjectLinks project={project} />
    </motion.article>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('all')

  const visibleProjects = useMemo(() => {
    if (filter === 'all') return projects.items
    return projects.items.filter((p) => p.categories?.includes(filter))
  }, [filter])

  return (
    <SectionWrapper id="projects" tone="light">
      <SectionTitle
        index="04"
        apiLabel="GET /projects"
        title="*Selected* Projects"
        subtitle={projects.sectionSubtitle}
      />

      <div className="flex flex-wrap gap-x-7 gap-y-3 mb-12" role="group" aria-label="Filter projects by category">
        {projectFilters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            aria-pressed={filter === f.id}
            className={`font-mono text-[11px] uppercase tracking-[0.14em] pb-1.5 border-b transition-colors duration-150 ${
              filter === f.id ? 'text-ink border-wine' : 'text-ink/55 border-transparent hover:text-ink'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        <AnimatePresence mode="popLayout">
          {visibleProjects.map((project, i) =>
            project.featured ? (
              <FeaturedCard key={project.name} project={project} index={i} />
            ) : (
              <IndexCard key={project.name} project={project} index={i} />
            )
          )}
        </AnimatePresence>
      </motion.div>
    </SectionWrapper>
  )
}
