import { nanoid } from 'nanoid'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import Menu from '../components/menu/Menu'
import useCheckAuthentication from '../hooks/useCheckAuthentication'
import { modalState } from '../recoil/atoms'
import { useState } from 'react'
import Dialog from '../components/modal/Dialog'
import { BoardColumn } from '../types'

const initialScrumbBoardState = [
  {
    id: nanoid(),
    description: 'Backlog',
    tasks: []
  },
  {
    id: nanoid(),
    description: 'In Progress',
    tasks: []
  },
  {
    id: nanoid(),
    description: 'Done',
    tasks: []
  }
]



const HomePage = () => {
  useCheckAuthentication()
  const router = useRouter()
  const { nickname } = router.query
  const [scrumBoard, setScrumBoard] = useState<BoardColumn[]>(initialScrumbBoardState)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const columnSize = 6 / scrumBoard.length

  const handleClickCreate = () => {
    setModalIsOpen(true)
  }

  const handleClickClose = () => {
    setModalIsOpen(false)
  }



  return (
    <Menu onClickCreate={handleClickCreate}>
      <Dialog isOpen={modalIsOpen} onRequestClose={handleClickClose} title={'TITLE'}>
        MODAL IS OPEN AGAIN
      </Dialog>
      <div className='max-w-full h-full flex justify-center bg-gray-50 p-4'>
        {
          scrumBoard.map(colum => {
            return (
              <section key={colum.id} className={`w-full flex flex-col font-bold p-2 mx-2 rounded-t`}>
                <header className='text-gray-600'>
                  {colum.description.toUpperCase()}
                </header>
                <div className='bg-gray-200 h-2 w-full mb-2' />
                <div className='bg-gray-200 w-full h-full'>

                </div>
              </section>
            )
          })
        }
      </div>
    </Menu>
  )
}

export default HomePage
