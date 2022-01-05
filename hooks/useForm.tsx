import { ChangeEvent, useEffect, useState } from "react"
import { Descendant } from "slate"
import { TaskCard } from "../types"

interface UseForm {
  initialFormState: TaskCard
}

const useForm = ({ initialFormState }: UseForm) => {

  const [formState, setFormState] = useState<TaskCard>(initialFormState)

  const handleChange = (ev: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value, name } = ev.target
    setFormState((prevForm: TaskCard) => ({ ...prevForm, [name]: value }))
  }

  const handleChangeEditor = (value: Descendant[], name: string) => {
    setFormState((prevForm: TaskCard) => ({ ...prevForm, [name]: value }))
  }

  useEffect(() => {
    console.debug({ formState })
  }, [formState])

  return { formState, setFormState, handleChange, handleChangeEditor }
}

export default useForm;