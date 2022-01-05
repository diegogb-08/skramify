import { useEffect } from "react"
import { useRecoilValue } from "recoil"
import { useRecoilLocalStorageStateProps } from "./useRecoilLocalStorageState"



const useRecoilLocalStorageValue = ({ key, atom }: useRecoilLocalStorageStateProps) => {
  const atomState = useRecoilValue(atom)

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(atomState))
  }, [atomState])
  return atomState
}

export default useRecoilLocalStorageValue
