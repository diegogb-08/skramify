import { FormEvent } from "react"
import useForm from "../hooks/useForm"
import useRecoilLocalStorageState from "../hooks/useRecoilLocalStorageState"
import { CardType, Priority } from "../types"
import Discard from "./button/Discard"
import Submit from "./button/Submit"
import { CustomElement } from "./editor/editor.types"
import EditorForm from "./form/EditorForm"
import InputForm from "./form/InputForm"
import SelectForm from "./form/SelectForm"
import { board as boardAtom } from '../recoil/atoms'

export const initialEditorValue: CustomElement[] = [{
  type: 'paragraph',
  children: [{ text: '' }],
}]

const initialFormState = {
  title: '',
  description: initialEditorValue,
  dueDate: '',
  comments: [],
  cardType: CardType.task,
  priority: Priority.major
}

interface CreateTaskProps {
  onClickDiscard: () => void
}
const CreateTask = ({ onClickDiscard }: CreateTaskProps) => {
  const { formState, handleChange, handleChangeEditor } = useForm({ initialFormState })
  const { state: board, setState: setBoard } = useRecoilLocalStorageState({ key: 'boardState', atom: boardAtom })

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    setBoard(Object.assign({}, board, {
      ['backlog']: formState
    }))
  }

  return (
    <div style={{ minWidth: '40rem' }} className='flex flex-col mt-4'>
      <p className='text-xs text-gray-400'>All fields marked with an asterisk (*) are required</p>
      <form className='border-t-gray-300 mt-4 mx-10' onSubmit={handleSubmit}>
        <InputForm
          title='Summary*'
          type='text'
          value={formState?.title}
          className=''
          name='title'
          hasError={false}
          onChange={handleChange}
          placeholder='Add Title'
        />
        <SelectForm
          title='Card Type'
          name='cardType'
          options={Object.keys(CardType)}
          onChange={handleChange}
          value={formState?.cardType!}
        />
        <EditorForm
          title='Description*'
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
        <div className='w-full flex flex-row justify-between mt-10'>
          <Discard
            onClick={onClickDiscard}
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
