import { motion } from 'framer-motion'
import { ArrowDownRight, FileDown, MapPin } from 'lucide-react'
import { clients } from '../data/clients'
import { profile } from '../data/resume'

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="pointer-events-none absolute -right-20 top-20 h-72 w-72 rounded-full bg-coral/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-10 h-64 w-64 rounded-full bg-teal/20 blur-3xl" />

      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]"
          >
            <MapPin size={12} /> {profile.location}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="font-display text-5xl font-bold leading-[0.95] tracking-tight text-balance sm:text-6xl md:text-7xl lg:text-8xl"
          >
            Hello, I&apos;m{' '}
            <span className="relative inline-block">
              {profile.shortName}
              <span className="absolute -bottom-2 left-0 h-3 w-full -skew-x-6 bg-mango/70" />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mt-6 max-w-xl text-lg text-ink/75 md:text-xl"
          >
            {profile.title}. I build fast, accessible websites and apps that
            help businesses sell more and support their customers better.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-coral px-5 py-3 text-sm font-bold text-paper shadow-punch transition hover:-translate-y-1"
            >
              What I can do for you <ArrowDownRight size={16} />
            </a>
            <a
              href={profile.cv}
              download
              className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-cream px-5 py-3 text-sm font-bold transition hover:-translate-y-1 hover:shadow-punch"
            >
              <FileDown size={16} /> Download CV
            </a>
            <a
              href="#play"
              className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-cream px-5 py-3 text-sm font-bold transition hover:-translate-y-1 hover:shadow-punch"
            >
              Nostalgia corner
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="relative"
        >
          <div className="relative rounded-[2rem] border-2 border-ink bg-night p-6 text-paper shadow-punch">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-paper/60">
              Right now
            </p>
            <p className="mt-3 font-display text-3xl font-bold leading-tight">
              Building interfaces used by 100K+ people a day
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-paper/20 pt-5">
              {profile.stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-2xl font-bold text-mango">{s.value}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-wide text-paper/55">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute -bottom-6 -left-4 hidden rotate-[-6deg] rounded-2xl border-2 border-ink bg-teal px-4 py-3 text-sm font-bold text-ink shadow-punch sm:block">
            Design ↔ Code
          </div>
          <div className="absolute -right-3 -top-4 hidden rotate-[8deg] rounded-2xl border-2 border-ink bg-violet px-4 py-3 text-sm font-bold text-paper shadow-punch sm:block">
            7+ yrs deep
          </div>
        </motion.div>
      </div>

      <div className="mx-auto mt-20 max-w-5xl px-5 text-center md:mt-28">
        <h2 className="font-display text-4xl font-bold md:text-5xl">Clients</h2>
        <p className="mx-auto mt-4 max-w-xl text-ink/65">
          A few of the companies and products I have built interfaces for.
        </p>
        <div className="mx-auto mt-8 h-px w-16 bg-ink/25" aria-hidden />

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {clients.map((client) => (
            <a
              key={client.name}
              href={client.href}
              target="_blank"
              rel="noreferrer"
              title={client.name}
              className="flex h-24 items-center justify-center rounded-2xl border-2 border-night bg-paper px-4 transition hover:-translate-y-1 hover:shadow-punch"
            >
              <img
                src={client.src}
                alt={client.name}
                className={
                  client.kind === 'mark'
                    ? 'h-12 w-12 rounded-xl object-contain'
                    : 'h-8 w-auto max-w-full object-contain'
                }
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
