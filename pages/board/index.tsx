import Menu from '../../components/menu/Menu'
import useCheckAuthentication from '../../hooks/useCheckAuthentication'
import { useState } from 'react'
import Dialog from '../../components/modal/Dialog'
import CreateTask from '../../components/CreateTask'
import CardDetails from '../../components/TaskDetails'
import { useRouter } from 'next/router'
import Split from 'react-split'
import ScrumBoard from '../../components/ScrumBoard'


const HomePage = () => {
  useCheckAuthentication()
  const router = useRouter()
  const { taskId } = router.query

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
            <ScrumBoard />
            <CardDetails />
          </Split>
          :
          <ScrumBoard />
      }

    </Menu>
  )
}

export default HomePage
