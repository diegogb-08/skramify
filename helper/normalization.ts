import { DropResult } from "react-beautiful-dnd";
import { Board, TaskCard } from "../types";

interface NormalizeData {
  object: Board,
  column: string,
  key: string,
  item: TaskCard
}

export const pushToNormalizeData = ({ object, column, key, item }: NormalizeData) => {
  const id: string = object.columns[column as keyof typeof object.columns].id
  const taskIds: string[] = object.columns[column as keyof typeof object.columns].taskIds
  const description: string = object.columns[column as keyof typeof object.columns].description
  return {
    ...object,
    tasks: {
      ...object.tasks,
      [key]: item,
    },
    columns: {
      ...object.columns,
      [column]: {
        id,
        description,
        taskIds: [...taskIds, key]
      }
    }
  };
}

interface NormalizedDataOnDragEnd {
  result: DropResult
  state: Board
}
export const normalizedDataOnDragEnd = ({ result, state }: NormalizedDataOnDragEnd): Board => {
  const { draggableId, source, destination } = result

  if (!destination ||
    (destination.droppableId === source.droppableId && destination.index === source.index)) return state

  const startColumn = state.columns[source.droppableId]
  const finishColumn = state.columns[destination.droppableId]
  if (startColumn === finishColumn) {
    let newTaskIds = Array.from(startColumn.taskIds)
    newTaskIds.splice(source.index, 1)
    newTaskIds.splice(destination.index, 0, draggableId)

    const newColumn = {
      ...startColumn,
      taskIds: newTaskIds
    }

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newColumn.id]: newColumn
      }
    }
    return newState
  }

  // Moving from one list to another
  const startTaskIds = Array.from(startColumn.taskIds)
  startTaskIds.splice(source.index, 1)
  const newStartColumn = {
    ...startColumn,
    taskIds: startTaskIds
  }

  const finishTaskIds = Array.from(finishColumn.taskIds)
  finishTaskIds.splice(destination.index, 0, draggableId)
  const newFinishColumn = {
    ...finishColumn,
    taskIds: finishTaskIds
  }

  const newState = {
    ...state,
    columns: {
      ...state.columns,
      [startColumn.id]: newStartColumn,
      [finishColumn.id]: newFinishColumn
    }
  }
  return newState
}