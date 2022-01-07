import Link from "next/link"
import { TaskCard } from "../types"
import { Draggable } from 'react-beautiful-dnd'

interface CardTaskProps extends TaskCard {
  index: number
}

const CardTask = ({ title, cardType, comments, createdAt, description, id, priority, dueDate, index }: CardTaskProps) => {

  return (
    <Draggable draggableId={id!} index={index} >
      {(provider) => (
        <div
          className='bg-white rounded-sm overflow-hidden ring-1 ring-gray-900/5 p-4 m-2 text-inherit font-light'
          {...provider.draggableProps}
          {...provider.dragHandleProps}
          ref={provider.innerRef}
        >
          <Link href={`board/?taskId=${id}`}>
            <a className='font-normal text-gray-500 hover:underline'>{id}</a>
          </Link>
          <p>{title}</p>
          <div className='w-full flex flex-row justify-between'>
            <p>{cardType}</p>
            <p>{priority}</p>
          </div>
          <p>{dueDate}</p>
        </div>
      )}
    </Draggable>
  )
}

export default CardTask
