import { TaskCard } from "../types"
import CardTask from "./CardTask"
import { Droppable } from 'react-beautiful-dnd'

interface ColumbnBoardProps {
  description: string
  tasks: TaskCard[]
  columnId: string
}

const ColumnBoard = ({ description, columnId, tasks }: ColumbnBoardProps) => {
  return (
    <section className={`w-full flex flex-col font-bold p-2 mx-2 rounded-t`}>
      <header className='text-gray-600'>
        {description.toUpperCase()}
      </header>
      <div className='bg-gray-200 h-2 w-full mb-2' />
      <Droppable droppableId={columnId}>
        {(provider) => (
          <div
            className='bg-gray-200 w-full h-full'
            ref={provider.innerRef}
            {...provider.droppableProps}
          >
            {
              tasks.map((task, index) => {
                return <CardTask
                  index={index}
                  key={task?.id!}
                  id={task?.id!}
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
            {provider.placeholder}
          </div>
        )}
      </Droppable>
    </section>
  )
}

export default ColumnBoard
