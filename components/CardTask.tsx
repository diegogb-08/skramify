import Link from "next/link"
import { TaskCard } from "../types"
import { Draggable } from 'react-beautiful-dnd'

interface CardTaskProps extends TaskCard {
  index: number
}

const CardTask = ({ title, cardType, comments, createdAt, description, id, priority, dueDate, index }: CardTaskProps) => {

  return (
    <Draggable draggableId={id!} index={index} >
      {(provider, snapshot) => (
        <div
          className={`${snapshot.isDragging ? 'bg-green-100' : 'bg-white'} rounded-sm ring-1 ring-gray-900/5 p-4 mb-2 text-inherit font-light`}
          {...provider.draggableProps}
          ref={provider.innerRef}
        >
          <Link href={`board/?taskId=${id}`}>
            <a className='font-normal text-gray-500 hover:underline'>{id}</a>
          </Link>
          <div
            className='w-full flex flex-col justify-between'
            {...provider.dragHandleProps}
          >
            <p>{title}</p>
            <div className='w-full flex flex-row justify-between' >
              <p>{cardType}</p>
              <p>{priority}</p>
            </div>
          </div>
          <p>{dueDate}</p>
        </div>
      )}
    </Draggable>
  )
}

export default CardTask
