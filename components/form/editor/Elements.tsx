import { Editor, Text, Transforms } from "slate"
import { CustomEditor } from "./editor.types"

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
      style={{ fontWeight: leaf.bold ? 'bold' : 'normal' }}
    >
      {children}
    </span>
  )
}

// Define our own custom set of helpers.
export const CustomEditorHelper = {
  isBoldMarkActive(editor: CustomEditor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.bold === true,
      universal: true,
    })

    return !!match
  },

  isCodeBlockActive(editor: CustomEditor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === 'code',
    })

    return !!match
  },

  toggleBoldMark(editor: CustomEditor) {
    const isActive = CustomEditorHelper.isBoldMarkActive(editor)
    Transforms.setNodes(
      editor,
      { bold: isActive ? null! : true },
      { match: n => Text.isText(n), split: true }
    )
  },

  toggleCodeBlock(editor: CustomEditor) {
    const isActive = CustomEditorHelper.isCodeBlockActive(editor)
    Transforms.setNodes(
      editor,
      { type: isActive ? null : 'code' },
      { match: n => Editor.isBlock(editor, n) }
    )
  },
}