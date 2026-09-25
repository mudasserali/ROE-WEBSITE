import type { ComponentType } from 'react'

export type HyperspeedEffectOptions = Record<string, unknown>

declare const Hyperspeed: ComponentType<{
  effectOptions?: HyperspeedEffectOptions
  lightMode?: boolean
}>

export default Hyperspeed
