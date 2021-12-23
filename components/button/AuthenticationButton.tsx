
interface AuthenticationButton {
  onClick: () => void,
  text: string,
}
const AuthenticationButton = ({ onClick, text }: AuthenticationButton) => {
  return <button
    onClick={onClick}
    className='text-white font-bold p-4'
    children={text}
  />
}

export default AuthenticationButton
