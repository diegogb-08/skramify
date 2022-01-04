import { Editor } from "slate";

export const isFormatActive = (editor: Editor, format: string): boolean => {
  const marks = Editor.marks(editor);

  switch (format) {
    case 'bold':
      return marks?.bold || false;
    case 'code':
      return marks?.code || false;
    case 'italic':
      return marks?.italic || false;
    case 'underlined':
      return marks?.underlined || false;
    default:
      return false;
  }
};