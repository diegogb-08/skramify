import { atom } from 'recoil'
import { Board } from '../types';

const valueInLocalStorage = typeof window !== 'undefined' && window?.localStorage?.getItem('boardState')
const parsedValueInLocalStorage: Board | null = valueInLocalStorage ? JSON.parse(valueInLocalStorage) : null

export const board = atom<Board>({
  key: 'boardState',
  default: parsedValueInLocalStorage || {
    tasks: {

    },
    columns: {
      'backlog': {
        id: 'backlog',
        description: 'Backlog',
        taskIds: []
      },
      'inProgress': {
        id: 'inProgress',
        description: 'In Progress',
        taskIds: []
      },
      'done': {
        id: 'done',
        description: 'Done',
        taskIds: []
      }
    },
    columnOrder: ['backlog', 'inProgress', 'done']
  }
});