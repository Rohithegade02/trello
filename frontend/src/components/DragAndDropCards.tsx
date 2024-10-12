import { memo, useState } from 'react'
import { Status, Task } from '../interfaces'
import EditTaskModal from './EditTaskModal'
import DragAndDropItem from './DragAndDropItem'
import DeleteTaskModal from './DeleteTaskModal'
import ViewDetailsModal from './ViewDetailsModal'

interface Props {
  items: Task[]
  status: Status
  isDragging: boolean
  handleUpdateList: (id: string, status: Status) => void
  handleDragging: (dragging: boolean) => void
}

const DragAndDropCards = ({
  items = [],
  status,
  isDragging,
  handleDragging,
  handleUpdateList,
}: Props) => {
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null)
  const [taskToView, setTaskToView] = useState<Task | null>(null)
  const [taskToDelete, setTaskToDelete] = useState<Task['_id']>('')

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const id = e.dataTransfer.getData('text')
    handleUpdateList(id, status)
    handleDragging(false)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) =>
    e.preventDefault()

  const handleEditClick = (task: Task) => {
    setTaskToEdit(task)
    setShowEditModal(true)
  }
  const handleViewClick = (task: Task) => {
    setTaskToView(task)
    setShowViewModal(true)
  }
  const handleDeleteClick = (taskId: Task['_id']) => {
    setTaskToDelete(taskId)
    setShowDeleteModal(true)
  }
  return (
    <div
      className={`min-h-[70vh] w-full border-2 rounded-lg p-4 transition-all ${
        isDragging ? 'border-blue-500 bg-blue-100' : 'border-gray-300'
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <p className='font-bold bg-blue-500 py-2 px-2 rounded-lg text-lg text-white text-left capitalize mb-4'>
        {status.toUpperCase()}
      </p>
      <div className='space-y-3'>
        {items.map(
          item =>
            status === item.status && (
              <DragAndDropItem
                data={item}
                key={item._id}
                handleDragging={handleDragging}
                onEditClick={handleEditClick}
                onDeleteClick={handleDeleteClick}
                onViewDetailsClick={handleViewClick}
              />
            ),
        )}
      </div>

      {/* Modal for editing the task */}
      {showEditModal && taskToEdit && (
        <div className='fixed inset-0 z-10 flex items-center justify-center'>
          {/* Modal backdrop */}
          <div
            className='absolute inset-0 bg-black opacity-50'
            onClick={() => setShowEditModal(false)}
          ></div>

          <div className='relative bg-white p-6 rounded-lg shadow-lg z-10'>
            <EditTaskModal
              setShowEditModal={setShowEditModal}
              taskToEdit={taskToEdit}
            />
          </div>
        </div>
      )}
      {showViewModal && taskToView && (
        <div className='fixed inset-0 z-10 flex items-center justify-center'>
          {/* Modal backdrop */}
          <div
            className='absolute inset-0 bg-black opacity-50'
            onClick={() => setShowViewModal(false)}
          ></div>

          <div className='relative bg-white p-6 rounded-lg shadow-lg z-10'>
            <ViewDetailsModal
              setShowViewModal={setShowViewModal}
              taskToView={taskToView}
            />
          </div>
        </div>
      )}
      {showDeleteModal && taskToEdit && (
        <div className='fixed inset-0 z-10 flex items-center justify-center'>
          {/* Modal backdrop */}
          <div
            className='absolute inset-0 bg-black opacity-50'
            onClick={() => setShowDeleteModal(false)}
          ></div>

          <div className='relative bg-white p-6 rounded-lg shadow-lg z-10'>
            <DeleteTaskModal
              setShowDeleteModal={setShowDeleteModal}
              taskToDelete={taskToDelete}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default memo(DragAndDropCards)
