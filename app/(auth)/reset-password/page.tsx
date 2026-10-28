import AuthShell from "../_components/auth-shell"
import ResetForm from "./reset-form"

export default function ResetPasswordPage() {
  return (
    <AuthShell
      heroTitle="Fresh start"
      heroSubtitle="Set a new password and get back to the music."
    >
      <ResetForm />
    </AuthShell>
  )
}
