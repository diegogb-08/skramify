import Link from "next/link"
import { CardType, TaskCard } from "../types"
import { Draggable } from 'react-beautiful-dnd'
import { memo } from "react"

interface CardTaskProps extends TaskCard {
  index: number
}

const CardTask = ({ title, cardType, comments, createdAt, description, id, priority, dueDate, index }: CardTaskProps) => {
  const isABug = cardType === CardType.bug
  const isAnEpic = cardType === CardType.epic
  const cardTypeBackground = isAnEpic ? 'bg-yellow-300' : isABug ? 'bg-red-500' : 'bg-green-500'

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
            <p className='text-xl font-semibold py-4'>{title}</p>
            <div className='w-full flex flex-row justify-between' >
              <p className={`${cardTypeBackground} px-2 py-1 rounded-md font-bold`}>{cardType}</p>
              <p>{priority}</p>
            </div>
            <p className='text-right'>{dueDate}</p>
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default memo(CardTask)
