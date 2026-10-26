"use client"
import { useEffect, useRef, useState } from "react"
import { BackIcon, CloseIcon, MicIcon, WaveIcon } from "./icon"

interface Props {
  value: string
  onChange: (v: string) => void
  onSubmit: (v: string) => void
  onBack?: () => void
}

export default function SearchBar({
  value,
  onChange,
  onSubmit,
  onBack,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [listening, setListening] = useState(false)

  useEffect(() => inputRef.current?.focus(), [])

  // Voice search using the browser Web Speech API (Chrome / Edge / Android)
  const startVoice = () => {
    const SR =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition
    if (!SR) {
      alert("Voice search is not supported in this browser.")
      return
    }
    const rec = new SR()
    rec.lang = "en-US" // use "si-LK" for Sinhala
    rec.onstart = () => setListening(true)
    rec.onend = () => setListening(false)
    rec.onresult = (e: any) => {
      const text = e.results[0][0].transcript as string
      onChange(text)
      onSubmit(text)
    }
    rec.start()
  }

  return (
    <div className="ms-searchrow">
      <form
        className="ms-searchbar"
        role="search"
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit(value)
        }}
      >
        <button
          type="button"
          className="ms-icon-btn"
          aria-label="Back"
          onClick={onBack}
        >
          <BackIcon />
        </button>

        <input
          ref={inputRef}
          className="ms-input"
          type="text"
          placeholder="Type to search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          enterKeyHint="search"
          autoComplete="off"
        />

        {value ? (
          <button
            type="button"
            className="ms-icon-btn"
            aria-label="Clear"
            onClick={() => onChange("")}
          >
            <CloseIcon />
          </button>
        ) : (
          <button
            type="button"
            className={`ms-icon-btn ${listening ? "is-listening" : ""}`}
            aria-label="Search by voice"
            onClick={startVoice}
          >
            <MicIcon />
          </button>
        )}
      </form>

      <button type="button" className="ms-round-btn" aria-label="Identify song">
        <WaveIcon />
      </button>
    </div>
  )
}
