import AuthShell from "../_components/auth-shell"
import LoginForm from "./login-form"

export default function LoginPage() {
  return (
    <AuthShell
      heroTitle="Welcome back"
      heroSubtitle="Your music. Your chords. Your creativity."
    >
      <LoginForm />
    </AuthShell>
  )
}
