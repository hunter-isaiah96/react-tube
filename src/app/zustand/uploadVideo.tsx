import { create, type StateCreator } from "zustand"
import { PreviewImage } from "../helpers/video"
import { base64ToBlob } from "../helpers/video"
import { type VideosResponse } from "../pocketbase-types"
import db from "../helpers/connect"
import { useAuthStore } from "./user"

const sliceResetFns = new Set<() => void>()
export const resetUploadVideoForm = () => {
  sliceResetFns.forEach((resetFn) => {
    resetFn()
  })
}

type FormSubmission = {
  uploadVideo: () => Promise<VideosResponse>
}

type UploadVideoForm = {
  title: string
  description: string
  tags: string[]
  setTitle: (title: string) => void
  setDescription: (description: string) => void
  setTags: (tags: string[]) => void
}

type VideoUpload = {
  videoFile: Blob | null
  videoThumbnails: PreviewImage[]
  selectedThumbnail: string
  isLoadingVideo: boolean
  isUploadingVideo: boolean
  setVideoFile: (videoFile: Blob) => void
  setVideoThumbnails: (videoThumbnails: PreviewImage[]) => void
  setSelectedThumbnail: (selectedThumbnail: string) => void
  setLoadingVideo: (isLoadingVideo: boolean) => void
  setIsUploadingVideo: (isUploadingVideo: boolean) => void
}

type UploadVideoState = FormSubmission & UploadVideoForm & VideoUpload
const initialUploadVideoForm = {
  title: "",
  description: "",
  tags: [],
}
const uploadVideoForm: StateCreator<UploadVideoForm> = (set) => {
  sliceResetFns.add(() => set(initialUploadVideoForm))
  return {
    title: "",
    description: "",
    tags: [],
    setTitle: (title: string) => set({ title }),
    setDescription: (description: string) => set({ description }),
    setTags: (tags: string[]) => set({ tags }),
  }
}
const initialStateVideoUpload = {
  videoFile: null,
  videoThumbnails: [],
  selectedThumbnail: "",
  isLoadingVideo: false,
  isUploadingVideo: false,
}
const videoUpload: StateCreator<VideoUpload> = (set) => {
  sliceResetFns.add(() => set(initialStateVideoUpload))
  return {
    ...initialStateVideoUpload,
    setVideoFile: (videoFile: Blob) => set({ videoFile }),
    setVideoThumbnails: (videoThumbnails: PreviewImage[]) => set({ videoThumbnails }),
    setSelectedThumbnail: (selectedThumbnail: string) => set({ selectedThumbnail }),
    setLoadingVideo: (isLoadingVideo: boolean) => set({ isLoadingVideo }),
    setIsUploadingVideo: (isUploadingVideo: boolean) => set({ isUploadingVideo }),
  }
}

const uploadForm: StateCreator<UploadVideoForm & VideoUpload, [], [], FormSubmission> = (set, get) => ({
  uploadVideo: async (): Promise<VideosResponse> => {
    return new Promise<VideosResponse>(async (resolve, reject) => {
      const { user } = useAuthStore.getState()
      try {
        set(() => ({ isUploadingVideo: true }))
        const videoFile = get().videoFile
        let thumb = get().videoThumbnails.find((thumbnail) => thumbnail.id == get().selectedThumbnail)
        if (!videoFile || !thumb || !user) return
        const formData = new FormData()
        formData.append("video", videoFile)
        formData.append("title", get().title)
        formData.append("description", get().description)
        formData.append("thumbnail", base64ToBlob(thumb.image.split(",")[1]))
        formData.append("tags", JSON.stringify(get().tags))
        formData.append("user", user.id)
        const videoRecord = (await db.client.collection("videos").create(formData)) as VideosResponse
        resolve(videoRecord)
      } catch (error) {
        reject(error)
      } finally {
        set(() => ({ isUploadingVideo: false }))
        resetUploadVideoForm()
      }
    })
  },
})

export const useUploadVideoStore = create<UploadVideoState>()((...args) => ({
  ...uploadVideoForm(...args),
  ...videoUpload(...args),
  ...uploadForm(...args),
}))
