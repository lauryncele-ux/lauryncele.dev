import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, ChevronUp, type LucideIcon } from 'lucide-react'
import { InlineBoard, useBoardVisibility, type GameProps } from './GameShell'
import { RetroWindow } from './RetroWindow'

const WIDTH = 240
const HEIGHT = 176
const GRAVITY = 0.42
const BOUNCE = 6.2
const BIG_BOUNCE = 8.7
const MOVE = 0.55
const FRICTION = 0.86
const MAX_VX = 3.2
const RADIUS = 7

type Rect = { x: number; y: number; w: number; h: number }
type Ring = { x: number; y: number; taken: boolean }

const PLATFORMS: Rect[] = [
  { x: 0, y: HEIGHT - 10, w: WIDTH, h: 10 },
  { x: 30, y: 132, w: 50, h: 7 },
  { x: 110, y: 112, w: 54, h: 7 },
  { x: 40, y: 84, w: 46, h: 7 },
  { x: 150, y: 64, w: 60, h: 7 },
]

const SPIKES: Rect[] = [
  { x: 96, y: HEIGHT - 18, w: 16, h: 8 },
  { x: 178, y: HEIGHT - 18, w: 16, h: 8 },
]

const RING_SPOTS: Ring[] = [
  { x: 215, y: 130, taken: false },
  { x: 55, y: 100, taken: false },
  { x: 137, y: 80, taken: false },
  { x: 63, y: 52, taken: false },
  { x: 180, y: 38, taken: false },
]

const SPAWN = { x: 16, y: 30 }

