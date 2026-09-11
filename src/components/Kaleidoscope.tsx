import { useCallback, useEffect, useRef, useState } from 'react'
import { Download, Eraser } from 'lucide-react'

type Pt = { x: number; y: number }

const SIZE = 520
const CREAM = '#F6F0E6'
const PALETTE = ['#FF4D6D', '#2EC4B6', '#FFB347', '#7B5EA7', '#4BB8DB']
const SYMMETRIES = [4, 6, 8, 12]

export function Kaleidoscope() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const [symmetry, setSymmetry] = useState(6)
  const [touched, setTouched] = useState(false)

  const symRef = useRef(symmetry)
  symRef.current = symmetry

  const last = useRef<Pt | null>(null)
  const strokes = useRef(0)
  const drawing = useRef(false)
  // Once someone draws, the idle animation stops for good.
  const takenOver = useRef(false)

  const clear = useCallback(() => {
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return
    ctx.fillStyle = CREAM
    ctx.fillRect(0, 0, SIZE, SIZE)
  }, [])

  // Mirror every segment around the centre to get the kaleidoscope effect.
  const segment = useCallback((from: Pt, to: Pt) => {
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return

    const speed = Math.hypot(to.x - from.x, to.y - from.y)
    const width = Math.max(1.5, Math.min(9, 9 - speed * 0.35))
    strokes.current += 1

    ctx.strokeStyle = PALETTE[Math.floor(strokes.current / 14) % PALETTE.length]
    ctx.lineWidth = width
    ctx.lineCap = 'round'

    const c = SIZE / 2
    const sym = symRef.current
    for (let i = 0; i < sym; i++) {
      for (const flip of [1, -1]) {
        ctx.save()
        ctx.translate(c, c)
        ctx.rotate((i * Math.PI * 2) / sym)
        ctx.scale(1, flip)
        ctx.beginPath()
        ctx.moveTo(from.x - c, from.y - c)
        ctx.lineTo(to.x - c, to.y - c)
        ctx.stroke()
        ctx.restore()
      }
    }
  }, [])

  const toCanvas = (e: { clientX: number; clientY: number }): Pt | null => {
    const canvas = canvasRef.current
    if (!canvas) return null
    const r = canvas.getBoundingClientRect()
    return {
      x: ((e.clientX - r.left) / r.width) * SIZE,
      y: ((e.clientY - r.top) / r.height) * SIZE,
    }
  }

  useEffect(() => {
    clear()
  }, [clear])

  // Draw itself while idle and on screen, so the panel is never a blank box.
  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    let raf = 0
    let t = Math.random() * 100
    let prev: Pt | null = null
    let running = false
    // Budget the idle drawing so it resolves into a finished mandala
    // instead of filling the canvas with noise.
    let budget = 420

    const tick = () => {
      if (takenOver.current || budget <= 0) return
      budget -= 1
      t += 0.028
      const r = SIZE * 0.34
      const p = {
        x: SIZE / 2 + r * Math.sin(t * 0.9) * Math.cos(t * 0.23),
        y: SIZE / 2 + r * Math.cos(t * 0.7) * Math.sin(t * 0.31),
      }
      if (prev) segment(prev, p)
      prev = p
      raf = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !takenOver.current && !running && budget > 0) {
          running = true
          raf = requestAnimationFrame(tick)
        } else if (!entry.isIntersecting && running) {
          running = false
          cancelAnimationFrame(raf)
          prev = null
        }
      },
      { threshold: 0.25 },
    )

    observer.observe(wrap)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [segment])

  const start = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    takenOver.current = true
    drawing.current = true
    setTouched(true)
    last.current = toCanvas(e)
  }

  const move = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return
    const p = toCanvas(e)
    if (!p) return
    if (last.current) segment(last.current, p)
    last.current = p
  }

  const end = () => {
    drawing.current = false
    last.current = null
  }

  // Clearing counts as taking over, otherwise the idle drawing fills it back in.
  const handleClear = () => {
    takenOver.current = true
    clear()
  }

  const save = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const a = document.createElement('a')
    a.download = 'kaleidoscope.png'
    a.href = canvas.toDataURL('image/png')
    a.click()
  }

  return (
    <div
      ref={wrapRef}
      className="mx-auto max-w-xl rounded-3xl border-2 border-ink bg-soft p-6"
    >
      <h3 className="font-display text-2xl font-bold">Make something</h3>
      <p className="mt-2 text-sm text-ink/65">
        A kaleidoscope that draws itself until you take over. Drag inside it.
      </p>

      <div className="relative mt-5">
        <canvas
          ref={canvasRef}
          width={SIZE}
          height={SIZE}
          aria-label="Kaleidoscope drawing canvas"
          className="aspect-square w-full cursor-crosshair touch-none rounded-2xl border-2 border-ink bg-cream"
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={end}
          onPointerCancel={end}
        />
        {!touched && (
          <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border-2 border-ink bg-cream/90 px-3 py-1 font-mono text-[11px] font-semibold">
            drag to draw
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="font-mono text-[11px] uppercase tracking-wider text-ink/50">
          Symmetry
        </span>
        {SYMMETRIES.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setSymmetry(n)}
            aria-pressed={symmetry === n}
            className={`rounded-full border-2 border-ink px-3 py-1 font-mono text-xs font-bold transition ${
              symmetry === n ? 'bg-ink text-cream' : 'bg-cream hover:bg-mango'
            }`}
          >
            {n}
          </button>
        ))}

        <div className="ml-auto flex gap-2">
          <button
            type="button"
            onClick={handleClear}
            className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-cream px-3 py-1.5 text-xs font-bold transition hover:bg-coral hover:text-cream"
          >
            <Eraser size={13} /> Clear
          </button>
          <button
            type="button"
            onClick={save}
            className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-cream px-3 py-1.5 text-xs font-bold transition hover:bg-teal"
          >
            <Download size={13} /> Save
          </button>
        </div>
      </div>
    </div>
  )
}
