import { memo, useCallback, useEffect } from 'react'
import { TrashIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { deleteTask, getAllTask } from '../api/task'
import { useDragAndDrop } from '../hooks/useDragAndDrop'

function DeleteModal({
  setShowDeleteModal,
  taskToDelete,
}: {
  setShowDeleteModal: (arg0: boolean) => void
  taskToDelete: string | undefined
}) {
  const { taskData, setTaskData } = useDragAndDrop()

  const handleDeleteUser = useCallback(async () => {
    try {
      console.log('Deleting task with ID:', taskToDelete)

      // Perform the delete operation
      await deleteTask(taskToDelete)
      console.log('Task deleted successfully')

      // Fetch updated tasks
      const updatedTasks = await getAllTask()
      console.log('Updated tasks fetched:', updatedTasks)

      // Update the taskData state with the latest tasks
      if (updatedTasks?.tasks && Array.isArray(updatedTasks.tasks)) {
        setTaskData(updatedTasks.tasks)
        console.log('TaskData after update:', updatedTasks.tasks)
      } else {
        console.error('Unexpected API response format:', updatedTasks)
      }

      // Now close the modal after successful deletion
      setShowDeleteModal(false)
    } catch (error) {
      console.error('Failed to delete the task:', error)
    }
  }, [taskToDelete, setTaskData, setShowDeleteModal])
  useEffect(() => {}, [taskData])
  return (
    <div className='flex flex-col items-center bg-white p-5 gap-5 w-96 rounded-lg relative'>
      <div>
        <p className=' font-semibold text-[#3a4e63]'>Delete User?</p>
      </div>
      <div>
        <p className=' font-semibold text-[#59687b]'>
          Are you sure want to delete this User?
        </p>
      </div>
      <div
        className='absolute top-1 cursor-pointer right-1'
        onClick={() => setShowDeleteModal(false)}
      >
        <XMarkIcon className='w-10 h-10 text-gray-400' />
      </div>
      <div className='flex justify-between w-80 items-center'>
        <button
          className='text-white font-medium rounded-3xl px-10 py-2 bg-[#627d98]'
          onClick={() => setShowDeleteModal(false)}
        >
          Cancel
        </button>
        <button
          onClick={handleDeleteUser}
          className='text-black flex gap-2 items-center bg-[#e12d39] px-3 py-2 rounded-3xl font-medium'
        >
          <div>
            <p className='text-[#ffe2e3] text-base font-medium'>Delete User</p>
          </div>
          <TrashIcon
            style={{
              width: '20px',
              height: '20px',
              color: '#ffe2e3',
              paddingBottom: '2px',
            }}
          />
        </button>
      </div>
    </div>
  )
}

export default memo(DeleteModal)
