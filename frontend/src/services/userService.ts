import api from "./api"
import { User } from "../types/User"
import { UserPreferences } from "../types/UserPreferences"


// Exports data to the format found in types/User
export const getUsers = async (): Promise<User[]> => {
  // Get all users
  const response = await api.get("/users")
  return response.data
}

export const getUser = async (id: number): Promise<User> => {
  // Get specific user
  const response = await api.get(`/users/${id}`)
  return response.data
}

export const createUser = async (user: Omit<User, "id">): Promise<User> => {
  // Create new user
  // will need to make a User object and pass to function, don't need to pass id
  const response = await api.post("/users", user)
  return response.data
}

export const updateUser = async (id: number, user: Partial<User>): Promise<User> => {
  // Update existing user
  const response = await api.put(`/users/${id}`, user)
  return response.data
}

export const deleteUser = async (id: number): Promise<void> => {
  // Delete existing user
  await api.delete(`/users/${id}`)
}


// Exports data to the format found in types/UserPreferences
export const getUserPreferences = async (user_id: number): Promise<UserPreferences> => {
  // Get specific user's preferences
  const response = await api.get(`/users/${user_id}/preferences`)
  return response.data
}

export const createUserPreferences = async (user_id: number, user: Omit<UserPreferences, "id">): Promise<User> => {
  // Create new user preferences
  // will need to make a UserPreferences object and pass to function, don't need to pass id
  const response = await api.post(`/users/${user_id}/preferences`, user)
  return response.data
}

export const deleteUserPreferences = async (user_id: number): Promise<void> => {
  // Delete existing user preferences
  await api.delete(`/users/${user_id}/preferences`)
}
