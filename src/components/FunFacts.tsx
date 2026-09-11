import { motion } from 'framer-motion'
import {
  Clock,
  Gamepad2,
  Languages,
  PenTool,
  Rocket,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { funFacts } from '../data/resume'

const factIcons: Record<string, LucideIcon> = {
  Languages,
  PenTool,
  Gamepad2,
  Users,
  Clock,
  Rocket,
}

export function FunFacts() {
  return (
    <section id="facts" className="border-t-2 border-ink py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-ink/50">
            Off the clock
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
            A few things a CV will not tell you
          </h2>
          <p className="mt-4 text-lg text-ink/70">
            The parts of me that end up in the work anyway.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {funFacts.map((fact, i) => {
            const Icon = factIcons[fact.icon] ?? Rocket
            return (
              <motion.div
                key={fact.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.06 }}
                className="flex flex-col rounded-3xl border-2 border-ink bg-soft p-6 transition hover:-translate-y-1 hover:shadow-punch"
              >
                <span
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border-2 border-ink ${fact.accent}`}
                >
                  <Icon size={18} strokeWidth={2.2} />
                </span>
                <p className="mt-5 font-display text-3xl font-bold leading-none">
                  {fact.stat}
                </p>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.18em] text-ink/55">
                  {fact.label}
                </p>
                <p className="mt-4 text-sm text-ink/75">{fact.body}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
