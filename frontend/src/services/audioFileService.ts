import API_BASE_URL from "./api"
import { AudioFile } from "../types/AudioFile"

// Create new audio file
// handle the file upload
// https://www.dhiwise.com/post/how-to-use-react-dropzone-a-complete-guide-with-examples


export const createAudioFile = async (acceptedFiles: File[]) => {
  console.log("inside createAudioFile")
  const formData = new FormData()
  formData.append('file', acceptedFiles[0])

  console.log(formData)

  // change 'backend_endpoint to the actual endpoint
  fetch(API_BASE_URL+'/files/upload', {
      method: 'POST',
      body: formData,
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error))
}