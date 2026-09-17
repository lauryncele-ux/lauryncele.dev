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
type Ghost = Point & {
  dir: Point
  home: Point
  scared: boolean
  hue: string
  release: number
}

// '#' wall · '.' pellet · 'o' power pellet · 'P' pac spawn · 'G' ghost spawn.
// Verified symmetric, fully connected, and free of dead ends.
const MAZE = [
  '###################',
  '#........#........#',
  '#o##.###.#.###.##o#',
  '#.................#',
  '#.##.#.#####.#.##.#',
  '#....#...#...#....#',
  '####.###.#.###.####',
  '#......#GGG#......#',
  '#.####.#.#.#.####.#',
  '#.................#',
  '#.##.#.#####.#.##.#',
  '#....#...#...#....#',
  '####.###.#.###.####',
  '#......#.P.#......#',
  '#o####.#.#.#.####o#',
  '#.................#',
  '###################',
]

const COLS = MAZE[0].length
const ROWS = MAZE.length
const CELL = 12
const WIDTH = COLS * CELL
const HEIGHT = ROWS * CELL

const CREAM = '#F6F0E6'
const INK = '#1A1A1A'
const MANGO = '#FFB347'
const GHOST_HUES = ['#FF4D6D', '#2EC4B6', '#7B5EA7']

// One interval drives everything; each entity moves every N ticks.
const TICK_MS = 30
const PAC_TICKS = 4
const GHOST_TICKS = 7
const SCARED_GHOST_TICKS = 10
const SCARED_TICKS = 200
// Ghosts leave the pen one at a time so the first seconds of a life are winnable.
const RELEASE_TICKS = [30, 100, 170]

const DIRS: Point[] = [
  { x: 1, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: -1 },
]

const tileAt = (x: number, y: number) => MAZE[y]?.[x] ?? '#'
const isWall = (x: number, y: number) => tileAt(x, y) === '#'

const findTile = (char: string) => {
  const spots: Point[] = []
  MAZE.forEach((row, y) => {
    row.split('').forEach((c, x) => {
      if (c === char) spots.push({ x, y })
    })
  })
  return spots
}

const PAC_SPAWN = findTile('P')[0]
const GHOST_SPAWNS = findTile('G')

const freshPellets = () =>
  MAZE.map((row) => row.split('').map((c) => (c === '.' || c === 'o' ? c : ' ')))

const freshGhosts = (): Ghost[] =>
  GHOST_SPAWNS.map((spawn, i) => ({
    ...spawn,
    dir: DIRS[i % 2],
    home: spawn,
    scared: false,
    hue: GHOST_HUES[i % GHOST_HUES.length],
    release: RELEASE_TICKS[i] ?? 0,
  }))

