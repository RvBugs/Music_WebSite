import "../components/styless.css"

import {useState } from "react"
import { FormEvent } from "react"
//import { Form } from "@base-ui/react"

export default function ChangePassword({ onChange, onError } : {onChange :(password:string) => void | Promise<void>, onError:(message: string) => void}) {
  const [pw1, setPw1] = useState("")
  const [pw2, setPw2] = useState("")

  const handleSubmit = async (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (pw1 !== pw2) {
      onError("Passwords don't match")
      return
    }
    await onChange(pw1)
    setPw1("")
    setPw2("")
  }

  return (
    <section className="card">
      <h2>Change password</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div>
            <label>New password</label>
            <input
              type="password"
              minLength={8}
              required
              value={pw1}
              onChange={(e) => setPw1(e.target.value)}
            />
          </div>
          <div>
            <label>Confirm password</label>
            <input
              type="password"
              minLength={8}
              required
              value={pw2}
              onChange={(e) => setPw2(e.target.value)}
            />
          </div>
        </div>
        <div className="actions">
          <button type="submit">Update password</button>
        </div>
      </form>
    </section>
  )
}
