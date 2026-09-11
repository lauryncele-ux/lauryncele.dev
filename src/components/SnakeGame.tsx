import { useCallback, useEffect, useRef, useState } from 'react'
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  type LucideIcon,
} from 'lucide-react'
import { InlineBoard, useBoardVisibility, type GameProps } from './GameShell'
import { RetroWindow } from './RetroWindow'

type Point = { x: number; y: number }

const CELL = 14
const COLS = 16
const ROWS = 12
const WIDTH = COLS * CELL
const HEIGHT = ROWS * CELL

export function SnakeGame({
  variant = 'window',
  open,
  onClose,
  onFocus,
  active,
}: GameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [score, setScore] = useState(0)
  const touchStart = useRef<{ x: number; y: number } | null>(null)

  const isInline = variant === 'inline'
  const isOpen = isInline ? true : !!open
  const isActive = !!active
  const { ref: boardRef, visible } = useBoardVisibility(isInline)

  const state = useRef({
    snake: [
      { x: 5, y: 6 },
      { x: 4, y: 6 },
      { x: 3, y: 6 },
    ] as Point[],
    dir: { x: 1, y: 0 },
    nextDir: { x: 1, y: 0 },
    food: { x: 10, y: 6 } as Point,
    score: 0,
    dead: false,
    started: false,
  })

  const placeFood = useCallback(() => {
    const s = state.current
    let food: Point
    do {
      food = {
        x: (Math.random() * COLS) | 0,
        y: (Math.random() * ROWS) | 0,
      }
    } while (s.snake.some((p) => p.x === food.x && p.y === food.y))
    s.food = food
  }, [])

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const s = state.current
    const BG = '#f6f0e6'
    const PX = '#1a1a1a'

    ctx.fillStyle = BG
    ctx.fillRect(0, 0, WIDTH, HEIGHT)
    // The snake eats L's rather than pixels.
    ctx.fillStyle = PX
    ctx.font = "bold 13px 'IBM Plex Mono', monospace"
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('L', s.food.x * CELL + CELL / 2, s.food.y * CELL + CELL / 2 + 1)

    s.snake.forEach((p) => {
      ctx.fillRect(p.x * CELL + 1, p.y * CELL + 1, CELL - 2, CELL - 2)
    })

    if (s.dead || !s.started) {
      const text = s.dead ? 'GAME OVER · TAP' : 'PRESS ARROW'
      ctx.fillStyle = PX
      ctx.fillRect(0, HEIGHT / 2 - 15, WIDTH, 30)
      ctx.fillStyle = BG
      ctx.font = "bold 13px 'IBM Plex Mono', monospace"
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(text, WIDTH / 2, HEIGHT / 2)
    }
  }, [])

  const reset = useCallback(() => {
    state.current = {
      snake: [
        { x: 5, y: 6 },
        { x: 4, y: 6 },
        { x: 3, y: 6 },
      ],
      dir: { x: 1, y: 0 },
      nextDir: { x: 1, y: 0 },
      food: { x: 10, y: 6 },
      score: 0,
      dead: false,
      started: false,
    }
    setScore(0)
    placeFood()
    draw()
  }, [draw, placeFood])

  const setDir = useCallback(
    (x: number, y: number) => {
      const s = state.current
      if (s.dead) {
        reset()
        return
      }
      if (s.snake.length > 1 && x === -s.dir.x && y === -s.dir.y) return
      s.nextDir = { x, y }
      s.started = true
    },
    [reset],
  )

  useEffect(() => {
    if (!isOpen) return
    reset()

    const loop = window.setInterval(() => {
      if (!visible.current) return
      const s = state.current
      if (!s.started || s.dead) return
      s.dir = s.nextDir
      const head = { x: s.snake[0].x + s.dir.x, y: s.snake[0].y + s.dir.y }
      if (
        head.x < 0 ||
        head.x >= COLS ||
        head.y < 0 ||
        head.y >= ROWS ||
        s.snake.some((p) => p.x === head.x && p.y === head.y)
      ) {
        s.dead = true
        draw()
        return
      }
      s.snake.unshift(head)
      if (head.x === s.food.x && head.y === s.food.y) {
        s.score += 1
        setScore(s.score)
        placeFood()
      } else {
        s.snake.pop()
      }
      draw()
    }, 150)

    return () => clearInterval(loop)
  }, [isOpen, visible, reset, draw, placeFood])

  useEffect(() => {
    if (!isOpen || !isActive) return

    const onKey = (e: KeyboardEvent) => {
      const k = e.key
      let handled = true
      if (k === 'ArrowUp' || k === 'w') setDir(0, -1)
      else if (k === 'ArrowDown' || k === 's') setDir(0, 1)
      else if (k === 'ArrowLeft' || k === 'a') setDir(-1, 0)
      else if (k === 'ArrowRight' || k === 'd') setDir(1, 0)
      else if (k === ' ' && state.current.dead) reset()
      else handled = false
      if (handled) e.preventDefault()
    }

    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, isActive, setDir, reset])

  const padButton = (dx: number, dy: number, Icon: LucideIcon, aria: string) => (
    <button
      type="button"
      aria-label={aria}
      className="flex items-center justify-center rounded border-2 border-ink bg-cream py-1.5 active:bg-ink active:text-cream"
      onPointerDown={(e) => {
        e.preventDefault()
        setDir(dx, dy)
      }}
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
          if (state.current.dead) reset()
        }}
        onTouchStart={(e) => {
          const t = e.touches[0]
          touchStart.current = { x: t.clientX, y: t.clientY }
        }}
        onTouchEnd={(e) => {
          if (!touchStart.current) return
          const t = e.changedTouches[0]
          const dx = t.clientX - touchStart.current.x
          const dy = t.clientY - touchStart.current.y
          if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
            if (Math.abs(dx) > Math.abs(dy)) setDir(dx > 0 ? 1 : -1, 0)
            else setDir(0, dy > 0 ? 1 : -1)
          }
          touchStart.current = null
        }}
      />

      <div className="mx-auto mt-3 grid w-36 grid-cols-3 grid-rows-3 gap-1">
        <span />
        {padButton(0, -1, ChevronUp, 'Up')}
        <span />
        {padButton(-1, 0, ChevronLeft, 'Left')}
        <span />
        {padButton(1, 0, ChevronRight, 'Right')}
        <span />
        {padButton(0, 1, ChevronDown, 'Down')}
        <span />
      </div>

      <p className="mt-3 text-center font-mono text-[11px] text-ink/70">
        <b>arrows / swipe</b> · score <span>{score}</span>
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
      title="snake.exe"
      open={isOpen}
      onClose={onClose ?? (() => {})}
      onFocus={onFocus ?? (() => {})}
      active={isActive}
      initial={{ x: 40, y: 120 }}
      width={280}
    >
      {board}
    </RetroWindow>
  )
}
