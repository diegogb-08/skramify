import Link from "next/link"
import { TaskCard } from "../types"

interface CardTaskProps extends TaskCard {
}

const CardTask = ({ title, cardType, comments, createdAt, description, id, priority, dueDate }: CardTaskProps) => {
  const Task: TaskCard = { title, cardType, comments, createdAt, description, id, priority, dueDate }


  return (
    <div className='bg-white rounded-sm overflow-hidden ring-1 ring-gray-900/5 p-4 m-2 text-inherit font-light'>
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
  )
}

export default CardTask