export function PacManGame({
  variant = 'window',
  open,
  onClose,
  onFocus,
  active,
}: GameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const touchStart = useRef<{ x: number; y: number } | null>(null)

  const isInline = variant === 'inline'
  const isOpen = isInline ? true : !!open
  const isActive = !!active
  const { ref: boardRef, visible } = useBoardVisibility(isInline)

  const state = useRef({
    pac: { ...PAC_SPAWN },
    dir: { x: 0, y: 0 } as Point,
    nextDir: { x: 0, y: 0 } as Point,
    ghosts: freshGhosts(),
    pellets: freshPellets(),
    left: 0,
    scared: 0,
    lives: 3,
    score: 0,
    tick: 0,
    round: 0,
    started: false,
    dead: false,
    won: false,
  })

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const s = state.current

    ctx.fillStyle = CREAM
    ctx.fillRect(0, 0, WIDTH, HEIGHT)

    ctx.fillStyle = INK
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        if (isWall(x, y)) ctx.fillRect(x * CELL + 1, y * CELL + 1, CELL - 2, CELL - 2)
      }
    }

    // Every pellet is an L; the power ones pulse so they still read differently.
    const pulse = Math.sin(s.tick / 6) * 1.4 + 10
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        const cell = s.pellets[y][x]
        if (cell === ' ') continue
        const cx = x * CELL + CELL / 2
        const cy = y * CELL + CELL / 2
        ctx.font =
          cell === 'o'
            ? `bold ${pulse.toFixed(1)}px 'IBM Plex Mono', monospace`
            : "bold 7px 'IBM Plex Mono', monospace"
        ctx.fillText('L', cx, cy)
      }
    }

    s.ghosts.forEach((g) => {
      const cx = g.x * CELL + CELL / 2
      const cy = g.y * CELL + CELL / 2
      const r = CELL / 2 - 1
      // Flash the last second of frightened mode as a warning.
      const flashing = g.scared && s.scared < 34 && Math.floor(s.scared / 5) % 2 === 0
      ctx.fillStyle = g.scared ? (flashing ? CREAM : '#8FA3B0') : g.hue

      ctx.beginPath()
      ctx.arc(cx, cy - 1, r, Math.PI, 0)
      ctx.lineTo(cx + r, cy + r)
      ctx.lineTo(cx + r / 2, cy + r - 2)
      ctx.lineTo(cx, cy + r)
      ctx.lineTo(cx - r / 2, cy + r - 2)
      ctx.lineTo(cx - r, cy + r)
      ctx.closePath()
      ctx.fill()
      ctx.strokeStyle = INK
      ctx.lineWidth = 1
      ctx.stroke()

      ctx.fillStyle = INK
      ctx.beginPath()
      ctx.arc(cx - 2, cy - 1, 1.4, 0, Math.PI * 2)
      ctx.arc(cx + 2, cy - 1, 1.4, 0, Math.PI * 2)
      ctx.fill()
    })

    const px = s.pac.x * CELL + CELL / 2
    const py = s.pac.y * CELL + CELL / 2
    const moving = s.started && !s.dead && !s.won && (s.dir.x !== 0 || s.dir.y !== 0)
    const mouth = moving ? Math.abs(Math.sin(s.tick / 4)) * 0.32 + 0.04 : 0.22
    const facing = Math.atan2(s.dir.y, s.dir.x)
    ctx.fillStyle = MANGO
    ctx.beginPath()
    ctx.moveTo(px, py)
    ctx.arc(px, py, CELL / 2 - 1, facing + mouth * Math.PI, facing - mouth * Math.PI)
    ctx.closePath()
    ctx.fill()
    ctx.strokeStyle = INK
    ctx.lineWidth = 1
    ctx.stroke()

    if (!s.started || s.dead || s.won) {
      const text = s.won ? 'YOU WIN · TAP' : s.dead ? 'GAME OVER · TAP' : 'PRESS ARROW'
      ctx.fillStyle = INK
      ctx.fillRect(0, HEIGHT / 2 - 15, WIDTH, 30)
      ctx.fillStyle = CREAM
      ctx.font = "bold 12px 'IBM Plex Mono', monospace"
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(text, WIDTH / 2, HEIGHT / 2)
    }
  }, [])

  const reset = useCallback(() => {
    const pellets = freshPellets()
    state.current = {
      pac: { ...PAC_SPAWN },
      dir: { x: 0, y: 0 },
      nextDir: { x: 0, y: 0 },
      ghosts: freshGhosts(),
      pellets,
      left: pellets.flat().filter((c) => c !== ' ').length,
      scared: 0,
      lives: 3,
      score: 0,
      tick: 0,
      round: 0,
      started: false,
      dead: false,
      won: false,
    }
    setScore(0)
    setLives(3)
    draw()
  }, [draw])

  // Send everyone back to their spawn but keep the pellets already eaten.
  const respawn = useCallback(() => {
    const s = state.current
    s.pac = { ...PAC_SPAWN }
    s.dir = { x: 0, y: 0 }
    s.nextDir = { x: 0, y: 0 }
    s.ghosts = freshGhosts()
    s.scared = 0
    s.round = 0
    s.started = false
  }, [])

  const setDir = useCallback(
    (x: number, y: number) => {
      const s = state.current
      if (s.dead || s.won) {
        reset()
        return
      }
      s.nextDir = { x, y }
      s.started = true
    },
    [reset],
  )

  const moveGhost = useCallback((g: Ghost, pac: Point) => {
    const options = DIRS.filter((d) => !isWall(g.x + d.x, g.y + d.y))
    const forward = options.filter((d) => !(d.x === -g.dir.x && d.y === -g.dir.y))
    // Reversing is only allowed when there is genuinely nowhere else to go.
    const choices = forward.length ? forward : options
    if (!choices.length) return

    let pick: Point
    if (Math.random() < 0.2) {
      pick = choices[(Math.random() * choices.length) | 0]
    } else {
      const scored = choices.map((d) => ({
        d,
        dist: Math.abs(g.x + d.x - pac.x) + Math.abs(g.y + d.y - pac.y),
      }))
      scored.sort((a, b) => (g.scared ? b.dist - a.dist : a.dist - b.dist))
      pick = scored[0].d
    }

    g.dir = pick
    g.x += pick.x
    g.y += pick.y
  }, [])

  useEffect(() => {
    if (!isOpen) return
    reset()

    const loop = window.setInterval(() => {
      if (!visible.current) return
      const s = state.current
      s.tick += 1
      if (!s.started || s.dead || s.won) {
        draw()
        return
      }

      s.round += 1

      if (s.scared > 0) {
        s.scared -= 1
        if (s.scared === 0) s.ghosts.forEach((g) => (g.scared = false))
      }

      if (s.tick % PAC_TICKS === 0) {
        // Queue the turn until it is actually possible, like the arcade original.
        const wanted = s.nextDir
        if (
          (wanted.x !== 0 || wanted.y !== 0) &&
          !isWall(s.pac.x + wanted.x, s.pac.y + wanted.y)
        ) {
          s.dir = wanted
        }
        if (!isWall(s.pac.x + s.dir.x, s.pac.y + s.dir.y)) {
          s.pac = { x: s.pac.x + s.dir.x, y: s.pac.y + s.dir.y }
        }

        const cell = s.pellets[s.pac.y][s.pac.x]
        if (cell !== ' ') {
          s.pellets[s.pac.y][s.pac.x] = ' '
          s.left -= 1
          s.score += cell === 'o' ? 50 : 10
          if (cell === 'o') {
            s.scared = SCARED_TICKS
            s.ghosts.forEach((g) => (g.scared = true))
          }
          setScore(s.score)
          if (s.left === 0) {
            s.won = true
            draw()
            return
          }
        }
      }

      const ghostTicks = s.scared > 0 ? SCARED_GHOST_TICKS : GHOST_TICKS
      if (s.tick % ghostTicks === 0) {
        s.ghosts.forEach((g) => {
          if (s.round < g.release) return
          const before = { x: g.x, y: g.y }
          moveGhost(g, s.pac)
          // Catch the case where pac and a ghost swap cells in the same step.
          const swapped = g.x === s.pac.x && g.y === s.pac.y
          if (!swapped && before.x === s.pac.x && before.y === s.pac.y) {
            g.x = before.x
            g.y = before.y
          }
        })
      }

      for (const g of s.ghosts) {
        if (g.x !== s.pac.x || g.y !== s.pac.y) continue
        if (g.scared) {
          g.scared = false
          g.x = g.home.x
          g.y = g.home.y
          s.score += 200
          setScore(s.score)
        } else {
          s.lives -= 1
          setLives(s.lives)
          if (s.lives <= 0) {
            s.dead = true
          } else {
            respawn()
          }
          break
        }
      }

      draw()
    }, TICK_MS)

    return () => clearInterval(loop)
  }, [isOpen, visible, reset, draw, moveGhost, respawn])

  useEffect(() => {
    if (!isOpen || !isActive) return

    const onKey = (e: KeyboardEvent) => {
      const k = e.key
      let handled = true
      if (k === 'ArrowUp' || k === 'w') setDir(0, -1)
      else if (k === 'ArrowDown' || k === 's') setDir(0, 1)
      else if (k === 'ArrowLeft' || k === 'a') setDir(-1, 0)
      else if (k === 'ArrowRight' || k === 'd') setDir(1, 0)
      else if (k === ' ' && (state.current.dead || state.current.won)) reset()
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
          const s = state.current
          if (s.dead || s.won) reset()
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
        <b>arrows / swipe</b> · score <span>{score}</span> · lives{' '}
        <span>{lives}</span>
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
      title="Pac-Man"
      open={isOpen}
      onClose={onClose ?? (() => {})}
      onFocus={onFocus ?? (() => {})}
      active={isActive}
      initial={{ x: 120, y: 200 }}
      width={280}
    >
      {board}
    </RetroWindow>
  )
}