export function BounceGame({
  variant = 'window',
  open,
  onClose,
  onFocus,
  active,
}: GameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)

  const isInline = variant === 'inline'
  const isOpen = isInline ? true : !!open
  const isActive = !!active
  const { ref: boardRef, visible } = useBoardVisibility(isInline)

  const keys = useRef({ left: false, right: false, up: false })
  const state = useRef({
    x: SPAWN.x,
    y: SPAWN.y,
    vx: 0,
    vy: 0,
    rings: RING_SPOTS.map((r) => ({ ...r })),
    lives: 3,
    started: false,
    dead: false,
    won: false,
  })

  const respawn = useCallback(() => {
    const s = state.current
    s.x = SPAWN.x
    s.y = SPAWN.y
    s.vx = 0
    s.vy = 0
  }, [])

  const reset = useCallback(() => {
    state.current = {
      x: SPAWN.x,
      y: SPAWN.y,
      vx: 0,
      vy: 0,
      rings: RING_SPOTS.map((r) => ({ ...r })),
      lives: 3,
      started: false,
      dead: false,
      won: false,
    }
    setScore(0)
    setLives(3)
  }, [])

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const s = state.current
    const BG = '#f6f0e6'
    const INK = '#1a1a1a'

    ctx.fillStyle = BG
    ctx.fillRect(0, 0, WIDTH, HEIGHT)

    ctx.fillStyle = INK
    PLATFORMS.forEach((p) => ctx.fillRect(p.x, p.y, p.w, p.h))

    SPIKES.forEach((sp) => {
      const teeth = 4
      const step = sp.w / teeth
      ctx.beginPath()
      for (let i = 0; i < teeth; i += 1) {
        ctx.moveTo(sp.x + i * step, sp.y + sp.h)
        ctx.lineTo(sp.x + i * step + step / 2, sp.y)
        ctx.lineTo(sp.x + (i + 1) * step, sp.y + sp.h)
      }
      ctx.closePath()
      ctx.fill()
    })

    // Collect L's instead of plain rings.
    ctx.font = "bold 15px 'IBM Plex Mono', monospace"
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    s.rings.forEach((r) => {
      if (r.taken) return
      ctx.fillStyle = INK
      ctx.fillText('L', r.x, r.y)
    })

    ctx.beginPath()
    ctx.arc(s.x, s.y, RADIUS, 0, Math.PI * 2)
    ctx.fillStyle = '#ff4d6d'
    ctx.fill()
    ctx.lineWidth = 2
    ctx.strokeStyle = INK
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(s.x - 2.5, s.y - 2.5, 2, 0, Math.PI * 2)
    ctx.fillStyle = '#f6f0e6'
    ctx.fill()

    if (!s.started || s.dead || s.won) {
      const text = s.won ? 'YOU WIN · TAP' : s.dead ? 'GAME OVER · TAP' : 'ARROWS TO BOUNCE'
      ctx.fillStyle = INK
      ctx.fillRect(0, HEIGHT / 2 - 15, WIDTH, 30)
      ctx.fillStyle = BG
      ctx.font = "bold 12px 'IBM Plex Mono', monospace"
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(text, WIDTH / 2, HEIGHT / 2)
    }
  }, [])

  const step = useCallback(() => {
    const s = state.current
    if (!s.started || s.dead || s.won) return

    if (keys.current.left) s.vx -= MOVE
    if (keys.current.right) s.vx += MOVE
    s.vx *= FRICTION
    s.vx = Math.max(-MAX_VX, Math.min(MAX_VX, s.vx))

    s.vy += GRAVITY
    s.x += s.vx
    s.y += s.vy

    if (s.x < RADIUS) {
      s.x = RADIUS
      s.vx = Math.abs(s.vx) * 0.6
    }
    if (s.x > WIDTH - RADIUS) {
      s.x = WIDTH - RADIUS
      s.vx = -Math.abs(s.vx) * 0.6
    }
    if (s.y < RADIUS) {
      s.y = RADIUS
      s.vy = Math.abs(s.vy) * 0.5
    }

    PLATFORMS.forEach((p) => {
      const withinX = s.x + RADIUS > p.x && s.x - RADIUS < p.x + p.w
      const hitTop = s.y + RADIUS >= p.y && s.y + RADIUS <= p.y + p.h + Math.abs(s.vy)
      if (withinX && hitTop && s.vy > 0) {
        s.y = p.y - RADIUS
        s.vy = -(keys.current.up ? BIG_BOUNCE : BOUNCE)
      }
    })

    s.rings.forEach((r) => {
      if (r.taken) return
      if (Math.hypot(r.x - s.x, r.y - s.y) < RADIUS + 7) {
        r.taken = true
        setScore((v) => v + 1)
      }
    })

    const hitSpike = SPIKES.some(
      (sp) =>
        s.x + RADIUS > sp.x &&
        s.x - RADIUS < sp.x + sp.w &&
        s.y + RADIUS > sp.y &&
        s.y - RADIUS < sp.y + sp.h,
    )
    if (hitSpike) {
      s.lives -= 1
      setLives(s.lives)
      if (s.lives <= 0) s.dead = true
      else respawn()
    }

    if (s.rings.every((r) => r.taken)) s.won = true
  }, [respawn])

  useEffect(() => {
    if (!isOpen) return
    reset()
    draw()

    // Fixed timestep so the physics run at the same speed on any display.
    const STEP_MS = 16
    let raf = 0
    let last = performance.now()
    let acc = 0

    const tick = (now: number) => {
      if (!visible.current) {
        last = now
        acc = 0
        raf = requestAnimationFrame(tick)
        return
      }
      acc += Math.min(now - last, 120)
      last = now
      while (acc >= STEP_MS) {
        step()
        acc -= STEP_MS
      }
      draw()
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [isOpen, visible, reset, draw, step])

  useEffect(() => {
    if (!isOpen || !isActive) return

    const setKey = (key: string, down: boolean) => {
      const s = state.current
      if (down && (s.dead || s.won)) {
        reset()
        return true
      }
      let handled = true
      if (key === 'ArrowLeft' || key === 'a') keys.current.left = down
      else if (key === 'ArrowRight' || key === 'd') keys.current.right = down
      else if (key === 'ArrowUp' || key === 'w' || key === ' ') keys.current.up = down
      else handled = false
      if (handled && down) s.started = true
      return handled
    }

    const onDown = (e: KeyboardEvent) => {
      if (setKey(e.key, true)) e.preventDefault()
    }
    const onUp = (e: KeyboardEvent) => {
      if (setKey(e.key, false)) e.preventDefault()
    }

    document.addEventListener('keydown', onDown)
    document.addEventListener('keyup', onUp)
    return () => {
      document.removeEventListener('keydown', onDown)
      document.removeEventListener('keyup', onUp)
      keys.current = { left: false, right: false, up: false }
    }
  }, [isOpen, isActive, reset])

  const hold = (dir: 'left' | 'right' | 'up', down: boolean) => {
    const s = state.current
    if (down && (s.dead || s.won)) {
      reset()
      return
    }
    keys.current[dir] = down
    if (down) s.started = true
  }

  const padButton = (
    dir: 'left' | 'right' | 'up',
    Icon: LucideIcon,
    aria: string,
    extra = '',
  ) => (
    <button
      type="button"
      aria-label={aria}
      className={`flex items-center justify-center rounded border-2 border-ink bg-cream py-1.5 active:bg-ink active:text-cream ${extra}`}
      onPointerDown={(e) => {
        e.preventDefault()
        hold(dir, true)
      }}
      onPointerUp={() => hold(dir, false)}
      onPointerLeave={() => hold(dir, false)}
    >
      <Icon size={14} strokeWidth={2.6} />
    </button>
  )

  const board = (
    <>
      <canvas
        ref={canvasRef}
        width={WIDTH}
        height={HEIGHT}
        className="snake-pixel mx-auto block w-full rounded border-2 border-ink bg-cream"
        onClick={() => {
          const s = state.current
          if (s.dead || s.won) reset()
        }}
      />

      <div className="mx-auto mt-3 grid w-40 grid-cols-3 gap-1">
        {padButton('up', ChevronUp, 'Higher bounce', 'col-start-2')}
        {padButton('left', ChevronLeft, 'Left', 'col-start-1 row-start-2')}
        {padButton('right', ChevronRight, 'Right', 'col-start-3 row-start-2')}
      </div>

      <p className="mt-3 text-center font-mono text-[11px] text-ink/70">
        <b>← → move · ↑ big bounce</b>
        <br />
        L&rsquo;s {score}/{RING_SPOTS.length} · lives {lives}
      </p>
    </>
  )

  if (isInline) {
    return (
      <InlineBoard
        containerRef={boardRef}
        active={isActive}
        onActivate={onFocus ?? (() => {})}
      >
        {board}
      </InlineBoard>
    )
  }

  return (
    <RetroWindow
      title="Bounce"
      open={isOpen}
      onClose={onClose ?? (() => {})}
      onFocus={onFocus ?? (() => {})}
      active={isActive}
      initial={{ x: 360, y: 180 }}
      width={296}
    >
      {board}
    </RetroWindow>
  )
}
