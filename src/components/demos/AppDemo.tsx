import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  BatteryFull,
  Bell,
  Check,
  Gift,
  Home,
  Package,
  Plus,
  Signal,
  Store,
  Truck,
  Wifi,
  type LucideIcon,
} from 'lucide-react'
import { appPerks, shopProducts } from '../../data/demos'
import { ProductArt } from './ProductArt'

type Tab = 'home' | 'shop' | 'rewards'

const tabs: { id: Tab; label: string; Icon: LucideIcon }[] = [
  { id: 'home', label: 'Home', Icon: Home },
  { id: 'shop', label: 'Shop', Icon: Store },
  { id: 'rewards', label: 'Rewards', Icon: Gift },
]

const steps = [
  { label: 'Packed', Icon: Package },
  { label: 'On the road', Icon: Truck },
  { label: 'Delivered', Icon: Check },
]

const POINTS = 180
const GOAL = 300

export function AppDemo() {
  const [tab, setTab] = useState<Tab>('home')
  const [bag, setBag] = useState(0)
  const [step, setStep] = useState(1)

  const ring = 2 * Math.PI * 34

  return (
    <div className="flex justify-center py-2">
      <div className="w-[17rem] overflow-hidden rounded-[2rem] border-2 border-ink bg-cream shadow-punch">
        <div className="flex items-center justify-between bg-night px-5 py-2 font-mono text-[10px] text-paper">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <Signal size={11} />
            <Wifi size={11} />
            <BatteryFull size={13} />
          </span>
        </div>

        <div className="flex items-center justify-between border-b-2 border-ink px-4 py-3">
          <div>
            <p className="font-display text-base font-bold leading-none">Kaya</p>
            <p className="font-mono text-[10px] text-ink/50">Good morning</p>
          </div>
          <span className="relative grid h-8 w-8 place-items-center rounded-full border-2 border-ink bg-mango">
            <Bell size={14} />
            {bag > 0 && (
              <span className="absolute -right-1.5 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full border border-ink bg-coral px-1 font-mono text-[9px] text-paper">
                {bag}
              </span>
            )}
          </span>
        </div>

        <div className="h-[23rem] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.18 }}
              className="h-full overflow-auto px-4 py-4"
            >
              {tab === 'home' && (
                <div className="space-y-4">
                  <div className="rounded-xl border-2 border-ink bg-soft p-4">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-ink/50">
                      Order #1042
                    </p>
                    <p className="mt-1 text-sm font-bold">
                      Two mugs and a Veld Bowl
                    </p>

                    <div className="mt-4 flex items-center">
                      {steps.map((s, i) => (
                        <div key={s.label} className="flex flex-1 items-center">
                          <div className="flex flex-col items-center">
                            <span
                              className={`grid h-7 w-7 place-items-center rounded-full border-2 border-ink ${
                                i <= step ? 'bg-teal' : 'bg-cream'
                              }`}
                            >
                              <s.Icon size={13} />
                            </span>
                            <span className="mt-1 w-14 text-center font-mono text-[9px] leading-tight text-ink/55">
                              {s.label}
                            </span>
                          </div>
                          {i < steps.length - 1 && (
                            <span
                              className={`mb-4 h-0.5 flex-1 ${i < step ? 'bg-ink' : 'bg-ink/20'}`}
                            />
                          )}
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => setStep((s) => (s + 1) % steps.length)}
                      className="mt-3 w-full rounded-full border-2 border-ink bg-cream py-1.5 text-[11px] font-bold"
                    >
                      Advance the delivery
                    </button>
                  </div>

                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-ink/50">
                      Picked for you
                    </p>
                    <div className="mt-2 grid grid-cols-2 gap-3">
                      {shopProducts.slice(0, 2).map((p) => (
                        <div
                          key={p.id}
                          className="rounded-lg border-2 border-ink bg-soft p-2"
                        >
                          <ProductArt
                            kind={p.kind}
                            color={p.color}
                            className="aspect-square w-full"
                          />
                          <p className="mt-2 truncate text-[11px] font-bold">
                            {p.name}
                          </p>
                          <p className="font-mono text-[10px] text-ink/55">
                            R{p.price}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {tab === 'shop' && (
                <ul className="space-y-2.5">
                  {shopProducts.map((p) => (
                    <li
                      key={p.id}
                      className="flex items-center gap-3 rounded-lg border-2 border-ink bg-soft p-2"
                    >
                      <ProductArt
                        kind={p.kind}
                        color={p.color}
                        className="h-11 w-11 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[12px] font-bold">
                          {p.name}
                        </p>
                        <p className="font-mono text-[10px] text-ink/55">
                          R{p.price}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setBag((b) => b + 1)}
                        aria-label={`Add ${p.name} to bag`}
                        className="grid h-7 w-7 place-items-center rounded-full border-2 border-ink bg-mango"
                      >
                        <Plus size={13} strokeWidth={2.6} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {tab === 'rewards' && (
                <div className="flex flex-col items-center">
                  <div className="relative grid h-[5.5rem] w-[5.5rem] place-items-center">
                    <svg viewBox="0 0 80 80" className="absolute inset-0">
                      <circle
                        cx="40"
                        cy="40"
                        r="34"
                        fill="none"
                        stroke="#1A1A1A"
                        strokeOpacity="0.15"
                        strokeWidth="7"
                      />
                      <circle
                        cx="40"
                        cy="40"
                        r="34"
                        fill="none"
                        stroke="#FF4D6D"
                        strokeWidth="7"
                        strokeLinecap="round"
                        strokeDasharray={ring}
                        strokeDashoffset={ring * (1 - POINTS / GOAL)}
                        transform="rotate(-90 40 40)"
                      />
                    </svg>
                    <div className="text-center">
                      <p className="font-display text-lg font-bold leading-none">
                        {POINTS}
                      </p>
                      <p className="font-mono text-[9px] text-ink/50">points</p>
                    </div>
                  </div>

                  <p className="mt-3 text-center text-[11px] text-ink/60">
                    {GOAL - POINTS} points to your next free piece.
                  </p>

                  <ul className="mt-4 w-full space-y-2">
                    {appPerks.map((perk) => (
                      <li
                        key={perk.title}
                        className="flex items-center justify-between rounded-lg border-2 border-ink bg-soft px-3 py-2"
                      >
                        <div>
                          <p className="text-[12px] font-bold">{perk.title}</p>
                          <p className="font-mono text-[10px] text-ink/55">
                            {perk.detail}
                          </p>
                        </div>
                        <span className="rounded-full border-2 border-ink bg-teal px-2 py-0.5 font-mono text-[9px] font-bold">
                          Claim
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex border-t-2 border-ink">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              aria-pressed={tab === t.id}
              className={`flex flex-1 flex-col items-center gap-0.5 py-2.5 transition ${
                tab === t.id ? 'bg-ink text-cream' : 'bg-cream hover:bg-soft'
              }`}
            >
              <t.Icon size={15} strokeWidth={2} />
              <span className="font-mono text-[9px] uppercase tracking-wider">
                {t.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
