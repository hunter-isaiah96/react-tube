// import { useRouter } from "next/navigation"
import { getVideo, getFile } from "@/app/connect"
async function Video({ params }) {
  const video = await getVideo(params.id)

  // const router = useRouter()
  return (
    <>
      <div sx={{ margin: "auto" }}>
        <video
          src={getFile(video.collectionId, video.id, video.video)}
          controls
        ></video>
      </div>
    </>
  )
}

export default Video
