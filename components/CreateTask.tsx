import { FormEvent, useEffect } from "react"
import useForm from "../hooks/useForm"
import useRecoilLocalStorageState from "../hooks/useRecoilLocalStorageState"
import { Board, CardType, Priority, TaskCard } from "../types"
import Discard from "./button/Discard"
import Submit from "./button/Submit"
import { CustomElement } from "./editor/editor.types"
import EditorForm from "./form/EditorForm"
import InputForm from "./form/InputForm"
import SelectForm from "./form/SelectForm"
import { board as boardAtom } from '../recoil/atoms'
import { cloneDeep } from "lodash"
import useAssignTaskId from "../hooks/useAssignTaskId"
import { pushToNormalizeData } from "../helper/normalization"

export const initialEditorValue: CustomElement[] = [{
  type: 'paragraph',
  children: [{ text: '' }],
}]

const initialFormState = {
  id: '',
  title: '',
  description: initialEditorValue,
  dueDate: '',
  comments: [],
  cardType: CardType.task,
  priority: Priority.major,
  createdAt: new Date().toISOString()
}

interface CreateTaskProps {
  onClose: () => void
}
const CreateTask = ({ onClose }: CreateTaskProps) => {
  const { formState, setFormState, handleChange, handleChangeEditor } = useForm({ initialFormState })
  const { state: board, setState: setBoard } = useRecoilLocalStorageState({ key: boardAtom.key, atom: boardAtom })
  useAssignTaskId({ key: 'counter', setId: setFormState })

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const scrumBoard: Board = cloneDeep(board)
    const newBoard = pushToNormalizeData({ object: scrumBoard, column: 'backlog', key: formState?.id!, item: formState })
    setBoard(newBoard)
    onClose()
  }

  return (
    <div style={{ minWidth: '40rem' }} className='flex flex-col mt-4'>
      <p className='text-xs text-gray-400'>All fields marked with an asterisk (*) are required</p>
      <form className='border-t-gray-300 mt-4 mx-10' onSubmit={handleSubmit}>
        <InputForm
          title='Summary*'
          type='text'
          value={formState?.title}
          name='title'
          hasError={false}
          onChange={handleChange}
          placeholder='Add Title'
          required
        />
        <SelectForm
          title='Card Type'
          name='cardType'
          options={Object.keys(CardType)}
          onChange={handleChange}
          value={formState?.cardType!}
        />
        <EditorForm
          title='Description'
          name='description'
          onChangeEditor={handleChangeEditor}
          value={formState.description!}
        />
        <SelectForm
          title='Priority'
          name='priority'
          options={Object.keys(Priority)}
          onChange={handleChange}
          value={formState?.priority!}
        />
        <InputForm
          title='Due date'
          type='date'
          value={formState?.dueDate}
          className='w-3/12'
          name='dueDate'
          hasError={false}
          onChange={handleChange}
          placeholder='Add due date'
        />
        <div className='w-full flex flex-row justify-between mt-10'>
          <Discard
            onClick={onClose}
          >
            <p>Discard</p>
          </Discard>
          <Submit >
            <p>Submit</p>
          </Submit>
        </div>
      </form>
    </div>
  )
}

export default CreateTask
