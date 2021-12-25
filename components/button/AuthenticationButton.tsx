
interface AuthenticationButton {
  onClick: () => void,
  text: string,
}
const AuthenticationButton = ({ onClick, text }: AuthenticationButton) => {
  return <button
    onClick={onClick}
    className='text-white font-bold px-4 py-2 bg-red-600 rounded hover:bg-red-800'
    children={text}
  />
}

export default AuthenticationButton
