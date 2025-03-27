export interface UserPreferences {
    id: number
    user_id: number
    normalise: boolean
    extra_words: string
    silence_length: number
    silence_threshold: number
  }