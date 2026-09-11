import type { ReactNode } from 'react'

export function BrowserFrame({
  url,
  toolbar,
  dark = false,
  children,
}: {
  url: string
  toolbar?: ReactNode
  dark?: boolean
  children: ReactNode
}) {
  return (
    <div className="overflow-hidden rounded-2xl border-2 border-ink bg-[#d4cbb8] shadow-punch">
      <div className="flex items-center gap-3 border-b-2 border-ink px-3 py-2">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full border border-ink/50 bg-coral" />
          <span className="h-2.5 w-2.5 rounded-full border border-ink/50 bg-mango" />
          <span className="h-2.5 w-2.5 rounded-full border border-ink/50 bg-teal" />
        </span>

        <span className="flex-1 truncate rounded-full border border-ink/30 bg-cream px-3 py-1 text-center font-mono text-[11px] text-ink/60">
          {url}
        </span>

        {toolbar}
      </div>

      <div className={dark ? 'bg-ink' : 'bg-cream'}>{children}</div>
    </div>
  )
}
