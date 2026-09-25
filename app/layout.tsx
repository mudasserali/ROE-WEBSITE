import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ROSE OF ENGLAND — ROSE WORLD',
  description: 'The official immersive world of ROSE OF ENGLAND.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="roe-shell">{children}</div>
      </body>
    </html>
  )
}
