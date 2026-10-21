"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import SetupBand from "@/app/register/setup-band"
import SetupBandCover from "@/app/register/setup-band-cover"

export default function RegisterPage() {
  const [setupPage, setSetupPage] = useState<"name" | "avatar">("name")

  const isCoverPage = setupPage === "avatar"

  return (
    <div className="relative h-dvh w-full overflow-hidden">
      {/* Shared background image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/disk.jpg"
        alt="Disk cover"
        className="absolute inset-0 size-full scale-105 object-cover blur-xs grayscale-70"
      />

      {/* Shared animated heading */}
      <motion.div
        className="absolute inset-x-0 z-10 px-6 pb-4"
        animate={{
          bottom: isCoverPage ? "84dvh" : "68dvh",
        }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={setupPage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-lg">
              {isCoverPage ? "Band Cover" : "Music Chord"}
            </h1>

            <p className="mt-2 text-sm text-white/80">
              {isCoverPage
                ? "Setup your band cover, to make your music more memorable"
                : "Your music. Your chords. Your creativity."}
            </p>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Shared animated panel */}
      <motion.div
        className="absolute inset-x-0 bottom-0 z-20 w-full overflow-y-auto rounded-t-2xl bg-background px-6 py-12"
        animate={{
          height: isCoverPage ? "84dvh" : "68dvh",
        }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={setupPage}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {setupPage === "name" ? (
              <SetupBand nextPage={() => setSetupPage("avatar")} />
            ) : (
              <SetupBandCover />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
