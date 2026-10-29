import type { ReactNode } from "react"
import { LoaderCircle } from "lucide-react"

import { Button } from "@/components/ui/button"

type SubmitButtonProps = {
  loading: boolean
  label: string
  loadingLabel: string
  icon?: ReactNode
}

export default function SubmitButton({
  loading,
  label,
  loadingLabel,
  icon,
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      disabled={loading}
      className="h-11 w-full rounded-xl text-sm font-medium"
    >
      {loading ? (
        <>
          {loadingLabel}
          <LoaderCircle className="ml-2 size-4 animate-spin" />
        </>
      ) : (
        <>
          {label}
          {icon && <span className="ml-2 [&>svg]:size-4">{icon}</span>}
        </>
      )}
    </Button>
  )
}
