"use client"

import { AccountSkeleton } from "./components/AccountSkeleton"
import { LoadError } from "./components/LoadError"
import { PasswordResetForm } from "./components/PasswordResetForm"
import { ProfileDetails } from "./components/ProfileDetails"
import { ProfileHero } from "./components/ProfileHero"
import { useUserProfile } from "./hooks/useUserProfile"
import LoadingScreen from "@/components/LoadingScreen"

export default function Account() {
  const { user, loaded, loadError } = useUserProfile()

  if (!loaded) {
    return (
      <LoadingScreen
        title={"Loading Account"}
        description={
          "Getting your account ready. This will only take a moment."
        }
      />
    )
  }

  if (loadError || !user) {
    return <LoadError message={loadError} />
  }

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 pb-10 pt-4">
      <ProfileHero user={user} />
      <ProfileDetails user={user} />
      <PasswordResetForm email={user.email} />
    </main>
  )
}
