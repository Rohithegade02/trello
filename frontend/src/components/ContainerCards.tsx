import { Data, Status } from '../interfaces'
import { CardItem } from './CardItem'

interface Props {
  items: Data[]
  status: Status
  isDragging: boolean
  handleUpdateList: (id: number, status: Status) => void
  handleDragging: (dragging: boolean) => void
}

export const ContainerCards = ({
  items = [],
  status,
  isDragging,
  handleDragging,
  handleUpdateList,
}: Props) => {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    handleUpdateList(+e.dataTransfer.getData('text'), status)
    handleDragging(false)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) =>
    e.preventDefault()

  return (
    <div
      className={`h-[500px] w-[470px] border-2 rounded-lg p-4 transition-all ${
        isDragging ? 'border-blue-500 bg-blue-100' : 'border-gray-300'
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <p className='font-bold bg-blue-500 py-2 px-2 rounded-lg text-lg text-white  text-left  capitalize mb-4'>
        {status.toUpperCase()}
      </p>
      <div className='space-y-3'>
        {items.map(
          item =>
            status === item.status && (
              <CardItem
                data={item}
                key={item.id}
                handleDragging={handleDragging}
              />
            ),
        )}
      </div>
    </div>
  )
}
