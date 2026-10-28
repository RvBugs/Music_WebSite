"use client"

import { motion } from "motion/react"
import { Music2 } from "lucide-react"

type AuthHeroProps = {
  title: string
  subtitle: string
}

export default function AuthHero({ title, subtitle }: AuthHeroProps) {
  return (
    <div className="relative h-[34dvh] overflow-hidden lg:h-auto">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/disk.jpg"
        alt="Disk cover"
        className="absolute inset-0 size-full object-cover brightness-75 grayscale-50"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6 pb-10 text-white lg:p-12"
      >
        <span className="flex size-10 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
          <Music2 className="size-5" />
        </span>
        <h1 className="text-3xl font-bold tracking-tight drop-shadow-lg lg:text-5xl">
          {title}
        </h1>
        <p className="max-w-xs text-sm text-white/80 lg:text-base">
          {subtitle}
        </p>
      </motion.div>
    </div>
  )
}
