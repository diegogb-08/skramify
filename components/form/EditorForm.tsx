import { ChangeEvent, CSSProperties, useCallback, useMemo, useState } from 'react';

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'
import { createEditor, Descendant } from 'slate'
import { CustomElement } from '../editor/editor.types';
import { CodeElement, DefaultElement, EditorButton, Leaf } from '../editor/Elements';
import useEditor from '../../hooks/useEditor';
import { isFormatActive } from '../editor/util';

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

  const [value, setValue] = useState<Descendant[]>(initialValue)
  const editor = useMemo(() => withReact(createEditor()), [])
  const { handleOnKeyDown, handleOnMouseDown } = useEditor(editor)

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

  return (
    <div className='flex items-center mt-10'>
      <p className='font-bold text-gray-500 w-40 text-right'>{title}</p>
      <div className='mx-4 w-full ring-1 ring-gray-200 rounded-md'>
        <div className='w-full bg-gray-100 shadow-sm'>
          <EditorButton
            name='bold'
            onMouseDown={handleOnMouseDown}
            isActive={isFormatActive(editor, 'bold')}
          >
            <p className='font-bold'>B</p>
          </EditorButton>
          <EditorButton
            name='italic'
            onMouseDown={handleOnMouseDown}
            isActive={isFormatActive(editor, 'italic')}
          >
            <p className='italic'>I</p>
          </EditorButton>
          <EditorButton
            name='underlined'
            onMouseDown={handleOnMouseDown}
            isActive={isFormatActive(editor, 'underlined')}
          >
            <p className='underline'>U</p>
          </EditorButton>
          <EditorButton
            name='code'
            onMouseDown={handleOnMouseDown}
            isActive={isFormatActive(editor, 'code')}
          >
            <p className='italic'>{'</>'}</p>
          </EditorButton>
        </div>
        <div className='w-full h-96 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm leading-6 text-gray-900 placeholder-gray-400 rounded-b-md py-2 pl-4 ring-1 ring-gray-200 shadow-sm'>
          <Slate
            editor={editor}
            value={value}
            onChange={newValue => setValue(newValue)}
          >
            <Editable
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              onKeyDown={handleOnKeyDown}
            />
          </Slate>
        </div>
      </div>
    </div>
  )
}

export default EditorForm
