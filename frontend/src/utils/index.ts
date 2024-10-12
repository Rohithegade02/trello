import { Task } from '../interfaces'

export function formatDateTime(date: Task['createdAt']) {
  const dateOptions = {
    year: 'numeric' as const,
    month: 'long' as const,
    day: 'numeric' as const,
  }

  const timeOptions = {
    hour: '2-digit' as const,
    minute: '2-digit' as const,
    second: '2-digit' as const,
    hour12: true,
  }

  const formattedDate = new Date(date as string).toLocaleDateString(
    'en-US',
    dateOptions,
  )
  const formattedTime = new Date(date as string).toLocaleTimeString(
    'en-US',
    timeOptions,
  )

  return `${formattedDate} at ${formattedTime}`
}
