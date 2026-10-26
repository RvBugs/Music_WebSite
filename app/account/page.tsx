"use client";

import { useState } from "react";

import DangerZone from "@/components/DangerZone"
import Changepassword from "@/components/changepassword"
import Playlists from "@/components/playlist"
import Header from "@/components/header"
import ProfileCard from "@/components/profileCard"
import ProfileForm from "@/components/profileForm"
import Toast from "@/components/Toast"
import Stats from "@/components/stats"

export default function Account() {
  const [user, setUser] = useState({
    name: "MUSIC LOVER",
    email: "music@example.com",
    avatar: "",
    country: "Sri Lanka",
    genres: ["Pop", "Rock"],
    played: 25,
    playlists: ["Favorites", "Chill"],
  })

  const [message, setMessage] = useState("")

  const handleAddPlaylist = (name: string) => {
    setUser((prev) => ({
      ...prev,
      playlists: [...prev.playlists, name],
    }))
    setMessage("Playlist added successfully")
  }

  const handleRemovePlaylist = (index: number) => {
    setUser((prev) => ({
      ...prev,
      playlists: prev.playlists.filter((_, i) => i !== index),
    }))
    setMessage("Playlist removed successfully")
  }

  const handleSaveProfile = (updatedUser: {
    name: string
    email: string
    country: string
    genres: string[]
  }) => {
    setUser((prev) => ({ ...prev, ...updatedUser }))
    setMessage("Profile saved successfully")
  }

  const handleLogout = () => {
    setMessage("Sign out functionality is not implemented yet")
  }

  return (
    <>
      <Header onLogout={handleLogout} />

      <ProfileCard
        user={{
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        }}
        onAvatarChange={(e) => {
          const file = e.target.files?.[0]

          if (file) {
            const avatarUrl = URL.createObjectURL(file)

            setUser((prev) => ({
              ...prev,
              avatar: avatarUrl,
            }))
          }
        }}
      />

      <ProfileForm
        user={{
          name: user.name,
          email: user.email,
          country: user.country,
          genres: user.genres,
        }}
        onSave={handleSaveProfile}
      />

      <Stats user={user} />

      <Playlists
        playlists={user.playlists}
        onAdd={handleAddPlaylist}
        onRemove={handleRemovePlaylist}
      />

      <Changepassword
        onChange={(password: string) => {
          setMessage("Password change functionality is not connected yet")
        }}
        onError={(errorMessage: string) => {
          setMessage(errorMessage)
        }}
      />

      <DangerZone
        onDelete={() => {
          setMessage("Account deletion functionality is not implemented yet")
        }}
      />

      <Toast message={message} />
    </>
  )
}
