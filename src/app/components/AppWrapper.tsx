"use client"
import React from "react"
import usePBAuth from "../hooks/usePBAuth"

function AppWrapper({ children }: { children: React.ReactNode }) {
  usePBAuth()
  return <div>{children}</div>
}

export default AppWrapper
