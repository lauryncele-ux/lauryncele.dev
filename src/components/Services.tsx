import { motion } from 'framer-motion'
import {
  FileDown,
  PenTool,
  Rocket,
  ShoppingCart,
  TrendingUp,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import { profile, services } from '../data/resume'

const serviceIcons: Record<string, LucideIcon> = {
  Zap,
  PenTool,
  ShoppingCart,
  TrendingUp,
  Rocket,
  Users,
}

export function Services() {
  return (
    <section
      id="services"
      className="border-t-2 border-ink bg-ink py-20 text-cream md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-cream/45">
              What I do
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
              How I can help your business
            </h2>
          </div>
          <p className="max-w-md text-cream/65">
            Six things I get hired for, and the result each one produced the last
            time I did it.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = serviceIcons[service.icon]
            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: (i % 3) * 0.06 }}
                className="flex flex-col rounded-[1.5rem] border-2 border-cream/20 bg-cream/[0.03] p-6 transition hover:bg-cream/[0.07]"
              >
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-ink text-ink"
                  style={{ background: service.accent }}
                >
                  {Icon ? <Icon size={20} strokeWidth={2.2} /> : null}
                </span>

                <h3 className="mt-5 font-display text-2xl font-bold leading-tight">
                  {service.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-cream/70">
                  {service.body}
                </p>

                <p className="mt-5 border-t border-cream/15 pt-4 font-mono text-xs font-semibold text-mango">
                  {service.proof}
                </p>
              </motion.article>
            )
          })}
        </div>

        <div className="mt-12 flex flex-col items-start gap-4 rounded-[1.5rem] border-2 border-cream/20 bg-cream/[0.03] p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-xl font-bold">
              Want the full history?
            </p>
            <p className="mt-1 text-sm text-cream/65">
              Roles, dates and references are all in my CV.
            </p>
          </div>
          <a
            href={profile.cv}
            download
            className="inline-flex shrink-0 items-center gap-2 rounded-full border-2 border-cream bg-cream px-5 py-3 text-sm font-bold text-ink transition hover:-translate-y-0.5"
          >
            <FileDown size={16} /> Download CV
          </a>
        </div>
      </div>
    </section>
  )
}
