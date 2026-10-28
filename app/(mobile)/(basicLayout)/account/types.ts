export type UserInfo = {
  id: string
  email: string | null
  name: string
  description: string
  avatar: string | null
}

export type FieldKey = "current" | "next" | "confirm"

export type PasswordFields = Record<FieldKey, string>

export type FieldVisibility = Record<FieldKey, boolean>
