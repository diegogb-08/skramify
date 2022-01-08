import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import useForm from '../hooks/useForm'
import { board as boardAtom } from '../recoil/atoms'
import { Board, TaskCard } from '../types'
import NotFound from './NotFound'

const TaskDetails = () => {
  const router = useRouter()
  const { taskId } = router.query
  const scrumBoard = useRecoilValue<Board>(boardAtom)
  const { formState: task, setFormState } = useForm({ initialFormState: {} })

  useEffect(() => {
    const task: TaskCard = scrumBoard.tasks[taskId as keyof typeof scrumBoard.tasks]
    setFormState(task)
  }, [taskId])

  return (
    <div className='flex h-full w-full flex-col p-5'>
      <div className='flex justify-between w-full'>
        <h2>{task?.id ? task?.title : ''}</h2>
        <Link href='/board'>
          <a>
            <svg className="svg-icon" viewBox="0 0 20 20" >
              <path fill="none" d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
            </svg>
          </a>
        </Link>
      </div>
      {
        !task?.id ?
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
