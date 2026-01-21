export interface User {
  id: string
  email: string
  name: string
  role: "admin"
}

export interface AuthState {
  user: User | null
  isLoading: boolean
}

