const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const validateName = (v: string) => {
  if (!v.trim()) return "Username is required"
  if (v.trim().length < 2) return "Username must be at least 2 characters"
  return null
}

export const validateEmail = (v: string) => {
  if (!v.trim()) return "Email is required"
  if (!EMAIL_RE.test(v.trim()))
    return "Enter a valid email like name@example.com"
  return null
}

export const validatePassword = (v: string) => {
  if (!v) return "Password is required"
  if (v.length < 8) return "Password must be at least 8 characters"
  if (!/[A-Za-z]/.test(v) || !/\d/.test(v))
    return "Password needs at least one letter and one number"
  return null
}
