import Menu from '../../components/menu/Menu'
import useCheckAuthentication from '../../hooks/useCheckAuthentication'
import { useEffect, useState } from 'react'
import Dialog from '../../components/modal/Dialog'
import CreateTask from '../../components/CreateTask'
import CardDetails from '../../components/TaskDetails'
import { useRouter } from 'next/router'
import Split from 'react-split'
import ScrumBoard from '../../components/ScrumBoard'
import { DragDropContext, DropResult, ResponderProvided } from 'react-beautiful-dnd'
import useRecoilLocalStorageState from '../../hooks/useRecoilLocalStorageState'
import { board as boardAtom } from '../../recoil/atoms'
import { cloneDeep } from 'lodash'
import { Board } from '../../types'


const HomePage = () => {
  useCheckAuthentication()
  const router = useRouter()
  const { taskId } = router.query
  const { state: board, setState: setBoard } = useRecoilLocalStorageState({ key: boardAtom.key, atom: boardAtom })
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const handleClickCreate = () => {
    setModalIsOpen(true)
  }

  const handleClickClose = () => {
    setModalIsOpen(false)
  }

  const handleOnDragEnd = (result: DropResult, provided: ResponderProvided) => {
    const { draggableId, source, destination } = result
    const scrumBoardState: Board = cloneDeep(board)

    if (!destination ||
      (destination.droppableId === source.droppableId && destination.index === source.index)) return

    const column = scrumBoardState.columns[source.droppableId]
    let newTaskIds = Array.from(column.taskIds)
    newTaskIds.splice(source.index, 1)
    newTaskIds.splice(destination.index, 0, draggableId)

    const newColumn = {
      ...column,
      taskIds: newTaskIds
    }

    const newState = {
      ...scrumBoardState,
      columns: {
        ...scrumBoardState.columns,
        [newColumn.id]: newColumn
      }
    }

    setBoard(newState)
  }

  return (
    <Menu onClickCreate={handleClickCreate}>
      <Dialog isOpen={modalIsOpen} onRequestClose={handleClickClose} title={'TITLE'}>
        <CreateTask onClose={handleClickClose} />
      </Dialog>
      <DragDropContext
        onDragEnd={handleOnDragEnd}
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
              <ScrumBoard />
              <CardDetails />
            </Split>
            :
            <ScrumBoard />
        }
      </DragDropContext>
    </Menu>
  )
}

export default HomePage
