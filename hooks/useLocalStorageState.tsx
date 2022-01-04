/**
 *
 * @param {String} key The key to set in localStorage for this value
 * @param {Object} defaultValue The value to use if it is not already in localStorage
 * @param {{serialize: Function, deserialize: Function}} options The serialize and deserialize functions to use (defaults to JSON.stringify and JSON.parse respectively)
 */

import { useEffect, useRef, useState } from "react"

interface useLocalStorageStateProps {
  key: string
  defaultValue: Object
  options?: { serialize: JSON["stringify"] | Function, deserialize: JSON["parse"] | Function }
}

const useLocalStorageState = ({ key, defaultValue = '', options = { serialize: JSON.stringify, deserialize: JSON.parse } }: useLocalStorageStateProps) => {
  const [state, setState] = useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key)
    if (valueInLocalStorage) {
      return options?.deserialize(valueInLocalStorage)
    }
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue
  })

  const prevKeyRef = useRef(key)

  useEffect(() => {
    const prevKey = prevKeyRef.current
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key
    window.localStorage.setItem(key, options?.serialize(state))
  }, [key, state, options?.serialize])

  return [state, setState]
}

export default useLocalStorageState
