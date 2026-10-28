import { Avatar } from "./Avatar"
import type { UserInfo } from "../types"

type ProfileHeroProps = {
  user: UserInfo
}

export function ProfileHero({ user }: ProfileHeroProps) {
  return (
    <section className="overflow-hidden rounded-2xl border bg-card shadow-sm">
      {/* banner: the avatar again, blurred, under a soft gradient */}
      <div className="relative h-36 w-full overflow-hidden bg-linear-to-br from-primary/30 via-primary/10 to-muted">
        {user.avatar && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.avatar}
            alt="Cover photo"
            className="h-full w-full scale-110 object-cover opacity-60 blur-sm"
          />
        )}

        <div className="absolute inset-0 bg-linear-to-t from-card/80 to-transparent" />
      </div>

      <div className="flex items-end gap-4 px-5 pb-5">
        <Avatar src={user.avatar} className="-mt-12" />

        <div className="min-w-0 pb-1">
          <h1 className="truncate text-lg font-semibold leading-tight">
            {user.name || "No name provided"}
          </h1>

          <p className="truncate text-sm text-muted-foreground">
            {user.email || "No email available"}
          </p>
        </div>
      </div>
    </section>
  )
}
