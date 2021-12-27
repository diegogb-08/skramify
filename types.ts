export type BoardColumn = {
  id: string,
  description: string,
  tasks: taskCard[]
}

export type taskCard = {
  id: string,
  title: string,
  createdAt: string,
  dueDate: string,
  description: string,
  comments: any[],
  cardType: 'bug' | 'epic' | 'task',
  priority: 'major' | 'blocker' | 'minor' | 'critical' | 'trivial'
}