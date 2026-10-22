"use client"

import logoutAction from "@/app/(mobile)/(basicLayout)/logout-action"

export default function Logout() {
  return (
    <div>
      <button onClick={() => logoutAction()}>logout</button>
    </div>
  )
}