export type ActionResult = { error: string | null }

export type FieldErrors<T extends string> = Partial<Record<T, string>>
