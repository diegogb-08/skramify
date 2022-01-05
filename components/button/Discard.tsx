import { ReactNode } from "react"

interface DiscardProps {
  children: ReactNode
  onClick: () => void
}
const Discard = ({ children, onClick }: DiscardProps) => {
  return <button
    type='button'
    children={children}
    onClick={onClick}
    className={`text-base font-medium rounded-md h-12 px-6 w-full sm:w-auto bg-gray-100 text-gray-900 py-3 text-center cursor-pointer`}
  />
}

export default Discard
