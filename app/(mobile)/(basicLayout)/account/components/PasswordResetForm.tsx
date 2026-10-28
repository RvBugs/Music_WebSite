import { LoaderCircle, LockKeyhole, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { usePasswordReset } from "../hooks/usePasswordReset"
import { getPasswordChecks, MIN_PASSWORD_LENGTH } from "../lib/passwordRules"
import { FormMessage } from "./FormMessage"
import { PasswordChecklist } from "./PasswordChecklist"
import { PasswordField } from "./PasswordField"

type PasswordResetFormProps = {
  email: string | null
}

export function PasswordResetForm({ email }: PasswordResetFormProps) {
  const {
    fields,
    visible,
    error,
    success,
    saving,
    setField,
    toggleVisible,
    submit,
  } = usePasswordReset(email)

  const checks = getPasswordChecks(fields.next, fields.confirm)

  return (
    <section className="rounded-2xl border bg-card p-5 shadow-sm">
      <header className="mb-5 flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <LockKeyhole className="size-4" />
        </span>

        <div>
          <h2 className="text-base font-semibold">Reset Your Password</h2>

          <p className="mt-0.5 text-xs text-muted-foreground">
            Update your password to keep your account secure.
          </p>
        </div>
      </header>

      <form onSubmit={submit} className="space-y-5">
        <PasswordField
          id="current-password"
          label="Current password"
          toggleNoun="current password"
          value={fields.current}
          visible={visible.current}
          placeholder="Enter current password"
          autoComplete="current-password"
          disabled={saving}
          onChange={(value) => setField("current", value)}
          onToggle={() => toggleVisible("current")}
          hint="Enter your existing account password."
        />

        <PasswordField
          id="new-password"
          label="New password"
          toggleNoun="new password"
          value={fields.next}
          visible={visible.next}
          placeholder="Create a new password"
          autoComplete="new-password"
          minLength={MIN_PASSWORD_LENGTH}
          inputLabel="New password input field"
          disabled={saving}
          onChange={(value) => setField("next", value)}
          onToggle={() => toggleVisible("next")}
        />

        <PasswordField
          id="confirm-password"
          label="Confirm new password"
          toggleNoun="confirmation password"
          value={fields.confirm}
          visible={visible.confirm}
          placeholder="Re-enter your new password"
          autoComplete="new-password"
          inputLabel="Confirm new password input field"
          disabled={saving}
          onChange={(value) => setField("confirm", value)}
          onToggle={() => toggleVisible("confirm")}
        />

        <PasswordChecklist checks={checks} />

        {error && <FormMessage tone="error">{error}</FormMessage>}
        {success && <FormMessage tone="success">{success}</FormMessage>}

        <Button type="submit" disabled={saving} className="h-12 w-full rounded-xl">
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
    </section>
  )
}
