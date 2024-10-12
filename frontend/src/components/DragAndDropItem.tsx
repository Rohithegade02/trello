import { memo } from 'react'
import { Task } from '../interfaces'
import { formatDateTime } from '../utils'

interface Props {
  data: Task
  handleDragging: (dragging: boolean) => void
  onEditClick: (task: Task) => void
  onDeleteClick: (task: Task['_id']) => void
  onViewDetailsClick: (task: Task) => void
}

const DragAndDropItem = ({
  data,
  handleDragging,
  onEditClick,
  onDeleteClick,
  onViewDetailsClick,
}: Props) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text', `${data._id}`)
    handleDragging(true)
  }
  const handleDragEnd = () => handleDragging(false)
  return (
    <div
      className='bg-blue-200 flex gap-8 flex-col shadow-md rounded-md p-3  cursor-move border hover:shadow-lg transition-transform transform hover:scale-105'
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div>
        <p className='font-bold text-lg text-black'>Task: {data.title}</p>
        <p className='text-gray-500 text-base'>
          Description: {data.description}
        </p>
      </div>
      <div>
        <div>
          <p>Created at: {formatDateTime(data.createdAt)}</p>
        </div>
        <div className='flex items-center gap-1 justify-end'>
          <div>
            <button
              onClick={() => onDeleteClick(data._id)}
              className='bg-red-400 text-sm px-2 py-1 rounded-md text-white'
            >
              Delete
            </button>
          </div>
          <div>
            <button
              onClick={() => onEditClick(data)}
              className='bg-blue-400 text-sm px-2 py-1 rounded-md text-white'
            >
              Edit
            </button>
          </div>
          <div>
            <button
              onClick={() => onViewDetailsClick(data)}
              className='bg-blue-700 text-sm px-2 py-1 rounded-md text-white'
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(DragAndDropItem)
