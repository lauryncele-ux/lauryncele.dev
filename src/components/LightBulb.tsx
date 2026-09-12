import { useTheme } from '../theme'

/** Click the hanging lamp, or tug the chain, to kill the lights. */
export function LightBulb() {
  const { theme, toggle } = useTheme()
  const on = theme === 'light'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? 'Turn the lights off' : 'Turn the lights on'}
      title={on ? 'Kill the lights' : 'Turn the lights on'}
      className="group relative -mt-2 flex h-12 w-11 items-start justify-center overflow-visible outline-none"
    >
      <span
        className={`pointer-events-none absolute top-7 h-11 w-11 rounded-full blur-lg transition-opacity duration-500 ${
          on ? 'bg-[#FFD36A]/80 opacity-100' : 'opacity-0'
        }`}
        aria-hidden
      />

      <svg
        viewBox="0 0 44 56"
        className="relative h-12 w-11 overflow-visible transition-transform duration-300 group-hover:rotate-[-7deg] group-active:translate-y-0.5"
        aria-hidden
      >
        <path
          d="M22 0v8"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-ink/50"
        />
        <circle cx="22" cy="8" r="1.3" className="fill-ink/55" />

        <path
          d="M17.2 32.6h9.6v2.6a2.2 2.2 0 0 1-2.2 2.2h-5.2a2.2 2.2 0 0 1-2.2-2.2z"
          className="fill-ink/20 stroke-ink"
          strokeWidth="1.5"
        />
        <path
          d="M18 37.6h8M18.8 40h6.4M19.6 42.2h4.8"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          className="text-ink"
        />

        <path
          d="M13 20.2c0-5.1 4-9.2 9-9.2s9 4.1 9 9.2c0 3.6-1.8 5.8-3.6 8-.9 1.1-1.6 2.4-1.8 3.8h-9.2c-.2-1.4-.9-2.7-1.8-3.8-1.8-2.2-3.6-4.4-3.6-8z"
          className={`stroke-ink transition-colors duration-500 ${
            on ? 'fill-[#FFE27A]' : 'fill-soft'
          }`}
          strokeWidth="1.7"
        />

        <path
          d="M18.6 22.6c0-1.9 1.5-3.4 3.4-3.4s3.4 1.5 3.4 3.4c0 1.6-1 2.6-1.9 3.6-.5.5-.8 1.2-1 1.9h-1.4c-.2-.7-.5-1.4-1-1.9-.9-1-1.5-2-1.5-3.6z"
          className={`transition-colors duration-500 ${
            on ? 'fill-[#C47A14]' : 'fill-ink/30'
          }`}
        />

        <path
          d="M26.8 37.2c3.2.4 5.6 1.6 5.6 3.2 0 .7-.6 1.2-1.4 1.2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          className="text-ink/55"
        />
        <circle
          cx="31"
          cy="42.6"
          r="1.6"
          className={`stroke-ink/60 transition-colors duration-500 ${
            on ? 'fill-mango' : 'fill-ink/25'
          }`}
        />

        {on && (
          <>
            <path
              d="M8.5 14.2 5.6 11.4"
              stroke="#FFB347"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
            <path
              d="M35.5 14.2 38.4 11.4"
              stroke="#FFB347"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
            <path
              d="M22 9.2V5.6"
              stroke="#FFB347"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </>
        )}
      </svg>
    </button>
  )
}
