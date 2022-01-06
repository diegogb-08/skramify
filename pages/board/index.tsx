import Menu from '../../components/menu/Menu'
import useCheckAuthentication from '../../hooks/useCheckAuthentication'
import { useState } from 'react'
import Dialog from '../../components/modal/Dialog'
import { BoardColumn } from '../../types'
import CreateTask from '../../components/CreateTask'
import { board as boardAtom } from '../../recoil/atoms'
import useRecoilLocalStorageValue from '../../hooks/useUpdateLocalStorage'
import ColumnBoard from '../../components/ColumnBoard'


const HomePage = () => {
  useCheckAuthentication()
  const scrumBoard: BoardColumn[] = useRecoilLocalStorageValue({ key: boardAtom.key, atom: boardAtom })
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const handleClickCreate = () => {
    setModalIsOpen(true)
  }

  const handleClickClose = () => {
    setModalIsOpen(false)
  }


  return (
    <Menu onClickCreate={handleClickCreate}>
      <Dialog isOpen={modalIsOpen} onRequestClose={handleClickClose} title={'TITLE'}>
        <CreateTask onClose={handleClickClose} />
      </Dialog>
      <div className='max-w-full h-full flex justify-center bg-gray-50 p-4'>
        {
          scrumBoard?.map(columnn => {
            return <ColumnBoard description={columnn.description} key={columnn.id} tasks={columnn.tasks} />
          })
        }
      </div>
    </Menu>
  )
}

export default HomePage
