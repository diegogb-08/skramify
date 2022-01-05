import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { TaskCard } from "../types"

/**
 *
 * @param {String} key The key to set in localStorage for this value
 * @param {Object} defaultValue The value to use if it is not already in localStorage
 * @param {{serialize: Function, deserialize: Function}} options The serialize and deserialize functions to use (defaults to JSON.stringify and JSON.parse respectively)
 */


interface useAssignTaskIdProps {
  key: string
  defaultValue?: Object
  options?: { serialize: JSON["stringify"] | Function, deserialize: JSON["parse"] | Function }
  setId: Dispatch<SetStateAction<TaskCard>>
}

const useAssignTaskId = ({ key, setId, defaultValue = 0, options = { serialize: JSON.stringify, deserialize: JSON.parse } }: useAssignTaskIdProps) => {
  const [counter, setCounter] = useState(() => {
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
    window.localStorage.setItem(key, options?.serialize(counter))
  }, [key, counter, options?.serialize])

  useEffect(() => {
    const newCounter = counter + 1
    const newId = `SKR-${newCounter}`
    setId((prevForm: TaskCard) => ({ ...prevForm, 'id': newId }))
    setCounter(newCounter)
  }, [])
}

export default useAssignTaskId
