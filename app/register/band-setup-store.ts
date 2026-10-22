import { create } from "zustand"

export type SetupPage = "name" | "avatar" | "credential"

export type BandSetupErrors = {
  bandName?: string
  bandDescription?: string
  bandCover?: string
  email?: string
  password?: string
}

type BandSetupState = {
  setupPage: SetupPage
  bandName: string
  bandDescription: string
  bandCover: File | null
  email: string
  password: string
  errors: BandSetupErrors

  setSetupPage: (page: SetupPage) => void
  setBandName: (name: string) => void
  setBandDescription: (description: string) => void
  setBandCover: (cover: File | null) => void
  setEmail: (email: string) => void
  setPassword: (password: string) => void

  validateName: () => boolean
  validateCover: () => boolean
  validateCredentials: () => boolean
  validateAll: () => boolean
  reset: () => void
}

const initialState = {
  setupPage: "name" as SetupPage,
  bandName: "",
  bandDescription: "",
  bandCover: null as File | null,
  email: "",
  password: "",
  errors: {} as BandSetupErrors,
}

const MAX_COVER_SIZE = 5 * 1024 * 1024

function validateBandName(name: string): string | undefined {
  if (!name.trim()) return "Band name is required."
  return undefined
}

function validateBandDescription(description: string): string | undefined {
  if (!description.trim()) return "Band description is required."
  return undefined
}

function validateBandCover(cover: File | null): string | undefined {
  if (!cover) return "Band cover image is required."

  if (cover.size > MAX_COVER_SIZE) {
    return "Image must be 5 MB or smaller."
  }

  if (!["image/png", "image/jpeg", "image/webp"].includes(cover.type)) {
    return "Image must be PNG, JPG, or WebP."
  }

  return undefined
}

function validateEmail(email: string): string | undefined {
  if (!email.trim()) return "Email is required."

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(email.trim())) {
    return "Enter a valid email address."
  }

  return undefined
}

function validatePassword(password: string): string | undefined {
  if (!password) return "Password is required."

  if (password.length < 8) {
    return "Password must be at least 8 characters."
  }

  if (!/\d/.test(password)) {
    return "Password must contain at least one number."
  }

  return undefined
}

export const useBandSetupStore = create<BandSetupState>((set, get) => ({
  ...initialState,

  setSetupPage: (setupPage) => set({ setupPage }),

  setBandName: (bandName) =>
    set((state) => ({
      bandName,
      errors: { ...state.errors, bandName: undefined },
    })),

  setBandDescription: (bandDescription) =>
    set((state) => ({
      bandDescription,
      errors: { ...state.errors, bandDescription: undefined },
    })),

  setBandCover: (bandCover) =>
    set((state) => ({
      bandCover,
      errors: { ...state.errors, bandCover: undefined },
    })),

  setEmail: (email) =>
    set((state) => ({
      email,
      errors: { ...state.errors, email: undefined },
    })),

  setPassword: (password) =>
    set((state) => ({
      password,
      errors: { ...state.errors, password: undefined },
    })),

  validateName: () => {
    const { bandName, bandDescription } = get()

    const errors: BandSetupErrors = {
      bandName: validateBandName(bandName),
      bandDescription: validateBandDescription(bandDescription),
    }

    set((state) => ({
      errors: { ...state.errors, ...errors },
    }))

    return !errors.bandName && !errors.bandDescription
  },

  validateCover: () => {
    const error = validateBandCover(get().bandCover)

    set((state) => ({
      errors: { ...state.errors, bandCover: error },
    }))

    return !error
  },

  validateCredentials: () => {
    const { email, password } = get()

    const errors: BandSetupErrors = {
      email: validateEmail(email),
      password: validatePassword(password),
    }

    set((state) => ({
      errors: { ...state.errors, ...errors },
    }))

    return !errors.email && !errors.password
  },

  validateAll: () => {
    const { bandName, bandDescription, bandCover, email, password } = get()

    const errors: BandSetupErrors = {
      bandName: validateBandName(bandName),
      bandDescription: validateBandDescription(bandDescription),
      bandCover: validateBandCover(bandCover),
      email: validateEmail(email),
      password: validatePassword(password),
    }

    set({ errors })

    return Object.values(errors).every((error) => !error)
  },

  reset: () => set({ ...initialState }),
}))
