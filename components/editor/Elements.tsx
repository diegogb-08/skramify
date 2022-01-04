import { ButtonHTMLAttributes, DetailedHTMLProps, MouseEvent, MouseEventHandler, ReactNode } from "react"
import { Editor, Text, Transforms } from "slate"
import { CustomEditor } from "./editor.types"
import { isFormatActive } from "./util"

interface ElementProps {
  attributes: React.Attributes,
  children: React.ReactNode,
  leaf?: any
}

// Define a React component renderer for our code blocks.
export const CodeElement = ({ attributes, children }: ElementProps) => {
  return (
    <pre {...attributes}>
      <code>{children}</code>
    </pre>
  )
}

export const DefaultElement = ({ attributes, children }: ElementProps) => {
  return <p {...attributes}>{children}</p>
}

// Define a React component to render leaves with bold text.
export const Leaf = ({ attributes, children, leaf }: ElementProps) => {
  return (
    <span
      {...attributes}
      style={{
        fontWeight: leaf.bold ? 'bold' : 'normal',
        fontStyle: leaf.italic ? 'italic' : 'normal',
        textDecorationLine: leaf.underlined ? 'underline' : 'none'
      }}
    >
      {children}
    </span>
  )
}

// Define our own custom set of helpers.
export const CustomEditorHelper = {
  // isBoldMarkActive(editor: CustomEditor) {
  //   const [match] = Editor.nodes(editor, {
  //     match: n => n.bold === true,
  //     universal: true,
  //   })

  //   return !!match
  // },

  // isItalicMarkActive(editor: CustomEditor) {
  //   const [match] = Editor.nodes(editor, {
  //     match: n => n.italic === true,
  //     universal: true,
  //   })

  //   return !!match
  // },

  // isCodeBlockActive(editor: CustomEditor) {
  //   const [match] = Editor.nodes(editor, {
  //     match: n => n.type === 'code',
  //   })

  //   return !!match
  // },

  toggleBoldMark(editor: CustomEditor, format: string) {
    const isActive = isFormatActive(editor, format)
    Transforms.setNodes(
      editor,
      { bold: isActive ? null! : true },
      { match: n => Text.isText(n), split: true }
    )
  },

  toggleItalicMark(editor: CustomEditor, format: string) {
    const isActive = isFormatActive(editor, format)
    Transforms.setNodes(
      editor,
      { italic: isActive ? null! : true },
      { match: n => Text.isText(n), split: true }
    )
  },

  toggleUnderlinedMark(editor: CustomEditor, format: string) {
    const isActive = isFormatActive(editor, format)
    Transforms.setNodes(
      editor,
      { underlined: isActive ? null! : true },
      { match: n => Text.isText(n), split: true }
    )
  },

  toggleCodeBlock(editor: CustomEditor, format: string) {
    const isActive = isFormatActive(editor, format)
    Transforms.setNodes(
      editor,
      { type: isActive ? null : 'code' },
      { match: n => Editor.isBlock(editor, n) }
    )
  },
}

interface EditorButtonProps {
  children: ReactNode
  onMouseDown: (ev: any, name: string) => void
  className?: string
  isActive: boolean
  name: string
}

export const EditorButton = ({ children, onMouseDown, className, isActive, name }: EditorButtonProps) => {
  return <button
    onMouseDown={(ev: any) => onMouseDown(ev, name)}
    children={children}
    name={name}
    className={`px-2 ml-1 my-1 hover:text-blue-400 ${isActive ? 'text-blue-500' : ''}
    ${className}`}
  />
}