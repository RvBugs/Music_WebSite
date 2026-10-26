"use client"

import { useEffect, useState, type FormEvent } from "react"
import {
    Eye,
    EyeOff,
    LockKeyhole,
    ShieldCheck,
    LoaderCircle,
    UserRound,
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import { createClient } from "@/lib/supabase/client"
import getUserInfo from "@/app/(mobile)/(basicLayout)/account/getUserInfo"

type UserInfo = {
    id: string
    email: string | null
    name: string
    description: string
    avatar: string | null
}

export default function Account() {
    const [user, setUser] = useState<UserInfo | null>(null)
    const [loading, setLoading] = useState(true)
    const [loadError, setLoadError] = useState("")

    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        let cancelled = false

        async function loadUser() {
            try {
                const result = await getUserInfo()

                if (cancelled) return

                if (!result.success || !result.data) {
                    setLoadError(
                        result.error ?? "Unable to load your profile.",
                    )
                    return
                }

                setUser({
                    id: result.data.id,
                    email: result.data.email ?? "",
                    name: result.data.name ?? "",
                    description: result.data.description ?? "",
                    avatar: result.data.avatar ?? null,
                })
            } catch {
                if (!cancelled) {
                    setLoadError("Something went wrong while loading your profile.")
                }
            } finally {
                if (!cancelled) {
                    setLoading(false)
                }
            }
        }

        loadUser()

        return () => {
            cancelled = true
        }
    }, [])

    async function handlePasswordReset(
        event: FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault()
        setError("")
        setSuccess("")

        if (!currentPassword || !newPassword || !confirmPassword) {
            setError("Please fill in all password fields.")
            return
        }

        if (newPassword.length < 8) {
            setError("Your new password must be at least 8 characters.")
            return
        }

        if (!/\d/.test(newPassword)) {
            setError("Your new password must include at least one number.")
            return
        }

        if (newPassword !== confirmPassword) {
            setError("Your new passwords do not match.")
            return
        }

        if (currentPassword === newPassword) {
            setError("Your new password must differ from your current password.")
            return
        }

        if (!user?.email) {
            setError("Your account email could not be found.")
            return
        }

        setSaving(true)

        try {
            const supabase = createClient()

            // Verify the current password.
            const { error: signInError } =
                await supabase.auth.signInWithPassword({
                    email: user.email,
                    password: currentPassword,
                })

            if (signInError) {
                setError("Your current password is incorrect.")
                return
            }

            // Update the password.
            const { error: updateError } =
                await supabase.auth.updateUser({
                    password: newPassword,
                })

            if (updateError) {
                setError(updateError.message)
                return
            }

            setSuccess("Your password has been updated successfully.")

            setCurrentPassword("")
            setNewPassword("")
            setConfirmPassword("")
            setShowCurrentPassword(false)
            setShowNewPassword(false)
            setShowConfirmPassword(false)
        } catch {
            setError("Something went wrong. Please try again.")
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="flex min-h-48 items-center justify-center gap-2 text-sm text-muted-foreground">
                <LoaderCircle className="size-4 animate-spin" />
                Loading your profile...
            </div>
        )
    }

    if (loadError || !user) {
        return (
            <div
                role="alert"
                className="rounded-md bg-destructive/10 p-4 text-sm text-destructive"
            >
                {loadError || "Unable to load your profile."}
            </div>
        )
    }

    return (
        <div className="mx-auto w-full rounded-lg pb-6 shadow-md">
            {/* COVER PHOTO */}
            <div className="relative h-48 w-full overflow-hidden rounded-t-lg bg-muted">
                {user.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={user.avatar}
                        alt="Cover photo"
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground">
                        <UserRound className="size-10" />
                    </div>
                )}
            </div>

            {/* PROFILE PICTURE */}
            <div className="relative flex justify-center">
                <div className="absolute -translate-y-1/2">
                    {user.avatar ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={user.avatar}
                            alt="Profile picture"
                            className="size-36 rounded-full border-8 border-background bg-muted object-cover shadow-lg sm:size-42"
                        />
                    ) : (
                        <div className="flex size-36 items-center justify-center rounded-full border-8 border-background bg-muted shadow-lg sm:size-42">
                            <UserRound className="size-14 text-muted-foreground" />
                        </div>
                    )}
                </div>
            </div>

            {/* PROFILE DETAILS */}
            <div className="px-3 pt-24">
                <div className="flex flex-col gap-3">
                    <div className="rounded-md bg-muted/50 p-3">
                        <p className="mb-1 text-xs text-muted-foreground">
                            Name
                        </p>
                        <p className="text-sm font-medium">
                            {user.name || "No name provided"}
                        </p>
                    </div>

                    <div className="rounded-md bg-muted/50 p-3">
                        <p className="mb-1 text-xs text-muted-foreground">
                            Email
                        </p>
                        <p className="break-all text-sm font-medium">
                            {user.email || "No email available"}
                        </p>
                    </div>

                    <div className="rounded-md bg-muted/50 p-3">
                        <p className="mb-1 text-xs text-muted-foreground">
                            Band
                        </p>
                        <p className="text-sm font-medium">
                            {user.name || "No band name"}
                        </p>
                    </div>

                    <div className="rounded-md bg-muted/50 p-3">
                        <p className="mb-1 text-xs text-muted-foreground">
                            Description
                        </p>
                        <p className="text-sm leading-relaxed">
                            {user.description || "No description provided"}
                        </p>
                    </div>
                </div>
            </div>

            {/* RESET PASSWORD */}
            <div className="px-3 pt-8">
                <div className="mb-5">
                    <div className="flex items-center gap-2">
                        <LockKeyhole className="size-5 text-muted-foreground" />

                        <h2 className="text-base font-medium">
                            Reset Your Password
                        </h2>
                    </div>

                    <p className="mt-1 text-xs text-muted-foreground">
                        Update your password to keep your account secure.
                    </p>
                </div>

                <form
                    onSubmit={handlePasswordReset}
                    className="space-y-5"
                >
                    {/* CURRENT PASSWORD */}
                    <div className="space-y-2">
                        <Label htmlFor="current-password">
                            Current password
                        </Label>

                        <div className="relative">
                            <Input
                                id="current-password"
                                type={showCurrentPassword ? "text" : "password"}
                                value={currentPassword}
                                onChange={(event) =>
                                    setCurrentPassword(event.target.value)
                                }
                                placeholder="Enter current password"
                                autoComplete="current-password"
                                required
                                disabled={saving}
                                className="h-12 rounded-md pr-11"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowCurrentPassword((value) => !value)
                                }
                                aria-label={
                                    showCurrentPassword
                                        ? "Hide current password"
                                        : "Show current password"
                                }
                                aria-pressed={showCurrentPassword}
                                className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-md text-muted-foreground transition-colors hover:text-foreground"
                            >
                                {showCurrentPassword ? (
                                    <EyeOff className="size-4" />
                                ) : (
                                    <Eye className="size-4" />
                                )}
                            </button>
                        </div>

                        <p className="text-xs text-muted-foreground">
                            Enter your existing account password.
                        </p>
                    </div>

                    {/* NEW PASSWORD */}
                    <div className="space-y-2">
                        <Label htmlFor="new-password">
                            New password
                        </Label>

                        <div className="relative">
                            <Input
                                id="new-password"
                                type={showNewPassword ? "text" : "password"}
                                value={newPassword}
                                onChange={(event) =>
                                    setNewPassword(event.target.value)
                                }
                                placeholder="Create a new password"
                                autoComplete="new-password"
                                minLength={8}
                                required
                                disabled={saving}
                                className="h-12 rounded-md pr-11"
                                aria-label="New password input field"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowNewPassword((value) => !value)
                                }
                                aria-label={
                                    showNewPassword
                                        ? "Hide new password"
                                        : "Show new password"
                                }
                                aria-pressed={showNewPassword}
                                className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-md text-muted-foreground transition-colors hover:text-foreground"
                            >
                                {showNewPassword ? (
                                    <EyeOff className="size-4" />
                                ) : (
                                    <Eye className="size-4" />
                                )}
                            </button>
                        </div>

                        <p className="text-xs text-muted-foreground">
                            Use at least 8 characters and include a number.
                        </p>
                    </div>

                    {/* CONFIRM PASSWORD */}
                    <div className="space-y-2">
                        <Label htmlFor="confirm-password">
                            Confirm new password
                        </Label>

                        <div className="relative">
                            <Input
                                id="confirm-password"
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(event) =>
                                    setConfirmPassword(event.target.value)
                                }
                                placeholder="Re-enter your new password"
                                autoComplete="new-password"
                                required
                                disabled={saving}
                                className="h-12 rounded-md pr-11"
                                aria-label="Confirm new password input field"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword((value) => !value)
                                }
                                aria-label={
                                    showConfirmPassword
                                        ? "Hide confirmation password"
                                        : "Show confirmation password"
                                }
                                aria-pressed={showConfirmPassword}
                                className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-md text-muted-foreground transition-colors hover:text-foreground"
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="size-4" />
                                ) : (
                                    <Eye className="size-4" />
                                )}
                            </button>
                        </div>

                        {confirmPassword && (
                            <p
                                className={`text-xs ${
                                    newPassword === confirmPassword
                                        ? "text-green-500"
                                        : "text-destructive"
                                }`}
                            >
                                {newPassword === confirmPassword
                                    ? "Passwords match."
                                    : "Passwords do not match."}
                            </p>
                        )}
                    </div>

                    {/* STATUS MESSAGES */}
                    {error && (
                        <p
                            role="alert"
                            className="rounded-md bg-destructive/10 p-3 text-sm text-destructive"
                        >
                            {error}
                        </p>
                    )}

                    {success && (
                        <p
                            role="status"
                            className="rounded-md bg-green-500/10 p-3 text-sm text-green-600"
                        >
                            {success}
                        </p>
                    )}

                    {/* SUBMIT */}
                    <Button
                        type="submit"
                        disabled={saving}
                        className="w-full rounded-md h-12"
                    >
                        {saving ? (
                            <>
                                <LoaderCircle className="mr-2 size-4 animate-spin" />
                                Updating password...
                            </>
                        ) : (
                            <>
                                <ShieldCheck className="mr-2 size-4" />
                                Reset To New Password
                            </>
                        )}
                    </Button>
                </form>
            </div>
        </div>
    )
}
