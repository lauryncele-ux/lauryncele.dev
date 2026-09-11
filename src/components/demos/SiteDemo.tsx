import { useState } from 'react'
import {
  Hand,
  Monitor,
  Moon,
  Smartphone,
  Sparkles,
  Sun,
  Truck,
  type LucideIcon,
} from 'lucide-react'
import { siteFeatures, siteStats } from '../../data/demos'
import { BrowserFrame } from './BrowserFrame'
import { ProductArt } from './ProductArt'

const featureIcons: Record<string, LucideIcon> = { Hand, Truck, Sparkles }

export function SiteDemo() {
  const [dark, setDark] = useState(false)
  const [narrow, setNarrow] = useState(false)

  const ink = dark ? 'text-cream' : 'text-ink'
  const muted = dark ? 'text-cream/60' : 'text-ink/60'
  const edge = dark ? 'border-cream/25' : 'border-ink'
  const card = dark ? 'bg-cream/5' : 'bg-soft'

  return (
    <BrowserFrame
      url="kayaceramics.co.za"
      dark={dark}
      toolbar={
        <div className="flex items-center gap-1.5">
          <div className="flex overflow-hidden rounded-full border-2 border-ink">
            <button
              type="button"
              onClick={() => setNarrow(false)}
              aria-label="Desktop width"
              aria-pressed={!narrow}
              className={`grid h-6 w-7 place-items-center ${!narrow ? 'bg-ink text-cream' : 'bg-cream'}`}
            >
              <Monitor size={12} />
            </button>
            <button
              type="button"
              onClick={() => setNarrow(true)}
              aria-label="Mobile width"
              aria-pressed={narrow}
              className={`grid h-6 w-7 place-items-center border-l-2 border-ink ${narrow ? 'bg-ink text-cream' : 'bg-cream'}`}
            >
              <Smartphone size={12} />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setDark((v) => !v)}
            aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
            className="grid h-6 w-7 place-items-center rounded-full border-2 border-ink bg-cream"
          >
            {dark ? <Sun size={12} /> : <Moon size={12} />}
          </button>
        </div>
      }
    >
      <div className="p-3 sm:p-5">
        <div
          className={`mx-auto overflow-hidden rounded-xl border-2 transition-[max-width] duration-300 ease-out ${edge} ${dark ? 'bg-ink' : 'bg-cream'} ${ink} ${
            narrow ? 'max-w-[20rem]' : 'max-w-[64rem]'
          }`}
        >
          <header
            className={`flex items-center justify-between gap-3 border-b ${dark ? 'border-cream/15' : 'border-ink/12'} px-4 py-3`}
          >
            <span className="font-display text-sm font-bold">Kaya</span>
            {!narrow && (
              <nav className={`flex gap-4 font-mono text-[11px] ${muted}`}>
                <span>Shop</span>
                <span>Studio</span>
                <span>Journal</span>
              </nav>
            )}
            <span
              className={`rounded-full border-2 ${edge} px-3 py-1 text-[11px] font-bold ${dark ? 'bg-mango text-ink' : 'bg-ink text-cream'}`}
            >
              Shop now
            </span>
          </header>

          <div
            className={`grid gap-5 px-5 py-7 ${narrow ? '' : 'sm:grid-cols-[1.2fr_1fr] sm:items-center'}`}
          >
            <div>
              <p
                className={`font-mono text-[10px] uppercase tracking-[0.2em] ${muted}`}
              >
                New season
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold leading-[1.05] sm:text-3xl">
                Clay that earns
                <br />
                its place on the table.
              </h3>
              <p className={`mt-3 max-w-sm text-sm ${muted}`}>
                Small batch mugs, bowls and vases, thrown by hand and made to be
                used every single day.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <span
                  className={`rounded-full border-2 ${edge} px-4 py-2 text-xs font-bold ${dark ? 'bg-coral text-cream' : 'bg-coral text-cream'}`}
                >
                  Browse the shop
                </span>
                <span
                  className={`rounded-full border-2 ${edge} px-4 py-2 text-xs font-bold`}
                >
                  Book a studio tour
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <ProductArt
                kind="vase"
                color="#7B5EA7"
                className="aspect-[3/4] flex-1"
              />
              <div className="flex flex-1 flex-col gap-3">
                <ProductArt kind="mug" color="#FFB347" className="flex-1" />
                <ProductArt kind="bowl" color="#2EC4B6" className="flex-1" />
              </div>
            </div>
          </div>

          <div
            className={`grid gap-3 px-5 pb-5 ${narrow ? '' : 'sm:grid-cols-3'}`}
          >
            {siteFeatures.map((feature) => {
              const Icon = featureIcons[feature.icon] ?? Sparkles
              return (
                <div
                  key={feature.title}
                  className={`rounded-lg border-2 ${edge} ${card} p-4`}
                >
                  <Icon size={17} strokeWidth={1.9} />
                  <p className="mt-2 text-sm font-bold">{feature.title}</p>
                  <p className={`mt-1 text-[11px] leading-relaxed ${muted}`}>
                    {feature.body}
                  </p>
                </div>
              )
            })}
          </div>

          <div
            className={`flex justify-around border-t-2 ${edge} ${dark ? 'bg-cream/5' : 'bg-soft'} px-5 py-4`}
          >
            {siteStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-xl font-bold">{stat.value}</p>
                <p
                  className={`font-mono text-[10px] uppercase tracking-wider ${muted}`}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BrowserFrame>
  )
}
