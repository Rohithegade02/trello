import { Dispatch, memo, SetStateAction, useEffect, useState } from 'react'
import { Task } from '../interfaces'

function ViewDetailsModal({
  setShowViewModal,
  taskToView,
}: {
  setShowViewModal: Dispatch<SetStateAction<boolean>>
  taskToView: Task
}) {
  const [description, setDescription] = useState<Task['description']>(
    taskToView.description,
  )
  const [title, setTitle] = useState<Task['title']>(taskToView.title)
  const [createdAt, setCreatedAt] = useState<Task['createdAt']>(
    taskToView.createdAt,
  )

  useEffect(() => {
    setDescription(taskToView.description)
    setTitle(taskToView.title)
    setCreatedAt(taskToView.createdAt)
  }, [taskToView])
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50'>
      <div className='bg-white p-6 rounded-lg w-full max-w-md shadow-md'>
        <h2 className='text-lg font-bold mb-4'> Task Details</h2>

        <div className='flex flex-col gap-4'>
          <div>
            <h2 className='text-black font-semibold text-lg'>Task : {title}</h2>
          </div>
          <div>
            <h3 className='text-gray-600 mb-1 font-medium text-base'>
              Description : {description}
            </h3>
            <h3 className='text-gray-500 font-medium text-sm'>
              Created at : {createdAt}
            </h3>
          </div>
          <div className='h-60' />
          <div className='flex justify-end space-x-2'>
            <button
              className='px-4 py-2 text-white bg-blue-700 rounded-md hover:bg-blue-800'
              onClick={() => setShowViewModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(ViewDetailsModal)
