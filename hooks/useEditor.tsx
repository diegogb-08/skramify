import { KeyboardEvent, useCallback, useMemo } from "react"
import { createEditor } from "slate"
import { withReact } from "slate-react"
import { CustomEditor } from "../components/editor/editor.types";
import { CodeElement, CustomEditorHelper, DefaultElement, Leaf } from "../components/editor/Elements"
import { isFormatActive } from '../components/editor/util';
const { toggleBoldMark, toggleCodeBlock, toggleItalicMark, toggleUnderlinedMark } = CustomEditorHelper

const useEditor = (editor: CustomEditor) => {

  const handleOnMouseDown = (ev: any, name: string) => {
    ev.preventDefault()
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
    console.log(ev.key)
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
    handleOnMouseDown
  }
}

export default useEditor
