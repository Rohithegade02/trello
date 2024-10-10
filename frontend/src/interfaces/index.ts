export type Status = 'todo' | 'in-progress' | 'done'

export interface Data {
  id: number
  description: string
  status: Status
  createdAt: string
}
