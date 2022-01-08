import { memo } from "react"
import { Droppable } from "react-beautiful-dnd"
import useRecoilLocalStorageValue from "../hooks/useUpdateLocalStorage"

import { board as boardAtom } from '../recoil/atoms'
import { Board, Column, TaskCard } from "../types"
import ColumnBoard from "./ColumnBoard"

interface ScrumBoardProps {
  homeIndex: null | number
}
const ScrumBoard = ({ homeIndex }: ScrumBoardProps) => {
  const scrumBoard: Board = useRecoilLocalStorageValue({ key: boardAtom.key, atom: boardAtom })
  return (
    <Droppable droppableId='all-columns' direction='horizontal' type='column'>
      {(provider, snapshot) => (
        <div className='w-full h-full flex justify-center bg-gray-50 p-4'
          {...provider.droppableProps}
          ref={provider.innerRef}
        >
          {scrumBoard.columnOrder?.map((columnId, index) => {
            const column: Column = scrumBoard?.columns[columnId as keyof typeof scrumBoard.columns]
            const tasks: TaskCard[] = column?.taskIds?.map(taskId => scrumBoard?.tasks[taskId as keyof typeof scrumBoard.tasks])
            const isDropDisabled = index < homeIndex!
            return <ColumnBoard description={column?.description} index={index} columnId={columnId} key={column?.id} tasks={tasks} isDropDisabled={isDropDisabled} />
          })}
          {provider.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default memo(ScrumBoard)
