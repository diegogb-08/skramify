import { Editor, Text, Transforms } from "slate";
import { CustomEditor } from "./editor.types";

export const isFormatActive = (editor: Editor, format: string): boolean => {
  const marks = Editor.marks(editor);

  switch (format) {
    case 'bold':
      return marks?.bold || false;
    case 'italic':
      return marks?.italic || false;
    case 'underlined':
      return marks?.underlined || false;
    default:
      return false;
  }
};

// Define our own custom set of helpers.
export const CustomEditorHelper = {

  isCodeBlockActive(editor: CustomEditor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === 'code',
    })

    return !!match
  },

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
    const isActive = CustomEditorHelper.isCodeBlockActive(editor)
    Transforms.setNodes(
      editor,
      { type: isActive ? null : 'code' },
      { match: n => Editor.isBlock(editor, n) }
    )
  },
}