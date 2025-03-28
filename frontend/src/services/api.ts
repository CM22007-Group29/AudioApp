import axios from 'axios'

// Backend api url
const API_BASE_URL = "http://127.0.0.1:4040/api"

// creates generic instance of api call
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
})

export default api