import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { LightBulb } from './LightBulb'

const links = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'What I do' },
  { href: '#demos', label: 'Demos' },
  { href: '#facts', label: 'Facts' },
  { href: '#play', label: 'Nostalgia' },
  { href: '#contact', label: 'Contact' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all ${
        scrolled
          ? 'border-b-2 border-ink/15 bg-cream/95 backdrop-blur-md'
          : ''
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#top" className="font-display text-xl font-bold tracking-tight">
          Lauryn<span className="text-coral">.</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ink/70 transition hover:text-ink"
            >
              {l.label}
            </a>
          ))}
          <a
            href="mailto:lauryncele@gmail.com"
            className="rounded-full border-2 border-ink bg-ink px-4 py-2 text-sm font-semibold text-cream transition hover:-translate-y-0.5 hover:shadow-punch"
          >
            Say hello
          </a>
          <LightBulb />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <LightBulb />
          <button
            type="button"
            className="rounded-lg border-2 border-ink p-2"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-ink/10 bg-cream px-5 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-medium"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
