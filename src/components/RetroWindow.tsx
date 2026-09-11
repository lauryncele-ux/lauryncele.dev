import { useRef, useState, type ReactNode } from 'react'

type Props = {
  title: string
  open: boolean
  onClose: () => void
  onFocus: () => void
  active: boolean
  initial: { x: number; y: number }
  width: number
  children: ReactNode
}

export function RetroWindow({
  title,
  open,
  onClose,
  onFocus,
  active,
  initial,
  width,
  children,
}: Props) {
  const [pos, setPos] = useState(initial)
  const drag = useRef<{ ox: number; oy: number; sx: number; sy: number } | null>(null)

  if (!open) return null

  const onPointerDown = (e: React.PointerEvent) => {
    onFocus()
    const target = e.target as HTMLElement
    if (!target.closest('[data-titlebar]') || target.closest('[data-nodrag]')) return
    drag.current = { ox: e.clientX, oy: e.clientY, sx: pos.x, sy: pos.y }
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current) return
    const maxX = window.innerWidth - 80
    const maxY = window.innerHeight - 60
    setPos({
      x: Math.min(Math.max(drag.current.sx + (e.clientX - drag.current.ox), -20), maxX),
      y: Math.min(Math.max(drag.current.sy + (e.clientY - drag.current.oy), 8), maxY),
    })
  }

  return (
    <div
      className="fixed select-none overflow-hidden rounded-xl border-2 border-ink bg-[#d4cbb8] shadow-punch"
      style={{
        left: pos.x,
        top: pos.y,
        width: `min(${width}px, calc(100vw - 24px))`,
        zIndex: active ? 62 : 60,
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={() => (drag.current = null)}
    >
      <div
        data-titlebar
        className={`flex cursor-grab items-center gap-2 border-b-2 border-ink px-2 py-1.5 active:cursor-grabbing ${
          active ? 'bg-[#cfc4ae]' : 'bg-[#c4b9a2]'
        }`}
      >
        <span className="h-3 w-3 rounded-sm border border-ink/40 bg-[#eee6d6]" />
        <span className="flex-1 text-center font-mono text-[11px] font-semibold tracking-wide">
          {title}
        </span>
        <button
          type="button"
          aria-label={`Close ${title}`}
          className="flex h-5 w-5 items-center justify-center rounded-sm border border-ink/50 bg-[#eee6d6] text-xs font-bold hover:bg-coral hover:text-cream"
          onClick={onClose}
          data-nodrag
        >
          ×
        </button>
      </div>

      <div className="bg-[#eee6d6] p-3">{children}</div>
    </div>
  )
}
