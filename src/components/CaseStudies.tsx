import { motion } from 'framer-motion'
import { ArrowUpRight, Archive, Check } from 'lucide-react'
import { workPreviews } from '../data/previews'
import { experience } from '../data/resume'

export function CaseStudies() {
  return (
    <section id="work" className="border-t-2 border-ink bg-soft py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-ink/50">
            Selected work
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
            Things I have shipped
          </h2>
          <p className="mt-4 text-lg text-ink/70">
            Four builds, what I was responsible for on each one, and the result
            it produced.
          </p>
        </div>

        <div className="mt-12 space-y-8">
          {experience.map((job, i) => {
            const preview = workPreviews[job.company]
            return (
              <motion.article
                key={job.company}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: 0.05 }}
                className="grid gap-6 rounded-[2rem] border-2 border-ink bg-cream p-5 shadow-punch md:grid-cols-2 md:p-7"
              >
                {preview && (
                  <div
                    className={`overflow-hidden rounded-2xl border-2 border-ink ${
                      i % 2 === 1 ? 'md:order-2' : ''
                    }`}
                  >
                    <img
                      src={preview.image}
                      alt={`${job.company} website`}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}

                <div className="flex flex-col">
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className="inline-block h-3 w-3 rounded-sm border-2 border-ink"
                      style={{ background: job.color }}
                    />
                    <h3 className="font-display text-2xl font-bold">
                      {job.company}
                    </h3>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-ink/50">
                      {job.period}
                    </span>
                  </div>

                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.18em] text-ink/55">
                    {job.role}
                  </p>
                  <p className="mt-4 text-ink/75">{job.summary}</p>

                  <ul className="mt-4 space-y-2">
                    {job.highlights.map((h) => (
                      <li key={h} className="flex gap-2 text-sm text-ink/75">
                        <Check size={15} className="mt-0.5 shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {job.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-ink/25 px-3 py-1 font-mono text-[11px]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {preview && (
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <a
                        href={preview.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink px-4 py-2 text-sm font-bold transition hover:-translate-y-0.5 hover:shadow-punch"
                      >
                        {preview.domain} <ArrowUpRight size={15} />
                      </a>
                      <span className="rounded-full bg-mango px-3 py-1.5 font-mono text-[11px] font-semibold">
                        {preview.metric}
                      </span>
                      {preview.archived && (
                        <span className="inline-flex items-center gap-1 font-mono text-[11px] text-ink/45">
                          <Archive size={12} /> archived shot
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
