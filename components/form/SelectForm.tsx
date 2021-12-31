import { ChangeEvent, CSSProperties, SyntheticEvent } from "react"
import { capitalizeFirstLetter } from "../../helper/utils"
import { CardType, Priority } from "../../types"

interface SelectForm {
  title: string
  name: string
  className?: string
  options: any[]
  onChange?: (ev: ChangeEvent<HTMLSelectElement>) => void
  style?: CSSProperties
  placeholder?: string
  value: string
}

const SelectForm = ({ title, name, className = '', options, onChange, style, value }: SelectForm) => {
  return (
    <div className='flex items-center mt-10'>
      <p className='font-bold text-gray-500 w-40 text-right'>{title}</p>
      <select
        className={`mx-4 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm leading-6 text-gray-900 placeholder-gray-400 rounded-md py-2 pl-4 ring-1 ring-gray-200 shadow-sm
          ${className}`
        }
        name={name}
        style={style}
        onChange={onChange}
        value={value}
      >
        {
          options.map(value => {
            return <option key={value} value={value}>{capitalizeFirstLetter(value)}</option>
          })
        }
      </select>
    </div>
  )
}

export default SelectForm
