import api from "./api"
import { Audio } from "../types/Audio"
import { AudioProcessing } from "../types/AudioProcessing"
import { Word } from "../components/AudioContext"

export const uploadAudio = async (user_id: number, file: FormData): Promise<Audio> => {
    const response = await api.post(`audio/${user_id}`, file, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
  }

export const getAudio = async (user_id: number): Promise<Blob> => {
  const response = await api.get(`audio/${user_id}`, {
    responseType: 'blob'
  });
  return response.data;
};

export const processAudio = async (user_id: number, words: Word[]): Promise<AudioProcessing> => {
    const response = await api.post(`audio/${user_id}/process`, words);
    return response.data
}

export const getProcessedAudio = async (user_id: number): Promise<File> => {
    const response = await api.get(`audio/${user_id}/process`, {
    responseType: 'blob'
  });
    return response.data
}

export const getTimestamps = async (user_id: number): Promise<Word[]> => {
    const response = await api.get(`audio/${user_id}/timestamps`)
    // const data = {"word_timestamps":[{"endTime":949,"isRemoved":false,"startTime":729,"word":"Hey,"},{"endTime":1630,"isRemoved":false,"startTime":1490,"word":"I'm"},{"endTime":1730,"isRemoved":false,"startTime":1670,"word":"an"},{"endTime":2251,"isRemoved":false,"startTime":1830,"word":"AI,"},{"endTime":2471,"isRemoved":false,"startTime":2391,"word":"and"}]};
    return response.data["word_timestamps"];
    // return data["word_timestamps"];
}