import { atom } from 'recoil'
import { Board } from '../types';

const valueInLocalStorage = typeof window !== 'undefined' && window?.localStorage?.getItem('boardState')
const parsedValueInLocalStorage: Board | null = valueInLocalStorage ? JSON.parse(valueInLocalStorage) : null

export const board = atom({
  key: 'boardState',
  default: parsedValueInLocalStorage || {
    backlog: [],
    inProgress: [],
    done: []
  }
});