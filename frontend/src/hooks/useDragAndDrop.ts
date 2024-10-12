import { useCallback, useEffect, useState } from 'react'
import { Status, Task } from '../interfaces'
import { getAllTask, updateTask } from '../api/task'

export const useDragAndDrop = () => {
  const [isDragging, setIsDragging] = useState(false)
  const [taskData, setTaskData] = useState<Task[]>([])

  const getTaskData = useCallback(async () => {
    const res = await getAllTask()
    setTaskData(res.tasks)
  }, [setTaskData])
  useEffect(() => {
    getTaskData()
  }, [getTaskData])

  const handleUpdateList = async (id: string, status: Status) => {
    // eslint-disable-next-line prefer-const
    let card = taskData.find(item => item._id === id)

    if (card && card.status !== status) {
      card.status = status

      try {
        await updateTask(id, { ...card })

        setTaskData(prev => [
          ...prev.filter(item => item._id !== id),
          { ...card },
        ])
      } catch (error) {
        console.error('Failed to update task:', error)
      }
    }
  }

  const handleDragging = (dragging: boolean) => setIsDragging(dragging)

  return {
    isDragging,
    taskData,
    setTaskData,
    handleUpdateList,
    handleDragging,
  }
}
