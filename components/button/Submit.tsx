import React, { ReactNode } from 'react'

interface SubmitProps {
  children: ReactNode
}
const Submit = ({ children }: SubmitProps) => {
  return <button
    type='submit'
    className={`focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50 text-white font-semibold h-12 px-6 rounded-md w-full flex items-center justify-center sm:w-auto bg-sky-500 highlight-white/20 hover:bg-sky-400`}
    children={children}
  />
}

export default Submit
