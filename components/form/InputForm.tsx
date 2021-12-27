import { ChangeEventHandler, HTMLInputTypeAttribute } from "react"

interface InputForm {
  title: string
  type: HTMLInputTypeAttribute | undefined
  name: string
  className: string
  value: string | number | readonly string[] | undefined
  onChange: (ev: ChangeEventHandler<HTMLInputElement> | undefined) => void
}

const InputForm = ({ title, type, name, className = '', value, onChange }: InputForm) => {
  return (
    <div className='flex '>
      <p>{title}</p>
      <input
        type={type}
        name={name}
        className={` ${className}`}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default InputForm
