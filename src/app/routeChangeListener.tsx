"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { resetUploadVideoForm } from "./zustand/uploadVideo"

export function RouteChangeListener() {
  const pathname = usePathname()
  const [previousPath, setPreviousPath] = useState<string>("") // State to store previous path

  useEffect(() => {
    if (previousPath === "/upload") {
      resetUploadVideoForm() // Call resetUploadVideoForm if the previous route was /upload
    }
    setPreviousPath(pathname) // Update previousPath with the current pathname
  }, [pathname, previousPath])

  return <></>
}
