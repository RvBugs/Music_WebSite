"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { LoaderCircle, Save } from "lucide-react"
import { useBandSetupStore } from "./band-setup-store"
import { useState } from "react"

export default function SetupBandCredential({
                                              previousAction,
                                              nextPageAction,
                                            }: {
  previousAction: () => void
  nextPageAction: () => Promise<void>
}) {
  const [loading, setLoading] = useState(false)

  const email = useBandSetupStore((state) => state.email)
  const password = useBandSetupStore((state) => state.password)
  const errors = useBandSetupStore((state) => state.errors)
  const setEmail = useBandSetupStore((state) => state.setEmail)
  const setPassword = useBandSetupStore((state) => state.setPassword)

  async function handleSubmit() {
    if (loading) return

    setLoading(true)

    try {
      await nextPageAction()
    } catch (error) {
      console.error("Failed to create band:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="pb-6">
        <h2 className="text-lg font-medium">Setup New Credentials</h2>
        <p className="text-xs text-muted-foreground">
          Add an email and password to secure your band
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="bandEmail">Email Address</Label>
          <Input
            id="bandEmail"
            type="email"
            autoComplete="email"
            placeholder="e.g. mybandname@gmail.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="rounded-md"
            aria-invalid={!!errors.email}
            aria-label="Email Address"
            disabled={loading}
          />

          {errors.email ? (
            <p className="text-xs text-destructive">{errors.email}</p>
          ) : (
            <p className="text-xs text-muted-foreground">
              Enter a valid email address
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="bandPassword">Password</Label>
          <Input
            id="bandPassword"
            type="password"
            autoComplete="new-password"
            placeholder="Enter a secure password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="rounded-md"
            aria-invalid={!!errors.password}
            aria-label="Password"
            disabled={loading}
          />

          {errors.password ? (
            <p className="text-xs text-destructive">{errors.password}</p>
          ) : (
            <p className="text-xs text-muted-foreground">
              At least 8 characters and one number
            </p>
          )}
        </div>

        <div className="flex w-full items-center justify-center gap-2">
          <Button
            type="button"
            onClick={previousAction}
            variant="outline"
            className="mt-4 h-10 w-1/3 rounded-xl font-medium"
            disabled={loading}
          >
            Previous
          </Button>

          <Button
            type="button"
            onClick={handleSubmit}
            className="mt-4 h-10 w-2/3 rounded-xl font-medium"
            disabled={loading}
          >
            {loading ? (
              <>
                Creating Band
                <LoaderCircle className="ml-2 size-5 animate-spin" />
              </>
            ) : (
              <>
                Create New Band
                <Save className="ml-2 size-5" />
              </>
            )}
          </Button>
        </div>
      </div>
    </>
  )
}