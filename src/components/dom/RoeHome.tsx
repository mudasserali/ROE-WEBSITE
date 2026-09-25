'use client'

import Image from 'next/image'
import Hyperspeed from '@/components/Hyperspeed'

const hyperspeedOptions = {
  distortion: 'deepDistortion',
  length: 400,
  roadWidth: 18,
  islandWidth: 2,
  lanesPerRoad: 3,
  fov: 90,
  fovSpeedUp: 150,
  speedUp: 2,
  carLightsFade: 0.4,
  totalSideLightSticks: 50,
  lightPairsPerRoadWay: 50,
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,
  lightStickWidth: [0.12, 0.5],
  lightStickHeight: [1.3, 1.7],
  movingAwaySpeed: [60, 80],
  movingCloserSpeed: [-120, -160],
  carLightsLength: [20, 60],
  carLightsRadius: [0.05, 0.14],
  carWidthPercentage: [0.3, 0.5],
  carShiftX: [-0.2, 0.2],
  carFloorSeparation: [0.05, 1],
  colors: {
    roadColor: 526344,
    islandColor: 657930,
    background: 0,
    shoulderLines: 1250072,
    brokenLines: 1250072,
    leftCars: [16724527, 10694672, 11015432],
    rightCars: [16645616, 15982240, 14859144],
    sticks: 16645616,
  },
} as const

export default function RoeHome() {
  return (
    <main className="hyperspeed-landing">
      <div className="hyperspeed-background" aria-hidden="true">
        <Hyperspeed effectOptions={hyperspeedOptions} />
      </div>

      <div className="hyperspeed-veil" aria-hidden="true" />
      <div className="hyperspeed-grain" aria-hidden="true" />

      <header className="hyperspeed-header">
        <Image
          className="roe-property-logo"
          src="/brand/roe-property.webp"
          alt="Property of Rose of England"
          width={365}
          height={54}
          priority
        />

        <div className="hyperspeed-system">
          <span>ROSE WORLD / 001</span>
          <span className="hyperspeed-status"><i /> ONLINE</span>
        </div>
      </header>

      <section className="hyperspeed-hero" aria-labelledby="landing-title">
        <div className="hyperspeed-hero-copy">
          <div className="hyperspeed-kicker">WORLDWIDE / 23 OCT 2026</div>

          <Image
            className="roe-script-logo"
            src="/brand/roe-script.webp"
            alt="Rose of England"
            width={420}
            height={246}
            priority
          />

          <h1 id="landing-title">ONE MORE<br />FERRARI</h1>

          <div className="hyperspeed-actions">
            <a
              className="hyperspeed-presave"
              href="https://empire.ffm.to/onemoreferrari"
              target="_blank"
              rel="noreferrer"
            >
              PRE-SAVE
              <span aria-hidden="true">↗</span>
            </a>

            <span className="hyperspeed-hint">
              PRESS + HOLD THE ROAD TO ACCELERATE
            </span>
          </div>
        </div>
      </section>

      <footer className="hyperspeed-footer">
        <div>
          <strong>ROSE OF ENGLAND</strong>
          <span>ONE MORE FERRARI / ROSE WORLD</span>
        </div>

        <div className="hyperspeed-partners" aria-label="Partners">
          <span>EMPIRE</span>
          <span className="partner-rule" aria-hidden="true" />
          <span>DATA-X</span>
        </div>
      </footer>
    </main>
  )
}
