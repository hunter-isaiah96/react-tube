import { create, type StateCreator } from "zustand"
import { PreviewImage } from "../helpers/video"

const sliceResetFns = new Set<() => void>()

export const resetAllSlices = () => {
  sliceResetFns.forEach((resetFn) => {
    resetFn()
  })
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

type UploadVideoState = UploadVideoForm & VideoUpload

const uploadVideoForm: StateCreator<UploadVideoForm> = (set) => ({
  title: "",
  description: "",
  tags: [],
  setTitle: (title: string) => set({ title }),
  setDescription: (description: string) => set({ description }),
  setTags: (tags: string[]) => set({ tags }),
})

const videoUpload: StateCreator<VideoUpload> = (set, get) => ({
  videoFile: null,
  videoThumbnails: [],
  selectedThumbnail: "",
  isLoadingVideo: false,
  isUploadingVideo: false,
  setVideoFile: (videoFile: Blob) => set({ videoFile }),
  setVideoThumbnails: (videoThumbnails: PreviewImage[]) => set({ videoThumbnails }),
  setSelectedThumbnail: (selectedThumbnail: string) => set({ selectedThumbnail }),
  setLoadingVideo: (isLoadingVideo: boolean) => set({ isLoadingVideo }),
  setIsUploadingVideo: (isUploadingVideo: boolean) => set({ isUploadingVideo }),
})

export const useUploadVideoStore = create<UploadVideoState>()((...args) => ({
  ...uploadVideoForm(...args),
  ...videoUpload(...args),
}))
