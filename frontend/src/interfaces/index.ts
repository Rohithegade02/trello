export type Status = 'todo' | 'in-progress' | 'done'

export interface Task {
  id: number
  description: string
  status: Status
  createdAt: string
}

export interface User {
  firstname: string
  lastname: string
  email: string
  password: string
  confirmPassword: string
}
export interface LoginUser {
  email: string
  password: string
}
