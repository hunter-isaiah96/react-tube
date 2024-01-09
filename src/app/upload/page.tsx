import { Metadata } from "next"
import UploadComponent from "../components/upload/uploadComponent"

export const metadata: Metadata = {
  title: "Upload Video",
}

export default function Upload() {
  return <UploadComponent />
}
