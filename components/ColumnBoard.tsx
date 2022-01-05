import { TaskCard } from "../types"
import CardTask from "./CardTask"

interface ColumbnBoardProps {
  description: string
  tasks: TaskCard[]
}

const ColumnBoard = ({ description, tasks }: ColumbnBoardProps) => {
  return (
    <section className={`w-full flex flex-col font-bold p-2 mx-2 rounded-t`}>
      <header className='text-gray-600'>
        {description.toUpperCase()}
      </header>
      <div className='bg-gray-200 h-2 w-full mb-2' />
      <div className='bg-gray-200 w-full h-full'>
        {
          tasks.map(task => {
            return <CardTask
              key={task.id}
              id={task.id}
              title={task.title}
              cardType={task.cardType}
              comments={task.comments}
              createdAt={task.createdAt}
              description={task.description}
              dueDate={task.dueDate}
              priority={task.priority}
            />
          })
        }
      </div>
    </section>
  )
}

export default ColumnBoard
