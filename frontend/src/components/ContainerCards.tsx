import { useState } from 'react'
import { Status, Task } from '../interfaces'
import { CardItem } from './CardItem'

interface Props {
  items: Task[]
  status: Status
  isDragging: boolean
  handleUpdateList: (id: number, status: Status) => void
  handleDragging: (dragging: boolean) => void
}

export const ContainerCards = ({
  items = [],
  status,
  isDragging,
  handleDragging,
  handleUpdateList,
}: Props) => {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    handleUpdateList(+e.dataTransfer.getData('text'), status)
    handleDragging(false)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) =>
    e.preventDefault()

  return (
    <div
      className={`min-h-[500px] w-[470px] border-2 rounded-lg p-4 transition-all ${
        isDragging ? 'border-blue-500 bg-blue-100' : 'border-gray-300'
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <p className='font-bold bg-blue-500 py-2 px-2 rounded-lg text-lg text-white  text-left  capitalize mb-4'>
        {status.toUpperCase()}
      </p>
      <div className='space-y-3'>
        {items.map(
          item =>
            status === item.status && (
              <CardItem
                data={item}
                key={item.id}
                handleDragging={handleDragging}
              />
            ),
        )}
      </div>
      {showDeleteModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
          {/* Modal backdrop */}
          <div
            className='absolute  inset-0 bg-black opacity-50'
            onClick={() => setShowDeleteModal(false)}
          ></div>

          {/* Modal content */}
          <div className='relative bg-white p-6 rounded-lg shadow-lg z-50'>
            {/* <DeleteModal
                  showDeleteModal={showDeleteModal}
                  setShowDeleteModal={setShowDeleteModal}
                  userId={data.id}
                /> */}
          </div>
        </div>
      )}
    </div>
  )
}
