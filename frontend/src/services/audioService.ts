import api from "./api"
import { Audio } from "../types/Audio"
import { AudioProcessing } from "../types/AudioProcessing"

export const uploadAudio = async (user_id: number, file: FormData): Promise<Audio> => {
    const response = await api.post(`http://127.0.0.1:4040/audio/${user_id}`, file, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
  }

  export const getAudio = async (user_id: number): Promise<Blob> => {
    const response = await fetch(`http://127.0.0.1:4040/api/audio/${user_id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch audio");
    }
    return response.blob();
}

export const processAudio = async (user_id: number): Promise<AudioProcessing> => {
    const response = await api.get(`http://127.0.0.1:4040/audio/${user_id}/process`)
    return response.data
}

export const getProcessedAudio = async (user_id: number): Promise<File> => {
    const response = await api.get(`http://127.0.0.1:4040/audio/${user_id}/process`)
    return response.data
}

