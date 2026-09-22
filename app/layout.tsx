import type { Metadata } from 'next'
import './globals.css'
import Scene from '@/components/canvas/Scene'

export const metadata: Metadata = {
  title: 'ROSE OF ENGLAND — ROSE WORLD',
  description: 'The official immersive world of ROSE OF ENGLAND.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="roe-shell">
          <Scene />
          <div className="roe-vignette" />
          {children}
        </div>
      </body>
    </html>
  )
}
