import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import useForm from '../hooks/useForm'
import { board as boardAtom } from '../recoil/atoms'
import { BoardColumn, TaskCard } from '../types'
import NotFound from './NotFound'

const mapBoardAndGetTask = (scrumBoard: BoardColumn[], taskId: string) => {
  let selectedTask: TaskCard = {}
  scrumBoard.forEach(column => {
    const foundTask = column.tasks.find(task => taskId === task.id)
    if (foundTask) {
      selectedTask = foundTask
    }
  })
  return selectedTask
}

const TaskDetails = () => {
  const router = useRouter()
  const { taskId } = router.query
  const scrumBoard = useRecoilValue(boardAtom)
  const { formState: task, setFormState } = useForm({ initialFormState: {} })

  useEffect(() => {
    const selectedTask = mapBoardAndGetTask(scrumBoard, taskId as string)
    setFormState(selectedTask)
  }, [taskId])

  return (
    <div>

      {
        !task.id ?
          <NotFound linkHref='/board' textDestiny='Board' />
          :
          <>
            card details {taskId}
            {
              task.title
            }
          </>
      }
    </div>
  )
}

export default TaskDetails
