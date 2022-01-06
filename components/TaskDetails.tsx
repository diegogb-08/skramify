import { useRouter } from 'next/router'
import { useRecoilValue } from 'recoil'
import { board as boardAtom } from '../recoil/atoms'
import { BoardColumn } from '../types'

const useMapBoardAndGetTask = (scrumBoard: BoardColumn[], taskId: string) => {

}

const TaskDetails = () => {
  const router = useRouter()
  const { taskId } = router.query
  const scrumBoard = useRecoilValue(boardAtom)
  useMapBoardAndGetTask(scrumBoard, taskId as string)
  console.log(taskId)
  return (
    <div>
      card details {taskId}
    </div>
  )
}

export default TaskDetails
