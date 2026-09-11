import { Worm, Circle, Ghost, type LucideIcon } from 'lucide-react'

export type GameId = 'snake' | 'bounce' | 'pacman'

const icons: { id: GameId; Icon: LucideIcon; label: string; bg: string }[] = [
  { id: 'snake', Icon: Worm, label: 'snake.exe', bg: 'bg-teal' },
  { id: 'bounce', Icon: Circle, label: 'bounce.exe', bg: 'bg-mango' },
  { id: 'pacman', Icon: Ghost, label: 'pacman.exe', bg: 'bg-coral' },
]

export function DesktopIcons({ onOpen }: { onOpen: (id: GameId) => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-30 flex flex-col gap-3">
      {icons.map(({ id, Icon, label, bg }) => (
        <button
          key={id}
          type="button"
          onClick={() => onOpen(id)}
          className="group flex flex-col items-center gap-1 rounded-xl border-2 border-ink bg-cream/90 px-3 py-3 shadow-punch backdrop-blur transition hover:-translate-y-1"
          title={`Play ${label}`}
        >
          <span
            className={`flex h-10 w-10 items-center justify-center rounded-lg border-2 border-ink transition group-hover:bg-coral ${bg}`}
          >
            <Icon size={20} strokeWidth={2.2} />
          </span>
          <span className="font-mono text-[10px] font-semibold">{label}</span>
        </button>
      ))}
    </div>
  )
}
