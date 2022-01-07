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