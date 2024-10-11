import { useCallback, useRef, useState } from 'react'
import { DragAndDrop } from '../../components/DragandDrop'
import CreateTaskModal from '../../components/CreateTaskModal'
import { Task } from '../../interfaces'
import { useDragAndDrop } from '../../hooks/useDragAndDrop'

const HomePage = () => {
  const { taskData } = useDragAndDrop()
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false)
  const debounceTimeoutRef = useRef<number | null>(null)
  const [inputData, setInputData] = useState<string>('')
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([])
  const [sortOption, setSortOption] = useState<string>('default') //
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const searchValue = e.target.value.toLowerCase()
      setInputData(searchValue)

      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }

      debounceTimeoutRef.current = setTimeout(() => {
        const filtered = taskData.filter(
          task =>
            task.title.toLowerCase().includes(searchValue) ||
            task.description.toLowerCase().includes(searchValue), // Include description in search if applicable
        )
        setFilteredTasks(filtered) // Update the filtered tasks
      }, 600)
    },
    [taskData], // Add taskData to dependencies
  )
  const sortedTasks = () => {
    const tasksToSort = filteredTasks.length > 0 ? filteredTasks : taskData

    switch (sortOption) {
      case 'oldest':
        return [...tasksToSort].sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        )
      case 'recent':
        return [...tasksToSort].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
      default:
        return tasksToSort // Return tasks as is for 'default'
    }
  }
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
          <div
            className='absolute inset-0 bg-black opacity-50'
            onClick={() => setShowCreateModal(false)}
          ></div>

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
            value={inputData}
            onChange={handleChange}
            className='w-96 px-4 py-2 border rounded-md border-blue-100 focus:ring-2 focus:border-blue-300 outline-none'
          />
        </div>
        <div className='flex items-center gap-3'>
          <p>Sort By</p>
          <select
            value={sortOption}
            onChange={e => setSortOption(e.target.value)}
            className='border rounded-md p-2'
          >
            <option value='default'>Default</option>
            <option value='oldest'>Oldest</option>
            <option value='recent'>Recent</option>
          </select>
        </div>
      </div>
      <DragAndDrop filteredTasks={sortedTasks()} />
    </div>
  )
}

export default HomePage
