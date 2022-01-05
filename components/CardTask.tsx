import { Descendant } from "slate"
import { TaskCard } from "../types"

interface CardTaskProps extends TaskCard {
}

const CardTask = ({ title, cardType, comments, createdAt, description, id, priority, dueDate }: CardTaskProps) => {
  return (
    <div>
      <p>{title}</p>
      <p>{id}</p>
      <p>{cardType}</p>
      <p>{priority}</p>
      <p>{dueDate}</p>
    </div>
  )
}

export default CardTask
