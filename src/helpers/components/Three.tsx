'use client'

import { ThreeTunnel } from '@/helpers/global'

export function Three({ children }: { children: React.ReactNode }) {
  return <ThreeTunnel.In>{children}</ThreeTunnel.In>
}
