import { FileText, Mail, Music2, UserRound } from "lucide-react"

import { DetailRow } from "./DetailRow"
import type { UserInfo } from "../types"

type ProfileDetailsProps = {
  user: UserInfo
}

export function ProfileDetails({ user }: ProfileDetailsProps) {
  return (
    <section className="rounded-2xl border bg-card p-5 shadow-sm">
      <h2 className="mb-4 text-sm font-semibold">Profile details</h2>

      <dl className="space-y-4">
        <DetailRow icon={UserRound} label="Name">
          <span className="font-medium">{user.name || "No name provided"}</span>
        </DetailRow>

        <DetailRow icon={Mail} label="Email">
          <span className="font-medium break-all">
            {user.email || "No email available"}
          </span>
        </DetailRow>

        <DetailRow icon={Music2} label="Band">
          <span className="font-medium">{user.name || "No band name"}</span>
        </DetailRow>

        <DetailRow icon={FileText} label="Description">
          <span className="leading-relaxed">
            {user.description || "No description provided"}
          </span>
        </DetailRow>
      </dl>
    </section>
  )
}
