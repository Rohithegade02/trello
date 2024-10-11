import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { updateTask } from '../api/task'
import { Task } from '../interfaces'

export type Status = 'todo' | 'in-progress' | 'done'

const EditTaskModal = ({
  setShowEditModal,
  taskToEdit,
}: {
  setShowEditModal: Dispatch<SetStateAction<boolean>>
  taskToEdit: Task
}) => {
  const [description, setDescription] = useState<Task['description']>(
    taskToEdit.description,
  )
  const [status, setStatus] = useState<Status>(taskToEdit.status)
  const [title, setTitle] = useState<Task['title']>(taskToEdit.title)

  useEffect(() => {
    setDescription(taskToEdit.description)
    setStatus(taskToEdit.status)
    setTitle(taskToEdit.title)
  }, [taskToEdit])

  const handleUpdateTask = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const updatedTask = { description, status, title }
    await updateTask(taskToEdit._id, updatedTask)
    setShowEditModal(false)
  }

  const handleCancel = () => {
    setShowEditModal(false)
    setTitle('')
    setDescription('')
    setStatus('todo')
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50'>
      <div className='bg-white p-6 rounded-lg w-full max-w-md shadow-md'>
        <h2 className='text-lg font-bold mb-4'>Edit Task</h2>

        <form className='flex flex-col gap-4' onSubmit={handleUpdateTask}>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Title
            </label>
            <input
              type='text'
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder='Title'
              className='mt-1 w-full px-4 py-2 border-b  border-b-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-none focus:border-b-blue-300'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Description
            </label>
            <input
              type='text'
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder='Description'
              aria-multiline
              className='mt-1 w-full px-4 py-2 border-b  border-b-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-none focus:border-b-blue-300'
            />
          </div>
          <div className='h-60' />
          <div className='flex justify-end space-x-2'>
            <button
              onClick={handleCancel}
              className='px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600'
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditTaskModal
