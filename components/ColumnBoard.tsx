import { TaskCard } from "../types"
import CardTask from "./CardTask"
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { memo } from "react"

interface ColumbnBoardProps {
  description: string
  tasks: TaskCard[]
  columnId: string
  isDropDisabled: boolean
  index: number
}

const ColumnBoard = ({ description, columnId, index, tasks, isDropDisabled }: ColumbnBoardProps) => {
  return (
    <Draggable draggableId={columnId} index={index}>
      {(provider) => (
        <section className={`w-full flex flex-col font-bold p-2 mx-2 rounded-t`}
          {...provider.draggableProps}
          ref={provider.innerRef}
        >
          <header className='text-gray-600'
            {...provider.dragHandleProps}
          >
            {description?.toUpperCase()}
          </header>
          <div className='bg-gray-200 h-2 w-full mb-2' />
          {/*  // TODO: add a config button to enable isDropDisabled */}
          <Droppable droppableId={columnId} isDropDisabled={isDropDisabled} type='task'>
            {(provider, snapshot) => (
              <div
                className={`${snapshot.isDraggingOver ? 'bg-gray-300 border-dashed border-white border-2 box-border' : 'bg-gray-200'} p-2 w-full h-full`}
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
      )}
    </Draggable>
  )
}

export default memo(ColumnBoard)
