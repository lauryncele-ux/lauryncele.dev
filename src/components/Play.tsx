import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Circle,
  Ghost,
  Maximize2,
  Minimize2,
  Worm,
  type LucideIcon,
} from 'lucide-react'
import { BounceGame } from './BounceGame'
import type { GameId } from './DesktopIcons'
import { PacManGame } from './PacManGame'
import { SnakeGame } from './SnakeGame'

const games: {
  id: GameId
  title: string
  Icon: LucideIcon
  Game: typeof SnakeGame
  blurb: string
  accent: string
}[] = [
  {
    id: 'snake',
    title: 'snake.exe',
    Icon: Worm,
    Game: SnakeGame,
    blurb: 'The Nokia classic, except you eat L\u2019s. Grow, don\u2019t bite yourself.',
    accent: 'bg-teal',
  },
  {
    id: 'bounce',
    title: 'bounce.exe',
    Icon: Circle,
    Game: BounceGame,
    blurb: 'Bounce the red ball, collect all five L\u2019s, dodge the spikes.',
    accent: 'bg-mango',
  },
  {
    id: 'pacman',
    title: 'pacman.exe',
    Icon: Ghost,
    Game: PacManGame,
    blurb: 'Eat every L, grab a big one, turn the ghosts edible.',
    accent: 'bg-coral',
  },
]

export function Play({
  openGames,
  onOpenGame,
  onCloseGame,
}: {
  openGames: GameId[]
  onOpenGame: (id: GameId) => void
  onCloseGame: (id: GameId) => void
}) {
  const [activeCard, setActiveCard] = useState<GameId | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  // Clicking away hands the arrow keys back to the page.
  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      const grid = gridRef.current
      if (grid && !grid.contains(e.target as Node)) setActiveCard(null)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [])

  return (
    <section id="play" className="border-t-2 border-ink bg-soft py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-ink/50">
            Side quest
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
            I love to play
          </h2>
          <p className="mt-4 text-lg text-ink/70">
            I built these three games from scratch to keep my canvas, game loop
            and interaction skills sharp. Play them right here in the cards, or
            pop one out into a window you can drag anywhere on the page.
          </p>
        </div>

        <div
          ref={gridRef}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {games.map((game, i) => {
            const detached = openGames.includes(game.id)
            return (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col rounded-[1.75rem] border-2 border-ink bg-[#d4cbb8] p-4 shadow-punch"
              >
                <div className="mb-3 flex items-center gap-2 border-b-2 border-ink/20 pb-2">
                  <span className="h-3 w-3 rounded-sm border border-ink/40 bg-cream" />
                  <span className="flex-1 text-center font-mono text-xs font-semibold">
                    {game.title}
                  </span>
                  <button
                    type="button"
                    aria-label={
                      detached
                        ? `Dock ${game.title} back in this card`
                        : `Pop ${game.title} out into a window`
                    }
                    onClick={() =>
                      detached ? onCloseGame(game.id) : onOpenGame(game.id)
                    }
                    className="flex h-5 w-5 items-center justify-center rounded-sm border border-ink/50 bg-cream hover:bg-ink hover:text-cream"
                  >
                    {detached ? <Minimize2 size={11} /> : <Maximize2 size={11} />}
                  </button>
                </div>

                {detached ? (
                  <div className="grid flex-1 place-items-center rounded-lg border-2 border-dashed border-ink/40 bg-cream p-6 text-center">
                    <div>
                      <game.Icon size={36} strokeWidth={1.8} />
                      <p className="mt-3 font-mono text-xs font-semibold tracking-wide">
                        POPPED OUT
                      </p>
                      <p className="mt-1 text-[11px] text-ink/55">
                        Drag the window around, or dock it back here.
                      </p>
                    </div>
                  </div>
                ) : (
                  <game.Game
                    variant="inline"
                    active={activeCard === game.id}
                    onFocus={() => setActiveCard(game.id)}
                  />
                )}

                <p className="mb-4 mt-4 px-1 text-sm text-ink/75">
                  {game.blurb}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    detached ? onCloseGame(game.id) : onOpenGame(game.id)
                  }
                  className={`mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-ink px-5 py-3 text-sm font-bold transition hover:-translate-y-0.5 ${game.accent}`}
                >
                  {detached ? (
                    <>
                      <Minimize2 size={16} /> Dock it back
                    </>
                  ) : (
                    <>
                      <Maximize2 size={16} /> Detach to a window
                    </>
                  )}
                </button>
              </motion.div>
            )
          })}
        </div>

        <p className="mt-8 text-center font-mono text-xs text-ink/45">
          Click a board to give it the keyboard, or detach it and drag it around
        </p>
      </div>
    </section>
  )
}
