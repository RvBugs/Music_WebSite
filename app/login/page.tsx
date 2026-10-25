"use client"

import { useState, type FormEvent } from "react"
import { AnimatePresence, motion } from "motion/react"
import { useRouter } from "next/navigation"
import { LoaderCircle, LogIn } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import loginAction from "./loginAction"
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (loading) return

        setError("")
        setLoading(true)

        try {
            const result = await loginAction(email.trim(), password)

            if (result.error) {
                setError(result.error)
                return
            }

            router.replace("/")
            router.refresh()
        } catch (error) {
            console.error("Login failed:", error)
            setError("Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const panelHeight = "70dvh"

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
                        key="login-heading"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{
                            duration: 0.2,
                            ease: "easeInOut",
                        }}
                    >
                        <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-lg">
                            Welcome Back
                        </h1>

                        <p className="mt-2 text-sm text-white/80">
                            Your music. Your chords. Your creativity.
                        </p>
                    </motion.div>
                </AnimatePresence>
            </motion.div>

            {/* Shared animated panel */}
            <motion.div
                className="absolute inset-x-0 bottom-0 z-20 w-full overflow-y-auto rounded-t-2xl bg-background px-6 py-8 sm:py-12"
                initial={{ height: panelHeight }}
                animate={{ height: panelHeight }}
                transition={{
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                }}
            >
                <div className="mx-auto w-full max-w-md">
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key="login-form"
                            initial={{ opacity: 0, x: 16 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -16 }}
                            transition={{
                                duration: 0.25,
                                ease: "easeInOut",
                            }}
                        >
                            <div className="pb-6">
                                <h2 className="text-lg font-medium">
                                    Sign In
                                </h2>

                                <p className="text-xs text-muted-foreground">
                                    Sign in to continue to your account.
                                </p>
                            </div>

                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-col gap-4"
                            >
                                {/* Email */}
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="email">
                                        Email Address
                                    </Label>

                                    <Input
                                        id="email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder="e.g. mybandname@gmail.com"
                                        value={email}
                                        onChange={(event) =>
                                            setEmail(event.target.value)
                                        }
                                        className="rounded-md"
                                        aria-invalid={!!error}
                                        required
                                        disabled={loading}
                                        aria-label="email"
                                    />

                                    <p className="text-xs text-muted-foreground">
                                        Enter the email address associated
                                        with your account.
                                    </p>
                                </div>

                                {/* Password */}
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="password">
                                        Password
                                    </Label>

                                    <Input
                                        id="password"
                                        type="password"
                                        autoComplete="current-password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(event) =>
                                            setPassword(event.target.value)
                                        }
                                        className="rounded-md"
                                        aria-invalid={!!error}
                                        required
                                        disabled={loading}
                                        aria-label="password"
                                    />

                                    <p className="text-xs text-muted-foreground">
                                        Enter your account password.
                                    </p>
                                </div>

                                {/* Error message */}
                                {error && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        role="alert"
                                        className="rounded-md bg-destructive/10 p-3 text-xs text-destructive"
                                    >
                                        {error}
                                    </motion.p>
                                )}

                                {/* Submit */}
                                <Button
                                    type="submit"
                                    className="mt-4 h-10 w-full rounded-xl font-medium"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            Signing In
                                            <LoaderCircle className="ml-2 size-5 animate-spin" />
                                        </>
                                    ) : (
                                        <>
                                            Sign In
                                            <LogIn className="ml-2 size-5" />
                                        </>
                                    )}
                                </Button>
                                <p className="text-sm text-muted-foreground">Don&#39;t have a account yet, <Link href="/register" className="text-primary/90 font-semibold underline">Sign Up</Link></p>
                            </form>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    )
}