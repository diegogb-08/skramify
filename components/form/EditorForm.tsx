import { ChangeEvent, CSSProperties, useState, useMemo } from 'react';

// Import the Slate editor factory.
import { createEditor } from 'slate'

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'

// TypeScript users only add this code
import { BaseEditor, Descendant } from 'slate'
import { ReactEditor } from 'slate-react'

type CustomElement = { type: 'paragraph'; children: CustomText[] }
type CustomText = { text: string }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

interface EditorForm {
  title: string
  name?: string
  className?: string
  onChange?: (ev: ChangeEvent<HTMLSelectElement>) => void
  style?: CSSProperties

}

const EditorForm = ({ title, name, className = '', onChange, style }: EditorForm) => {
  const initialValue: CustomElement[] = []
  const [value, setValue] = useState<Descendant[]>(initialValue)
  const editor = useMemo(() => withReact(createEditor()), [])
  return (
    <div className='flex items-center mt-10'>
      <p className='font-bold text-gray-500 w-40 text-right'>{title}</p>
      <div className='mx-4 w-full h-96 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm leading-6 text-gray-900 placeholder-gray-400 rounded-md py-2 pl-4 ring-1 ring-gray-200 shadow-sm'>
        <Slate
          editor={editor}
          value={value}
          onChange={newValue => setValue(newValue)}
        >
          <Editable />
        </Slate>
      </div>
    </div>
  )
}

export default EditorForm
