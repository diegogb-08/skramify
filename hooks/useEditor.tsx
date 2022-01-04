import { KeyboardEvent } from "react"
import { CustomEditor } from "../components/editor/editor.types";
import { CustomEditorHelper } from '../components/editor/util';
const { toggleBoldMark, toggleCodeBlock, toggleItalicMark, toggleUnderlinedMark } = CustomEditorHelper

const useEditor = (editor: CustomEditor) => {

  const handleOnClickFormat = (name: string) => {
    switch (name) {
      case 'bold':
        toggleBoldMark(editor, name)
        break;
      case 'italic':
        toggleItalicMark(editor, name)
        break;
      case 'underlined':
        toggleUnderlinedMark(editor, name)
        break;
      case 'code':
        toggleCodeBlock(editor, name)
        break;

      default:
        break;
    }
  }

  const handleOnKeyDown = (ev: KeyboardEvent<HTMLDivElement>) => {
    if (!ev.ctrlKey) {
      return
    }

    ev.preventDefault()
    // Replace the `onKeyDown` logic with our new commands.
    switch (ev.key) {
      case '*': {
        toggleCodeBlock(editor, 'code')
        break
      }

      case 'b': {
        toggleBoldMark(editor, 'bold')
        break
      }

      case 'i': {
        toggleItalicMark(editor, 'italic')
        break
      }

      case 'u': {
        toggleUnderlinedMark(editor, 'underlined')
        break
      }
    }
  }

  return {
    editor,
    handleOnKeyDown,
    handleOnClickFormat
  }
}

export default useEditor
