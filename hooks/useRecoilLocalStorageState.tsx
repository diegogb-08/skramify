/**
 *
 * @param {String} key The key to set in localStorage for this value
 * @param {Object} defaultValue The value to use if it is not already in localStorage
 * @param {{serialize: Function, deserialize: Function}} options The serialize and deserialize functions to use (defaults to JSON.stringify and JSON.parse respectively)
 */

import { useEffect, useRef } from "react"
import { RecoilState, useRecoilState } from "recoil"

export interface useRecoilLocalStorageStateProps {
  key: string
  atom: RecoilState<any>
}

const useRecoilLocalStorageState = ({ key, atom }: useRecoilLocalStorageStateProps) => {

  const [state, setState] = useRecoilState(atom)

  const prevKeyRef = useRef(key)

  useEffect(() => {
    const prevKey = prevKeyRef.current
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key
    window.localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return { state, setState }
}

export default useRecoilLocalStorageState
