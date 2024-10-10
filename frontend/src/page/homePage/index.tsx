import { DragAndDrop } from '../../components/DragandDrop'

const HomePage = () => {
  return (
    <div className='flex flex-col items-start gap-5 p-5'>
      <div>
        <button className='px-6 py-3 rounded-md text-white bg-blue-500 hover:bg-blue-700 '>
          Add Task
        </button>
      </div>
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
