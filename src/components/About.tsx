import { motion } from 'framer-motion'
import { passions, profile } from '../data/resume'
import { Kaleidoscope } from './Kaleidoscope'

const accentMap: Record<string, string> = {
  coral: 'bg-coral text-paper',
  teal: 'bg-teal text-night',
  mango: 'bg-mango text-night',
  violet: 'bg-violet text-paper',
}

export function About() {
  return (
    <section id="about" className="border-t-2 border-ink py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-ink/50">
              Core info
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl">
              Bringing design to life with code
            </h2>
            <p className="mt-5 text-lg text-ink/75">{profile.blurb}</p>
            <p className="mt-4 text-ink/70">{profile.tagline}</p>
            <p className="mt-4 text-sm text-ink/65">
              Based in Sunninghill, South Africa, and available for remote work
              with teams and clients anywhere.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {passions.map((p, i) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.06 }}
                className={`rounded-3xl border-2 border-ink p-5 shadow-punch ${accentMap[p.accent]}`}
              >
                <h3 className="font-display text-2xl font-bold">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed opacity-90">{p.body}</p>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <Kaleidoscope />
        </div>
      </div>
    </section>
  )
}
