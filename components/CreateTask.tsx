import useForm from "../hooks/useForm"
import { CardType, Priority } from "../types"
import EditorForm from "./form/EditorForm"
import InputForm from "./form/InputForm"
import SelectForm from "./form/SelectForm"



const initialFormState = {
  title: '',
  description: '',
  dueDate: '',
  comments: [],
  cardType: CardType.task,
  priority: Priority.major
}

const CreateTask = () => {
  const { formState, handleChange } = useForm({ initialFormState })

  return (
    <div style={{ minWidth: '40rem' }} className='flex flex-col mt-4'>
      <p className='text-xs text-gray-400'>All fields marked with an asterisk (*) are required</p>
      <form className='border-t-gray-300 mt-4 mx-10'>
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
        <InputForm
          title='Description*'
          type='text'
          value={formState?.description}
          className=''
          name='description'
          hasError={false}
          onChange={handleChange}
          placeholder='Add description'
        />
        <SelectForm
          title='Priority'
          name='priority'
          options={Object.keys(Priority)}
          onChange={handleChange}
          value={formState?.priority!}
        />
        <EditorForm title='Editor' />
      </form>
    </div>
  )
}

export default CreateTask
