import { ArrowUp, FileDown, Link2, Mail, MapPin, Phone } from 'lucide-react'
import { profile } from '../data/resume'

const footerLinks = [
  { label: 'What I do', href: '#services' },
  { label: 'Demos', href: '#demos' },
  { label: 'Facts', href: '#facts' },
  { label: 'Nostalgia', href: '#play' },
  { label: 'LinkedIn', href: profile.linkedin, external: true },
  { label: 'CV', href: profile.cv, external: true },
]

export function Contact() {
  return (
    <section id="contact" className="border-t-2 border-ink py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="overflow-hidden rounded-[2rem] border-2 border-ink bg-coral text-paper shadow-punch">
          <div className="grid gap-8 p-8 md:grid-cols-[1.2fr_0.8fr] md:p-12">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-paper/70">
                Interested?
              </p>
              <h2 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl">
                Tell me what you are trying to build.
              </h2>
              <p className="mt-4 max-w-lg text-paper/85">
                A new site, a rebuild of something slow, a store that is not
                converting, or an extra pair of hands on your front end. Send me
                the problem and I will tell you honestly whether I am the right
                person for it.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex rounded-full border-2 border-paper bg-paper px-5 py-3 text-sm font-bold text-night transition hover:-translate-y-1 hover:shadow-[6px_6px_0_0_rgba(255,255,255,0.35)]"
                >
                  Email me
                </a>
                <a
                  href={profile.cv}
                  download
                  className="inline-flex items-center gap-2 rounded-full border-2 border-paper px-5 py-3 text-sm font-bold text-paper transition hover:-translate-y-1"
                >
                  <FileDown size={16} /> Download CV
                </a>
              </div>
            </div>

            <div className="space-y-4 rounded-3xl border-2 border-paper/30 bg-night/10 p-6 backdrop-blur">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 text-sm font-medium hover:underline"
              >
                <Mail size={16} /> {profile.email}
              </a>
              <a
                href={`tel:${profile.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-3 text-sm font-medium hover:underline"
              >
                <Phone size={16} /> {profile.phone}
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-sm font-medium hover:underline"
              >
                <Link2 size={16} /> linkedin.com/in/lauryncele
              </a>
              <p className="flex items-center gap-3 text-sm font-medium">
                <MapPin size={16} /> {profile.location}
              </p>
            </div>
          </div>
        </div>

        <footer className="mt-10 flex flex-col items-start justify-between gap-5 border-t border-ink/10 pt-8 text-sm text-ink/55 md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} {profile.name}. Built with React, Tailwind &
            a little snake.
          </p>

          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition hover:text-ink"
                {...(link.external
                  ? { target: '_blank', rel: 'noreferrer' }
                  : {})}
              >
                {link.label}
              </a>
            ))}
            <a href="#top" className="inline-flex items-center gap-1 transition hover:text-ink">
              <ArrowUp size={14} /> Top
            </a>
          </nav>
        </footer>
      </div>
    </section>
  )
}
