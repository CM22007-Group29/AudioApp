import api from "./api"
import { User } from "../types/User"

// Get all users
export const getUsers = async (): Promise<User[]> => {
  const response = await api.get("/users")
  return response.data
}

// Get specific user
export const getUser = async (id: number): Promise<User> => {
  const response = await api.get(`/users/${id}`)
  return response.data
}

// Create new user
export const createUser = async (user: Omit<User, "id">): Promise<User> => {
  const response = await api.post("/users", user)
  return response.data
}

// Update existing user
export const updateUser = async (id: number, user: Partial<User>): Promise<User> => {
  const response = await api.put(`/users/${id}`, user)
  return response.data
}

// Delete existing user
export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`)
}
