import { useAuth0 } from '@auth0/auth0-react';
import AuthenticationButton from '../button/AuthenticationButton';

interface MenuProps {
  children: React.ReactNode
  onClickCreate?: () => void
}

const Menu = ({ children, onClickCreate }: MenuProps) => {
  const {
    isAuthenticated,
    user,
    loginWithRedirect,
    logout,
  } = useAuth0();


  return (
    <div className='max-w-full h-full'>
      <div className='container bg-sky-700 max-w-full flex justify-between h-16 overflow-hidden'>
        <div className='h-full w-1/5 flex justify-between items-center p-2 text-white font-bold'>
          {
            isAuthenticated &&
            <button className='bg-sky-900 hover:bg-sky-800 px-4 py-2 rounded' onClick={onClickCreate} children={'Create'} />

          }
        </div>
        <div className='h-full w-1/5 flex justify-between items-center p-2 text-white font-bold'>
          {
            isAuthenticated ?
              <>
                Hello {user?.nickname}
                <img className='h-full rounded-full ml-2' src={user?.picture!} alt='Profile picture' />
                <AuthenticationButton onClick={() => logout({ returnTo: window.location.origin })} text='Log out' />
              </>
              :
              <>
                <div />
                <AuthenticationButton onClick={loginWithRedirect} text='Log in' />
              </>
          }
        </div>
      </div>
      {children}
    </div>
  )
}

export default Menu
