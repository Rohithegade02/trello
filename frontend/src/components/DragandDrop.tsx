import DragAndDropCards from './DragAndDropCards'
import { useDragAndDrop } from '../hooks/useDragAndDrop'
import { Status } from '../interfaces'

const statusData: Status[] = ['todo', 'in-progress', 'done']

export const DragAndDrop = () => {
  const { isDragging, taskData, handleDragging, handleUpdateList } =
    useDragAndDrop()

  return (
    <div className='flex justify-between w-full gap-4 p-4'>
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
