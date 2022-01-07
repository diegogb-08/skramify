import { Descendant } from "slate"


export type Board = {
  tasks: ITaskCardRecord,
  columns: IColumnRecord,
  columnOrder: string[]
}

export type Column = {
  id: string,
  description: string,
  taskIds: string[]
}

interface IColumnRecord {
  [key: string]: Column
}

export type TaskCard = {
  id?: string,
  title?: string,
  createdAt?: string,
  dueDate?: string,
  description?: Descendant[],
  comments?: any[],
  cardType?: CardType,
  priority?: Priority
}

interface ITaskCardRecord {
  [key: string]: TaskCard
}

export enum CardType {
  bug = 'bug',
  epic = 'epic',
  task = 'task'
}

export enum Priority {
  major = 'major',
  blocker = 'blocker',
  minor = 'minor',
  critical = 'critical',
  trivial = 'trivial'
}