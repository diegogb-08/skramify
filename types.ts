export type BoardColumn = {
  id: string,
  description: string,
  tasks: taksCard[]
}

export type taksCard = {
  id: string,
  title: string,
  createdAt: string,
  dateTime: string,
  description: string,
  comments: any[]
}