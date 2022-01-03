import { ChangeEvent, CSSProperties, useState, useMemo, useCallback } from 'react';

// Import the Slate editor factory.
import { createEditor } from 'slate'

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'
import { Descendant } from 'slate'
import { CustomElement } from './editor.types';
import { CodeElement, CustomEditorHelper, DefaultElement, Leaf } from './Elements';

const initialValue: CustomElement[] = [{
  type: 'paragraph',
  children: [{ text: '' }],
}]

interface EditorForm {
  title: string
  name?: string
  className?: string
  onChange?: (ev: ChangeEvent<HTMLSelectElement>) => void
  style?: CSSProperties
}

const EditorForm = ({ title, name, className = '', onChange, style }: EditorForm) => {

  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])

  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />
  }, [])

  const [value, setValue] = useState<Descendant[]>(initialValue)
  console.log({ value })
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
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            contentEditable={false}
            onKeyDown={event => {
              if (!event.ctrlKey) {
                return
              }

              // Replace the `onKeyDown` logic with our new commands.
              switch (event.key) {
                case '*': {
                  event.preventDefault()
                  CustomEditorHelper.toggleCodeBlock(editor)
                  break
                }

                case 'b': {
                  event.preventDefault()
                  CustomEditorHelper.toggleBoldMark(editor)
                  break
                }
              }
            }}
          />
        </Slate>
      </div>
    </div>
  )
}

export default EditorForm
