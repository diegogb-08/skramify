import Menu from '../../components/menu/Menu'
import useCheckAuthentication from '../../hooks/useCheckAuthentication'
import { useState } from 'react'
import Dialog from '../../components/modal/Dialog'
import { BoardColumn } from '../../types'
import CreateTask from '../../components/CreateTask'
import { board as boardAtom } from '../../recoil/atoms'
import useRecoilLocalStorageValue from '../../hooks/useUpdateLocalStorage'
import ColumnBoard from '../../components/ColumnBoard'
import CardDetails from '../../components/TaskDetails'
import { useRouter } from 'next/router'
import Split from 'react-split'


const HomePage = () => {
  useCheckAuthentication()
  const router = useRouter()
  const { taskId } = router.query
  const scrumBoard: BoardColumn[] = useRecoilLocalStorageValue({ key: boardAtom.key, atom: boardAtom })
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const handleClickCreate = () => {
    setModalIsOpen(true)
  }

  const handleClickClose = () => {
    setModalIsOpen(false)
  }

  console.log(taskId)

  return (
    <Menu onClickCreate={handleClickCreate}>
      <Dialog isOpen={modalIsOpen} onRequestClose={handleClickClose} title={'TITLE'}>
        <CreateTask onClose={handleClickClose} />
      </Dialog>
      {
        taskId ?
          <Split
            className='flex flex-row w-full h-full'
            style={{ height: 'calc(100vh - 4rem)' }}
            sizes={[75, 25]}
            minSize={500}
            expandToMin={false}
            gutterSize={10}
            gutterAlign="center"
            snapOffset={30}
            dragInterval={1}
            direction="horizontal"
            cursor="col-resize"
          >
            <div className='w-full h-full flex justify-center bg-gray-50 p-4'>
              {
                scrumBoard?.map(columnn => {
                  return <ColumnBoard description={columnn.description} key={columnn.id} tasks={columnn.tasks} />
                })
              }
            </div>
            <CardDetails />
          </Split>
          :
          <div className='w-full h-full flex justify-center bg-gray-50 p-4'>
            {
              scrumBoard?.map(columnn => {
                return <ColumnBoard description={columnn.description} key={columnn.id} tasks={columnn.tasks} />
              })
            }
          </div>
      }
    </Menu>
  )
}

export default HomePage
