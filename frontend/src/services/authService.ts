import auth from "./auth"
import { getUser } from "./userService"
import { User } from "../types/User"

export const signup = async (user: Omit<User, "id">): Promise<User> => {
    // returns user object if successful, doesn't handle existing user
    const response = await auth.post("/signup", user)
    return response.data
  }

export const login = async (username: string): Promise<User> => {
    // returns user object if successful, doesn't handle if user doesn't exist
    const response = await auth.post("/login", { username: username })
    
    const user = await getUser(response.data.user_id)
    return user
  }

export const logout = async (user_id: number): Promise<number> => {
  const response = await auth.get(`/logout/${user_id}`)
  // returns 200 if user is found and logged out, 400 if unsuccessful
  return response.status
}
