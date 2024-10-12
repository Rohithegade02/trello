import DragAndDropCards from './DragAndDropCards'
import { useDragAndDrop } from '../hooks/useDragAndDrop'
import { Status, Task } from '../interfaces'

const statusData: Status[] = ['todo', 'in-progress', 'done']

export const DragAndDrop = ({ filteredTasks }: { filteredTasks: Task[] }) => {
  const { isDragging, taskData, handleDragging, handleUpdateList } =
    useDragAndDrop()
  const tasksToShow = filteredTasks.length > 0 ? filteredTasks : taskData
  console.log(tasksToShow)
  return (
    <div className='flex flex-col lg:flex-row justify-between w-full gap-4 p-4'>
      {statusData.map(item => (
        <DragAndDropCards
          items={taskData}
          status={item}
          key={item}
          isDragging={isDragging}
          handleDragging={handleDragging}
          handleUpdateList={handleUpdateList}
        />
      ))}
    </div>
  )
}
