import AuthShell from "../_components/auth-shell"
import ForgotForm from "./forgot-form"

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      heroTitle="No worries"
      heroSubtitle="It happens to the best of us. Let's get you back in."
    >
      <ForgotForm />
    </AuthShell>
  )
}
