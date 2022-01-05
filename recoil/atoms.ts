import { atom } from 'recoil'
import { Board } from '../types';

export const board = atom({
  key: 'boardState',
  default: (): Board => {
    const valueInLocalStorage = window.localStorage.getItem('boardState')
    if (valueInLocalStorage) {
      return JSON.parse(valueInLocalStorage)
    }
    return {
      backlog: [],
      inProgress: [],
      done: []
    }
  },
});