import type { ComponentType, ReactNode } from "react"

type DetailRowProps = {
  icon: ComponentType<{ className?: string }>
  label: string
  children: ReactNode
}

export function DetailRow({ icon: Icon, label, children }: DetailRowProps) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="size-4" />
      </span>

      <div className="min-w-0 flex-1">
        <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </dt>

        <dd className="mt-0.5 text-sm break-words">{children}</dd>
      </div>
    </div>
  )
}
