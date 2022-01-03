import { BaseEditor, BaseText } from "slate"
import { HistoryEditor } from "slate-history"
import { ReactEditor } from "slate-react"

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor

export type ParagraphElement = {
  type: 'paragraph'
  children: CustomText[]
}

export type CodeElement = {
  type: 'code' | null
  children: CustomText[]
}

export type HeadingElement = {
  type: 'heading'
  level: number
  children: CustomText[]
}

export type CustomElement = ParagraphElement | HeadingElement | CodeElement

export interface CustomText extends BaseText {
  bold?: boolean;
  code?: boolean;
  italic?: boolean;
  underlined?: boolean;
}

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: CustomText
  }
}
