import useRecoilLocalStorageValue from "../hooks/useUpdateLocalStorage"

import { board as boardAtom } from '../recoil/atoms'
import { Board, Column, TaskCard } from "../types"
import ColumnBoard from "./ColumnBoard"

const ScrumBoard = () => {
  const scrumBoard: Board = useRecoilLocalStorageValue({ key: boardAtom.key, atom: boardAtom })
  return (
    <div className='w-full h-full flex justify-center bg-gray-50 p-4'>
      {
        scrumBoard.columnOrder?.map(columnId => {
          const column: Column = scrumBoard?.columns[columnId as keyof typeof scrumBoard.columns]
          const tasks: TaskCard[] = column?.taskIds?.map(taskId => scrumBoard?.tasks[taskId as keyof typeof scrumBoard.tasks])
          return <ColumnBoard description={column?.description} columnId={columnId} key={column?.id} tasks={tasks} />
        })
      }
    </div>
  )
}

export default ScrumBoard
