import { useState } from 'react'
import { About } from './components/About'
import { BounceGame } from './components/BounceGame'
import { CaseStudies } from './components/CaseStudies'
import { Contact } from './components/Contact'
import { DesktopIcons, type GameId } from './components/DesktopIcons'
import { FunFacts } from './components/FunFacts'
import { Hero } from './components/Hero'
import { LogoWall } from './components/Logos'
import { Nav } from './components/Nav'
import { PacManGame } from './components/PacManGame'
import { Play } from './components/Play'
import { Services } from './components/Services'
import { Skills } from './components/Skills'
import { SnakeGame } from './components/SnakeGame'
export default function App() {
  const [openGames, setOpenGames] = useState<GameId[]>([])
  const [activeGame, setActiveGame] = useState<GameId | null>(null)

  const openGame = (id: GameId) => {
    setOpenGames((prev) => (prev.includes(id) ? prev : [...prev, id]))
    setActiveGame(id)
  }

  const closeGame = (id: GameId) => {
    setOpenGames((prev) => prev.filter((g) => g !== id))
    setActiveGame((prev) => (prev === id ? null : prev))
  }

  return (
    <div className="relative min-h-screen bg-cream text-ink">
      <div className="grain" aria-hidden />
      <Nav />
      <main>
        <Hero />
        <LogoWall />
        <About />
        <Services />
        <CaseStudies />
        <Skills />
        <FunFacts />
        <Play
          openGames={openGames}
          onOpenGame={openGame}
          onCloseGame={closeGame}
        />
        <Contact />
      </main>

      <DesktopIcons onOpen={openGame} />

      <SnakeGame
        open={openGames.includes('snake')}
        active={activeGame === 'snake'}
        onFocus={() => setActiveGame('snake')}
        onClose={() => closeGame('snake')}
      />
      <BounceGame
        open={openGames.includes('bounce')}
        active={activeGame === 'bounce'}
        onFocus={() => setActiveGame('bounce')}
        onClose={() => closeGame('bounce')}
      />
      <PacManGame
        open={openGames.includes('pacman')}
        active={activeGame === 'pacman'}
        onFocus={() => setActiveGame('pacman')}
        onClose={() => closeGame('pacman')}
      />
    </div>
  )
}
