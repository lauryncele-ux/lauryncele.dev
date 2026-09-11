import { useState } from 'react'
import { motion } from 'framer-motion'
import { Smartphone, Store, Layout, type LucideIcon } from 'lucide-react'
import { AppDemo } from './demos/AppDemo'
import { ShopDemo } from './demos/ShopDemo'
import { SiteDemo } from './demos/SiteDemo'

type DemoId = 'shop' | 'site' | 'app'

const demos: {
  id: DemoId
  tab: string
  title: string
  blurb: string
  stack: string[]
  Icon: LucideIcon
  accent: string
}[] = [
  {
    id: 'shop',
    tab: 'Storefront',
    title: 'An online store',
    blurb:
      'Filter the catalogue, drop pieces in the bag, watch the delivery rule kick in, then check out.',
    stack: ['Cart state', 'Category filters', 'Rand formatting', 'Free delivery over R750'],
    Icon: Store,
    accent: 'bg-coral',
  },
  {
    id: 'site',
    tab: 'Website',
    title: 'A brand site',
    blurb:
      'The same brand as a marketing page. Flip it to dark, or squeeze it down to a phone width.',
    stack: ['Responsive layout', 'Dark theme', 'Design tokens', 'Reusable sections'],
    Icon: Layout,
    accent: 'bg-sky',
  },
  {
    id: 'app',
    tab: 'App',
    title: 'A mobile app',
    blurb:
      'Bottom tabs, a live order tracker you can move along, and a rewards ring drawn in SVG.',
    stack: ['Tab navigation', 'Order tracking', 'SVG progress', 'Screen transitions'],
    Icon: Smartphone,
    accent: 'bg-mango',
  },
]

export function Demos() {
  const [active, setActive] = useState<DemoId>('shop')
  const demo = demos.find((d) => d.id === active) as (typeof demos)[number]

  return (
    <section
      id="demos"
      className="border-t-2 border-ink bg-soft py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-ink/50">
            Demos
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
            Things I can build for you
          </h2>
          <p className="mt-4 text-lg text-ink/70">
            A store, a site and an app for the same made-up ceramics brand. They
            are not screenshots, they are running right here, so click around.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {demos.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setActive(d.id)}
              aria-pressed={active === d.id}
              className={`inline-flex items-center gap-2 rounded-full border-2 border-ink px-4 py-2 text-sm font-bold transition ${
                active === d.id
                  ? 'bg-ink text-cream'
                  : 'bg-cream hover:-translate-y-0.5 hover:shadow-punch'
              }`}
            >
              <d.Icon size={15} strokeWidth={2.2} />
              {d.tab}
            </button>
          ))}
        </div>

        <motion.div
          key={demo.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-6 grid gap-8 lg:grid-cols-[1fr_18rem] lg:items-start"
        >
          <div>
            {demo.id === 'shop' && <ShopDemo />}
            {demo.id === 'site' && <SiteDemo />}
            {demo.id === 'app' && <AppDemo />}
          </div>

          <aside className="rounded-3xl border-2 border-ink bg-cream p-6">
            <span
              className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border-2 border-ink ${demo.accent}`}
            >
              <demo.Icon size={18} strokeWidth={2.2} />
            </span>
            <h3 className="mt-5 font-display text-2xl font-bold leading-tight">
              {demo.title}
            </h3>
            <p className="mt-3 text-sm text-ink/75">{demo.blurb}</p>

            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/50">
              What it shows
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {demo.stack.map((item) => (
                <li
                  key={item}
                  className="rounded-full border-2 border-ink bg-soft px-3 py-1 font-mono text-[11px]"
                >
                  {item}
                </li>
              ))}
            </ul>

            <p className="mt-6 border-t border-ink/15 pt-4 text-xs text-ink/55">
              Want one of these as the real thing, with your products and your
              brand on it? That is the job.
            </p>
          </aside>
        </motion.div>
      </div>
    </section>
  )
}
