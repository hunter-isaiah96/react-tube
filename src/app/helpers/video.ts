import { faker } from "@faker-js/faker"

export type PreviewImage = {
  id: string
  image: string
}

export const getThumbnail = (videoSrc: string, percentage: number): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video")
    video.src = videoSrc
    video.load()

    const onLoadedData = () => {
      const quarterTime = video.duration * (percentage / 100) // Calculate time
      video.currentTime = quarterTime // Set the video's current time

      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")

      const onSeeked = () => {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        ctx?.drawImage(video, 0, 0, canvas.width, canvas.height)

        canvas.toBlob((blob) => {
          // Remove event listeners
          video.removeEventListener("loadeddata", onLoadedData)
          video.removeEventListener("seeked", onSeeked)

          // Clean up elements
          video.src = ""
          video.removeAttribute("src")
          video.load()
          video.remove()
          canvas.remove()

          if (blob) resolve(blob)
        })
      }

      video.addEventListener("seeked", onSeeked)
    }

    video.addEventListener("loadeddata", onLoadedData)
  })
}

export const getThumbnails = (videoSrc: string): Promise<PreviewImage[]> => {
  const percentages = [25, 50, 75]
  const promises: Promise<PreviewImage>[] = []

  const processThumbnail = (percentage: number) => {
    return new Promise<PreviewImage>((resolve, reject) => {
      getThumbnail(videoSrc, percentage)
        .then((blob) => {
          // Convert blob to base64 string
          const reader = new FileReader()
          reader.readAsDataURL(blob)
          reader.onloadend = () => {
            const base64data = reader.result as string
            resolve({ id: faker.number.int().toString(), image: base64data })
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  percentages.forEach((percentage) => {
    const thumbnailPromise = processThumbnail(percentage)
    promises.push(thumbnailPromise)
  })

  return Promise.all(promises)
}

export const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(blob)
    reader.onloadend = () => {
      const base64data = reader.result as string
      resolve(base64data)
    }
  })
}

export const base64ToBlob = (base64String: string, contentType = "image/jpeg") => {
  const byteCharacters = atob(base64String)
  const byteNumbers = new Array(byteCharacters.length)

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }

  const byteArray = new Uint8Array(byteNumbers)
  return new Blob([byteArray], { type: contentType })
}
