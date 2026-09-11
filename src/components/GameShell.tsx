import { useEffect, useRef, type ReactNode, type RefObject } from 'react'

export type GameVariant = 'window' | 'inline'

export type GameProps = {
  // 'window' floats in a draggable RetroWindow, 'inline' sits inside a Play card.
  variant?: GameVariant
  open?: boolean
  onClose?: () => void
  onFocus?: () => void
  active?: boolean
}

/** Keeps an inline board's loop idle while it is scrolled out of view. */
export function useBoardVisibility(enabled: boolean) {
  const ref = useRef<HTMLDivElement>(null)
  const visible = useRef(true)

  useEffect(() => {
    visible.current = true
    if (!enabled) return
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting
    })
    io.observe(el)
    return () => io.disconnect()
  }, [enabled])

  return { ref, visible }
}

/**
 * Only the board you last touched listens to the keyboard, so the three boards
 * on the page never fight over the arrow keys.
 */
export function InlineBoard({
  containerRef,
  active,
  onActivate,
  children,
}: {
  containerRef: RefObject<HTMLDivElement>
  active: boolean
  onActivate: () => void
  children: ReactNode
}) {
  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onFocus={onActivate}
      onPointerDown={(e) => {
        e.currentTarget.focus()
        onActivate()
      }}
      className={`rounded-lg border-2 bg-[#eee6d6] p-3 outline-none transition ${
        active ? 'border-ink shadow-punch' : 'border-ink/30'
      }`}
    >
      {children}
      {!active && (
        <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-wider text-ink/45">
          click to use the keys
        </p>
      )}
    </div>
  )
}
