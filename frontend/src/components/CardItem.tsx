import { Data } from '../interfaces'

interface Props {
  data: Data
  handleDragging: (dragging: boolean) => void
}

export const CardItem = ({ data, handleDragging }: Props) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text', `${data.id}`)
    handleDragging(true)
  }
  console.log(data.createdAt)
  const handleDragEnd = () => handleDragging(false)

  return (
    <div
      className='bg-blue-200 flex gap-8 flex-col shadow-md rounded-md p-3 cursor-move border hover:shadow-lg transition-transform transform hover:scale-105'
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div>
        <p className='font-bold text-lg text-black'>Task : {data.id}</p>
        <p className='text-gray-500 text-base'>
          Description : {data.description}
        </p>
      </div>
      <div>
        <div>
          <p>Created at: {new Date(1728590899252).toLocaleDateString()}</p>
        </div>
        <div className='flex items-center gap-1 justify-end'>
          <div>
            <button
              onClick={() => {}}
              className='bg-red-400 text-sm px-2 py-1 rounded-md text-white'
            >
              Delete
            </button>
          </div>
          <div>
            <button
              onClick={() => {}}
              className='bg-blue-400 text-sm px-2 py-1 rounded-md text-white'
            >
              Edit
            </button>
          </div>
          <div>
            <button
              onClick={() => {}}
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
