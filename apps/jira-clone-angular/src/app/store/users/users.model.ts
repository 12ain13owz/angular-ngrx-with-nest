export interface User {
  _id: string
  email: string
  name: string
}

export interface UserState {
  users: User[]
  isLoading: boolean
  error: string | null
}
