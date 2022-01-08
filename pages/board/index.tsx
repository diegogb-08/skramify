import Menu from '../../components/menu/Menu'
import useCheckAuthentication from '../../hooks/useCheckAuthentication'
import { useEffect, useState } from 'react'
import Dialog from '../../components/modal/Dialog'
import CreateTask from '../../components/CreateTask'
import CardDetails from '../../components/TaskDetails'
import { useRouter } from 'next/router'
import Split from 'react-split'
import ScrumBoard from '../../components/ScrumBoard'
import { DragDropContext, DragStart, DropResult, ResponderProvided } from 'react-beautiful-dnd'
import useRecoilLocalStorageState from '../../hooks/useRecoilLocalStorageState'
import { board as boardAtom } from '../../recoil/atoms'
import { cloneDeep } from 'lodash'
import { Board } from '../../types'
import { normalizedDataOnDragEnd } from '../../helper/normalization'


const HomePage = () => {
  useCheckAuthentication()
  const router = useRouter()
  const { taskId } = router.query
  const { state: board, setState: setBoard } = useRecoilLocalStorageState({ key: boardAtom.key, atom: boardAtom })
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [homeIndex, setHomeIndex] = useState<null | number>(null)

  const handleClickCreate = () => {
    setModalIsOpen(true)
  }

  const handleClickClose = () => {
    setModalIsOpen(false)
  }

  const handleOnDragEnd = (result: DropResult, provided: ResponderProvided) => {
    setHomeIndex(null)
    const scrumBoardState: Board = cloneDeep(board)
    const newState = normalizedDataOnDragEnd({ result, state: scrumBoardState })
    setBoard(newState)
  }

  const handleOnDragStart = (initial: DragStart, provided: ResponderProvided) => {
    const scrumBoardState: Board = cloneDeep(board)
    const homeIndex = scrumBoardState.columnOrder.indexOf(initial.source.droppableId)
    setHomeIndex(homeIndex)
  }

  return (
    <Menu onClickCreate={handleClickCreate}>
      <Dialog isOpen={modalIsOpen} onRequestClose={handleClickClose} title={'TITLE'}>
        <CreateTask onClose={handleClickClose} />
      </Dialog>
      <DragDropContext
        onDragEnd={handleOnDragEnd}
        onDragStart={handleOnDragStart}
      >
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
              <ScrumBoard homeIndex={homeIndex} />
              <CardDetails />
            </Split>
            :
            <ScrumBoard homeIndex={homeIndex} />
        }
      </DragDropContext>
    </Menu>
  )
}

export default HomePage
