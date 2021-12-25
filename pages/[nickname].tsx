import { nanoid } from 'nanoid'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import useCheckAuthentication from '../hooks/useCheckAuthentication'
import { modalState } from '../recoil/atoms'

const initialBoardColums = [
  {
    id: nanoid(),
    description: 'Backlog'
  },
  {
    id: nanoid(),
    description: 'In Progress'
  },
  {
    id: nanoid(),
    description: 'Done'
  }
]

const HomePage = () => {
  useCheckAuthentication()
  const router = useRouter()
  const { nickname } = router.query
  const [modalIsOpen, setModalIsOpen] = useRecoilState(modalState)
  const columnSize = 6 / initialBoardColums.length
  console.log(modalIsOpen)
  return (
    <div className='max-w-full max-h-full flex justify-center bg-gray-50 p-8'>
      {
        initialBoardColums.map(colum => {
          return (
            <section key={colum.id} className={`w-${columnSize}/6 flex flex-col font-bold p-2 mx-8 rounded-t`}>
              <header>
                {colum.description.toUpperCase()}
              </header>
              <div className='bg-gray-200 h-2 w-full mb-2' />
              <div className='bg-gray-200 w-full h-10'>

              </div>
            </section>
          )
        })
      }
    </div>
  )
}

export default HomePage
