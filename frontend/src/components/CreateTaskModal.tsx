import { useState } from 'react'
import { createTask, getAllTask } from '../api/task'
import { Task } from '../interfaces'
import toast, { Toaster } from 'react-hot-toast'

export type Status = 'todo' | 'in-progress' | 'done'

const CreateTaskModal = ({
  setShowCreateModal,
}: {
  setShowCreateModal: (arg0: boolean) => void
}) => {
  const [description, setDescription] = useState<Task['description']>('')
  const [status, setStatus] = useState<Status>('todo')
  const [title, setTitle] = useState<Task['title']>('')

  const handleCreateTask = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const task = { description, status, title }
    await createTask(task)
    toast.success('Add New Task to the List')
    getAllTask()
    setTimeout(() => {
      setShowCreateModal(false)
    }, 2000)
  }

  const handleCancel = () => {
    setShowCreateModal(false)
    setTitle('')
    setDescription('')
    setStatus('todo')
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50'>
      <div className='bg-white p-6 rounded-lg w-full max-w-sm shadow-md'>
        <h2 className='text-lg font-bold mb-4'>New Task</h2>

        <form className='flex flex-col gap-4' onSubmit={handleCreateTask}>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Title
            </label>
            <input
              type='text'
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder='Title'
              className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
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
              className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Status
            </label>
            <select
              value={status}
              onChange={e => setStatus(e.target.value as Status)}
              className='mt-1 w-full px-4 py-2  border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
            >
              <option value='todo'>Todo</option>
              <option value='in-progress'>In Progress</option>
              <option value='done'>Done</option>
            </select>
          </div>

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
      <Toaster />
    </div>
  )
}

export default CreateTaskModal
