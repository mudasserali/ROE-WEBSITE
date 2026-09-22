'use client'

import { Three } from '@/helpers/components/Three'
import EntrancePortal from '@/sandboxes/roe/EntrancePortal'
import { useRoeStore, type RoeWorld } from '@/store'

const nav: Array<{ label: string; world: RoeWorld }> = [
  { label: 'Music', world: 'music' },
  { label: 'Newsstand', world: 'newsstand' },
  { label: 'Tour', world: 'tour' },
  { label: 'Archive', world: 'archive' },
]

export default function RoeHome() {
  const entered = useRoeStore((s) => s.entered)
  const enter = useRoeStore((s) => s.enter)
  const setWorld = useRoeStore((s) => s.setWorld)

  return (
    <>
      <Three>
        <EntrancePortal />
      </Three>

      <main className="roe-ui">
        <header>
          <div className="roe-kicker">ROSE WORLD / SYSTEM 001 / ONLINE</div>
        </header>

        <section>
          <div className="roe-wordmark">Rose of England</div>
          <p style={{ maxWidth: 520, opacity: 0.8, lineHeight: 1.5 }}>
            Music, moving image, fashion, travel and interactive worlds connected through one persistent 3D universe.
          </p>

          <nav className="roe-nav" aria-label="Primary">
            <button
              className="roe-chip"
              onClick={() => {
                enter()
                setWorld('entrance')
              }}
              style={{ color: 'inherit', cursor: 'pointer' }}
            >
              {entered ? 'Rose World Unlocked' : 'Enter Rose World'}
            </button>

            {nav.map(({ label, world }) => (
              <button
                key={world}
                className="roe-chip"
                onClick={() => setWorld(world)}
                style={{ color: 'inherit', cursor: 'pointer' }}
              >
                {label}
              </button>
            ))}
          </nav>
        </section>

        <footer className="roe-footer">
          <span>ROSE OF ENGLAND</span>
          <span>Interactive build / R3F suite active</span>
        </footer>
      </main>
    </>
  )
}
