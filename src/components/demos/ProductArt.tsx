import type { ProductKind } from '../../data/demos'

/** Products are drawn rather than photographed so the demo ships no image weight. */
export function ProductArt({
  kind,
  color,
  className = '',
}: {
  kind: ProductKind
  color: string
  className?: string
}) {
  return (
    <div
      className={`grid place-items-center rounded-xl border-2 border-ink ${className}`}
      style={{ background: color }}
      aria-hidden
    >
      <svg viewBox="0 0 72 72" className="h-3/5 w-3/5" fill="none">
        {kind === 'mug' && (
          <>
            <path
              d="M16 22h32v26a10 10 0 0 1-10 10H26a10 10 0 0 1-10-10z"
              fill="#F6F0E6"
              stroke="#1A1A1A"
              strokeWidth="3"
            />
            <path
              d="M48 28h5a8 8 0 0 1 0 16h-5"
              stroke="#1A1A1A"
              strokeWidth="3"
            />
          </>
        )}

        {kind === 'bowl' && (
          <>
            <path
              d="M12 30h48c0 14-10 24-24 24S12 44 12 30z"
              fill="#F6F0E6"
              stroke="#1A1A1A"
              strokeWidth="3"
            />
            <path d="M12 30h48" stroke="#1A1A1A" strokeWidth="3" />
          </>
        )}

        {kind === 'vase' && (
          <>
            <path
              d="M28 12h16v8c0 4 10 10 10 22a18 18 0 0 1-36 0c0-12 10-18 10-22z"
              fill="#F6F0E6"
              stroke="#1A1A1A"
              strokeWidth="3"
            />
            <path d="M28 20h16" stroke="#1A1A1A" strokeWidth="3" />
          </>
        )}
      </svg>
    </div>
  )
}
