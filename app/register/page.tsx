"use client"

import { AnimatePresence, motion } from "motion/react"
import SetupBand from "@/app/register/setup-band"
import SetupBandCover from "@/app/register/setup-band-cover"
import SetupBandCredential from "@/app/register/setup-band-credential"
import { useBandSetupStore } from "./band-setup-store"
import registerActions from "@/app/register/registerActions"
import { toast } from "@/components/ui/toast"
import { router } from "next/client"

export default function RegisterPage() {
  const setupPage = useBandSetupStore((state) => state.setupPage)
  const setSetupPage = useBandSetupStore((state) => state.setSetupPage)

  const isNamePage = setupPage === "name"
  const isCoverPage = setupPage === "avatar"

  const panelHeight = isNamePage ? "68dvh" : isCoverPage ? "78dvh" : "70dvh"

  const headingTitle = isNamePage
    ? "Music Chord"
    : isCoverPage
      ? "Band Cover"
      : "Band Credentials"

  const headingDescription = isNamePage
    ? "Your music. Your chords. Your creativity."
    : isCoverPage
      ? "Setup your band cover, to make your music more memorable"
      : "Make the band safe to access from anywhere"

  return (
    <div className="relative h-dvh w-full overflow-hidden">
      {/* Shared background */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/disk.jpg"
        alt="Disk cover"
        className="absolute inset-0 size-full scale-105 object-cover blur-xs grayscale-70"
      />

      {/* Animated heading */}
      <motion.div
        className="absolute inset-x-0 z-10 px-6 pb-4"
        animate={{ bottom: panelHeight }}
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
              {headingTitle}
            </h1>

            <p className="mt-2 text-sm text-white/80">{headingDescription}</p>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Shared animated panel */}
      <motion.div
        className="absolute inset-x-0 bottom-0 z-20 w-full overflow-y-auto rounded-t-2xl bg-background px-6 py-12"
        animate={{ height: panelHeight }}
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
            {isNamePage ? (
              <SetupBand
                nextPageAction={() => {
                  if (useBandSetupStore.getState().validateName()) {
                    setSetupPage("avatar")
                  }
                }}
              />
            ) : isCoverPage ? (
              <SetupBandCover
                previousAction={() => setSetupPage("name")}
                nextPageAction={() => {
                  if (useBandSetupStore.getState().validateCover()) {
                    setSetupPage("credential")
                  }
                }}
              />
            ) : (
              <SetupBandCredential
                previousAction={() => setSetupPage("avatar")}
                nextPageAction={async () => {
                  const store = useBandSetupStore.getState()

                  if (!store.validateAll()) return

                  if (store.bandCover) {
                    try {
                      const results = await registerActions(
                        store.email,
                        store.password,
                        store.bandName,
                        store.bandDescription,
                        store.bandCover
                      )

                      if (results.type !== "success") {
                        toast.add({
                          type: "error",
                          title: "Fail to setup band",
                          description: results.error,
                        })
                      } else {
                        toast.add({
                          type: "success",
                          title: "Band Created",
                          description: "Your band registered successfully",
                        })

                        await router.replace("/login")
                      }
                    } catch (e) {
                      toast.add({
                        type: "error",
                        title: "Fail to setup band",
                        description: (e as Error).message,
                      })
                    }
                  }
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
