import { ChangeEvent, CSSProperties, forwardRef, HTMLInputTypeAttribute, LegacyRef } from "react"

interface InputForm {
  title: string
  type: HTMLInputTypeAttribute | undefined
  name: string
  className?: string
  value: string | number | readonly string[] | undefined
  onChange?: (ev: ChangeEvent<HTMLInputElement>) => void
  style?: CSSProperties
  hasError: boolean
  placeholder?: string
}

const InputForm = ({ title, type, name, className = '', value, onChange, style, hasError = false, placeholder }: InputForm) => {
  return (
    <div className='flex items-center mt-10'>
      <p className='font-bold text-gray-500 w-40 text-right'>{title}</p>
      <input
        type={type}
        name={name}
        className={`mx-4 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm leading-6 text-gray-900 placeholder-gray-400 rounded-md py-2 pl-4 ring-1 ring-gray-200 shadow-sm
          ${className} 
          ${hasError ? 'ring-red-500 focus:ring-red-500' : ''}`
        }
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={style}
      />
    </div>
  )
}

export default InputForm
