import { useState } from 'react'
import { DragAndDrop } from '../../components/DragandDrop'
import CreateTaskModal from '../../components/CreateTaskModal'

const HomePage = () => {
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false)
  return (
    <div className='flex flex-col items-start gap-5 p-5'>
      <div>
        <button
          onClick={() => setShowCreateModal(!showCreateModal)}
          className='px-6 py-3 rounded-md text-white bg-blue-500 hover:bg-blue-700 '
        >
          Add Task
        </button>
      </div>
      {showCreateModal && (
        <div className='fixed inset-0 z-10 flex items-center justify-center'>
          {/* Modal backdrop */}
          <div
            className='absolute  inset-0 bg-black opacity-50'
            onClick={() => setShowCreateModal(false)}
          ></div>

          {/* Modal content */}
          <div className='relative bg-white p-6 rounded-lg shadow-lg z-10'>
            <CreateTaskModal setShowCreateModal={setShowCreateModal} />
          </div>
        </div>
      )}
      <div className='flex justify-between px-4 py-3 rounded-lg items-center w-full bg-white shadow-lg'>
        <div className='flex items-center gap-3'>
          <p>Search</p>
          <input
            type='text'
            placeholder='Search ....'
            className='w-96 px-4 py-2 border rounded-md border-blue-100 focus:ring-2 focus:border-blue-300 outline-none'
          />{' '}
        </div>
        <div>
          <p>Sort By</p>
        </div>
      </div>
      <DragAndDrop />
    </div>
  )
}

export default HomePage
