type LoadErrorProps = {
  message?: string
}

export function LoadError({ message }: LoadErrorProps) {
  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-destructive/30 bg-destructive/5 p-8 text-center">
      <p role="alert" className="text-sm font-semibold text-destructive">
        {message || "We could not load your profile."}
      </p>

      <p className="mt-2 text-xs text-muted-foreground">
        Refresh the page to try again.
      </p>
    </div>
  )
}
