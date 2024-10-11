import { useCallback, useEffect, useState } from 'react'
import { Status, Task } from '../interfaces'
import { getAllTask, updateTask } from '../api/task'

export const useDragAndDrop = () => {
  const [isDragging, setIsDragging] = useState(false)
  const [taskData, setTaskData] = useState<Task[]>([])
  const getTaskData = useCallback(async () => {
    const res = await getAllTask()
    setTaskData(res.tasks)
  }, [])
  useEffect(() => {
    getTaskData()
  }, [getTaskData])

  const handleUpdateList = async (id: string, status: Status) => {
    console.log(id)
    let card = taskData.find(item => item._id === id)

    if (card && card.status !== status) {
      // Update the card's status locally
      card.status = status

      // Update the task in the API
      try {
        await updateTask(id, { ...card }) // Call the update API
        setTaskData(prev => [
          ...prev.filter(item => item._id !== id),
          { ...card }, // Create a new object for the updated card
        ])
      } catch (error) {
        console.error('Failed to update task:', error)
        // Optionally handle error (e.g., show a notification)
      }
    }
  }

  const handleDragging = (dragging: boolean) => setIsDragging(dragging)

  return {
    isDragging,
    taskData,
    handleUpdateList,
    handleDragging,
  }
}
