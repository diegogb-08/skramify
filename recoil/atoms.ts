import { atom } from 'recoil'
import { BoardColumn } from '../types';

const valueInLocalStorage = typeof window !== 'undefined' && window?.localStorage?.getItem('boardState')
const parsedValueInLocalStorage: BoardColumn[] | null = valueInLocalStorage ? JSON.parse(valueInLocalStorage) : null

export const board = atom<BoardColumn[]>({
  key: 'boardState',
  default: parsedValueInLocalStorage || [
    {
      id: 'backlog',
      description: 'Backlog',
      tasks: []
    },
    {
      id: 'inProgress',
      description: 'In Progress',
      tasks: []
    },
    {
      id: 'done',
      description: 'Done',
      tasks: []
    }
  ]
});