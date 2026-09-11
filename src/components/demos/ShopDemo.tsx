import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Minus, Plus, ShoppingBag, X } from 'lucide-react'
import { shopCategories, shopProducts, type Product } from '../../data/demos'
import { BrowserFrame } from './BrowserFrame'
import { ProductArt } from './ProductArt'

const rand = (value: number) => `R${value.toLocaleString('en-ZA')}`

export function ShopDemo() {
  const [category, setCategory] = useState<string>('All')
  const [cart, setCart] = useState<Record<string, number>>({})
  const [cartOpen, setCartOpen] = useState(false)
  const [placed, setPlaced] = useState(false)

  const visible = useMemo(
    () =>
      category === 'All'
        ? shopProducts
        : shopProducts.filter((p) => p.category === category),
    [category],
  )

  const lines = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, qty]) => ({
          product: shopProducts.find((p) => p.id === id) as Product,
          qty,
        }))
        .filter((line) => line.product && line.qty > 0),
    [cart],
  )

  const count = lines.reduce((sum, line) => sum + line.qty, 0)
  const subtotal = lines.reduce(
    (sum, line) => sum + line.product.price * line.qty,
    0,
  )
  const delivery = subtotal > 0 && subtotal < 750 ? 95 : 0

  const setQty = (id: string, delta: number) =>
    setCart((prev) => {
      const next = { ...prev, [id]: Math.max(0, (prev[id] ?? 0) + delta) }
      if (next[id] === 0) delete next[id]
      return next
    })

  const add = (id: string) => {
    setPlaced(false)
    setQty(id, 1)
    setCartOpen(true)
  }

  return (
    <BrowserFrame
      url="kayaceramics.co.za/shop"
      toolbar={
        <button
          type="button"
          onClick={() => setCartOpen((v) => !v)}
          className="relative flex items-center gap-1.5 rounded-full border-2 border-ink bg-cream px-3 py-1 text-xs font-bold"
        >
          <ShoppingBag size={13} />
          Bag
          <span className="grid h-4 min-w-4 place-items-center rounded-full bg-coral px-1 font-mono text-[10px] text-cream">
            {count}
          </span>
        </button>
      }
    >
      <div className="relative">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 px-5 py-4">
          <div>
            <p className="font-display text-lg font-bold leading-none">
              Kaya Ceramics
            </p>
            <p className="mt-1 font-mono text-[11px] text-ink/50">
              Handmade homeware, Johannesburg
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {shopCategories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={`rounded-full border-2 border-ink px-3 py-1 text-xs font-semibold transition ${
                  category === c ? 'bg-ink text-cream' : 'bg-cream hover:bg-soft'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 p-5 sm:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.18 }}
                className="flex flex-col rounded-xl border-2 border-ink bg-soft p-3"
              >
                <ProductArt
                  kind={product.kind}
                  color={product.color}
                  className="aspect-square w-full"
                />
                <p className="mt-3 text-sm font-bold leading-tight">
                  {product.name}
                </p>
                <p className="mt-0.5 text-[11px] text-ink/55">{product.note}</p>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <span className="font-mono text-sm font-semibold">
                    {rand(product.price)}
                  </span>
                  <button
                    type="button"
                    onClick={() => add(product.id)}
                    aria-label={`Add ${product.name} to bag`}
                    className="grid h-7 w-7 place-items-center rounded-full border-2 border-ink bg-mango transition hover:-translate-y-0.5"
                  >
                    <Plus size={14} strokeWidth={2.6} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {cartOpen && (
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.22 }}
              className="absolute inset-y-0 right-0 flex w-full max-w-[19rem] flex-col border-l-2 border-ink bg-cream"
            >
              <div className="flex items-center justify-between border-b-2 border-ink px-4 py-3">
                <p className="font-mono text-xs font-bold uppercase tracking-wider">
                  Your bag
                </p>
                <button
                  type="button"
                  onClick={() => setCartOpen(false)}
                  aria-label="Close bag"
                  className="grid h-6 w-6 place-items-center rounded-full border-2 border-ink bg-cream hover:bg-coral hover:text-cream"
                >
                  <X size={13} />
                </button>
              </div>

              <div className="flex-1 overflow-auto px-4 py-3">
                {placed ? (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <span className="grid h-11 w-11 place-items-center rounded-full border-2 border-ink bg-teal">
                      <Check size={20} strokeWidth={2.6} />
                    </span>
                    <p className="mt-3 font-display text-lg font-bold">
                      Order placed
                    </p>
                    <p className="mt-1 text-xs text-ink/60">
                      A real build would hand off to a payment gateway here.
                    </p>
                  </div>
                ) : lines.length === 0 ? (
                  <p className="mt-8 text-center text-sm text-ink/50">
                    Your bag is empty. Add a piece.
                  </p>
                ) : (
                  <ul className="space-y-3">
                    {lines.map(({ product, qty }) => (
                      <li key={product.id} className="flex items-center gap-3">
                        <ProductArt
                          kind={product.kind}
                          color={product.color}
                          className="h-12 w-12 shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold">
                            {product.name}
                          </p>
                          <p className="font-mono text-[11px] text-ink/55">
                            {rand(product.price)}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => setQty(product.id, -1)}
                            aria-label={`Remove one ${product.name}`}
                            className="grid h-6 w-6 place-items-center rounded border-2 border-ink bg-cream"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-5 text-center font-mono text-xs">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQty(product.id, 1)}
                            aria-label={`Add one ${product.name}`}
                            className="grid h-6 w-6 place-items-center rounded border-2 border-ink bg-cream"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {!placed && (
                <div className="border-t-2 border-ink px-4 py-3">
                  <div className="flex justify-between font-mono text-xs text-ink/60">
                    <span>Subtotal</span>
                    <span>{rand(subtotal)}</span>
                  </div>
                  <div className="mt-1 flex justify-between font-mono text-xs text-ink/60">
                    <span>Delivery</span>
                    <span>{delivery === 0 ? 'Free' : rand(delivery)}</span>
                  </div>
                  <div className="mt-2 flex justify-between border-t border-ink/15 pt-2 font-mono text-sm font-bold">
                    <span>Total</span>
                    <span>{rand(subtotal + delivery)}</span>
                  </div>
                  <button
                    type="button"
                    disabled={lines.length === 0}
                    onClick={() => {
                      setPlaced(true)
                      setCart({})
                    }}
                    className="mt-3 w-full rounded-full border-2 border-ink bg-coral px-4 py-2.5 text-sm font-bold text-cream transition enabled:hover:-translate-y-0.5 disabled:opacity-40"
                  >
                    Checkout
                  </button>
                </div>
              )}
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </BrowserFrame>
  )
}
