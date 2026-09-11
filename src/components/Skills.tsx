import { motion } from 'framer-motion'
import { skillBars, skills } from '../data/resume'

export function Skills() {
  return (
    <section id="skills" className="border-t-2 border-ink py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-ink/50">
              Toolkit
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
              What I work with
            </h2>
            <p className="mt-4 max-w-md text-ink/70">
              The tools I reach for, rated honestly. React and TypeScript are
              where I am strongest, and I am comfortable owning a project from
              design file to deployment.
            </p>

            <div className="mt-8 space-y-4">
              {skillBars.slice(0, 8).map((s) => (
                <div key={s.name}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="font-medium">{s.name}</span>
                    <span className="font-mono text-ink/50">{s.level}%</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full border border-ink/20 bg-soft">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full rounded-full bg-ink"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[480px]">
            <div className="absolute inset-0 rounded-full border border-ink/10" />
            <div className="absolute inset-[12%] rounded-full border border-ink/10" />
            <div className="absolute inset-[24%] rounded-full border border-ink/10" />
            <div className="absolute inset-[36%] rounded-full border border-dashed border-ink/15" />

            <div className="absolute left-1/2 top-1/2 z-10 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-ink bg-coral text-center shadow-punch">
              <div>
                <p className="font-display text-2xl font-bold text-cream">LC</p>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-cream/70">
                  Core
                </p>
              </div>
            </div>

            {skills.map((skill, i) => {
              const angle = (i / skills.length) * Math.PI * 2
              const radius = 38 + (i % 3) * 8
              const x = 50 + Math.cos(angle) * radius
              const y = 50 + Math.sin(angle) * radius
              const size = 56 + (skill.level - 80)

              return (
                <motion.div
                  key={skill.name}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${x}%`, top: `${y}%` }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 3 + (i % 4) * 0.4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.15,
                  }}
                >
                  <div
                    className="flex flex-col items-center justify-center rounded-full border-2 border-ink text-center shadow-punch"
                    style={{
                      width: size,
                      height: size,
                      background: skill.color,
                    }}
                    title={`${skill.name} · ${skill.level}%`}
                  >
                    <span className="px-1 text-[10px] font-bold leading-tight text-ink">
                      {skill.name}
                    </span>
                    <span className="font-mono text-[9px] text-ink/70">{skill.level}%</span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
