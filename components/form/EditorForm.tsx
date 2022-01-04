import { CSSProperties, useCallback, useMemo } from 'react';

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'
import { createEditor, Descendant } from 'slate'
import { CodeElement, DefaultElement, EditorButton, Leaf } from '../editor/Elements';
import useEditor from '../../hooks/useEditor';
import { CustomEditorHelper, isFormatActive } from '../editor/util';

interface EditorForm {
  title: string
  name: string
  className?: string
  onChangeEditor: (value: Descendant[], name: string) => void
  style?: CSSProperties
  value: Descendant[]
}

const EditorForm = ({ title, onChangeEditor, name, value }: EditorForm) => {

  const editor = useMemo(() => withReact(createEditor()), [])
  const { handleOnKeyDown, handleOnClickFormat } = useEditor(editor)

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
            onClickFormat={handleOnClickFormat}
            isActive={isFormatActive(editor, 'bold')}
          >
            <p className='font-bold'>B</p>
          </EditorButton>
          <EditorButton
            name='italic'
            onClickFormat={handleOnClickFormat}
            isActive={isFormatActive(editor, 'italic')}
          >
            <p className='italic'>I</p>
          </EditorButton>
          <EditorButton
            name='underlined'
            onClickFormat={handleOnClickFormat}
            isActive={isFormatActive(editor, 'underlined')}
          >
            <p className='underline'>U</p>
          </EditorButton>
          <EditorButton
            name='code'
            onClickFormat={handleOnClickFormat}
            isActive={CustomEditorHelper.isCodeBlockActive(editor)}
          >
            <p className='italic'>{'</>'}</p>
          </EditorButton>
        </div>
        <div className='w-full h-96 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm leading-6 text-gray-900 placeholder-gray-400 rounded-b-md py-2 pl-4 ring-1 ring-gray-200 shadow-sm'>
          <Slate
            editor={editor}
            value={value}
            onChange={(newValue) => onChangeEditor(newValue, name)}
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
