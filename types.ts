import { Descendant } from "slate"

export type BoardColumn = {
  id: string,
  description: string,
  tasks: TaskCard[]
}

export type Board = {
  backlog: TaskCard[]
  inProgress: TaskCard[],
  done: TaskCard[]
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