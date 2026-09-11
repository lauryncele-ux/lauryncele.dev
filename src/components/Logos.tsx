import { ArrowUpRight, History } from 'lucide-react'
import goldMediaLab from '../assets/logos/gold-media-lab.png'
import imagineThat from '../assets/logos/imagine-that.png'
import mhc from '../assets/logos/mhc.png'
import { workPreviews } from '../data/previews'
import { SunBetLogo } from './SunBetLogo'

type LogoProps = { className?: string }

// SunBet ships a vector mark, the rest are bitmaps pulled from each company site.
export const companyLogos: Partial<Record<string, (props: LogoProps) => JSX.Element>> = {
  SunBet: ({ className }) => <SunBetLogo className={className} />,
  'Gold Media Lab': ({ className }) => (
    <img src={goldMediaLab} alt="Gold Media Lab" className={className} loading="lazy" />
  ),
  'Imagine That Design & Print': ({ className }) => (
    <img
      src={imagineThat}
      alt="Imagine That Design &amp; Print"
      className={className}
      loading="lazy"
    />
  ),
  MHC: ({ className }) => <img src={mhc} alt="MHC World" className={className} loading="lazy" />,
}

// The marks have very different aspect ratios, so cap each one so they read at a similar weight.
const sizes: Record<string, string> = {
  SunBet: 'max-h-10',
  'Gold Media Lab': 'max-h-16',
  'Imagine That Design & Print': 'max-h-11',
  MHC: 'max-h-11',
}

export const logoSize = (company: string) => sizes[company] ?? 'max-h-10'

const wall = ['SunBet', 'Gold Media Lab', 'Imagine That Design & Print', 'MHC']

export function LogoWall() {
  return (
    <section className="border-t-2 border-ink bg-soft py-12">
      <div className="mx-auto max-w-6xl px-5">
        <p className="text-center font-mono text-xs uppercase tracking-[0.22em] text-ink/50">
          Teams I&apos;ve built for
        </p>
            <p className="mt-2 text-center text-sm text-ink/50">
              Where I have put this to work. Hover for a glimpse.
            </p>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {wall.map((name) => {
            const Logo = companyLogos[name]
            const preview = workPreviews[name]
            if (!Logo || !preview) return null

            return (
              <div key={name} className="group relative">
                <a
                  href={preview.href}
                  target="_blank"
                  rel="noreferrer"
                  title={`${name} (${preview.domain})`}
                  className="flex h-28 items-center justify-center rounded-2xl border-2 border-ink bg-cream px-5 text-ink transition group-hover:-translate-y-1 group-hover:shadow-punch group-focus-within:-translate-y-1 group-focus-within:shadow-punch"
                >
                  <Logo className={`${logoSize(name)} w-auto max-w-full object-contain`} />
                </a>

                <div className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-4 w-[19rem] max-w-[calc(100vw-2.5rem)] -translate-x-1/2 translate-y-2 scale-95 opacity-0 transition duration-200 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:scale-100 group-focus-within:opacity-100">
                  <div className="overflow-hidden rounded-2xl border-2 border-ink bg-cream shadow-punch">
                    <img
                      src={preview.image}
                      alt={`${name} website`}
                      className="h-40 w-full border-b-2 border-ink object-cover object-top"
                      loading="lazy"
                    />
                    <div className="p-4 text-left">
                      <div className="flex items-baseline justify-between gap-2">
                        <p className="font-display text-lg font-bold leading-tight">{name}</p>
                        <span className="shrink-0 font-mono text-[10px] text-ink/45">
                          {preview.period}
                        </span>
                      </div>
                      <p className="mt-1 text-xs font-medium text-ink/60">{preview.role}</p>
                      <p className="mt-2 text-sm leading-snug text-ink/75">{preview.glimpse}</p>

                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span className="rounded-full border-2 border-ink bg-mango px-2.5 py-1 text-[11px] font-bold">
                          {preview.metric}
                        </span>
                        {preview.archived && (
                          <span
                            className="inline-flex items-center gap-1 rounded-full border border-ink/20 px-2 py-1 text-[10px] font-medium text-ink/55"
                            title="Captured from the Internet Archive because the live site is currently down"
                          >
                            <History size={11} /> archived
                          </span>
                        )}
                      </div>

                      <p className="mt-3 inline-flex items-center gap-1 font-mono text-[11px] text-ink/50">
                        {preview.domain} <ArrowUpRight size={12} />
                      </p>
                    </div>
                  </div>

                  <span className="mx-auto -mt-[9px] block h-4 w-4 rotate-45 border-b-2 border-r-2 border-ink bg-cream" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
