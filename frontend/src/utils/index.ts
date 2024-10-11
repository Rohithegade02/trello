import { Task } from '../interfaces'

export function formatDateTime(date: Task['createdAt']) {
  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
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
