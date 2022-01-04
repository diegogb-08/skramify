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
    <pre {...attributes} className='my-2'>
      <code className='bg-gray-300 m-1 p-2 rounded-sm'>{children}</code>
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

interface EditorButtonProps {
  children: ReactNode
  onClickFormat: (name: string) => void
  className?: string
  isActive: boolean
  name: string
}

export const EditorButton = ({ children, onClickFormat, className, isActive, name }: EditorButtonProps) => {
  return <button
    onClick={() => onClickFormat(name)}
    children={children}
    type='button'
    name={name}
    className={`px-2 ml-1 my-1 hover:text-blue-400 ${isActive ? 'text-blue-500' : ''}
    ${className}`}
  />
}