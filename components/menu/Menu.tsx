import { useAuth0 } from '@auth0/auth0-react';
import AuthenticationButton from '../button/AuthenticationButton';

export type Menu = {
  isMobile?: boolean
}

const Menu = ({ isMobile }: Menu) => {
  const {
    isAuthenticated,
    user,
    loginWithRedirect,
    logout,
  } = useAuth0();

  return (
    <div className='container max-w-full h-16 overflow-hidden'>
      <div className='bg-blue-400 w-full h-full flex justify-end items-center p-2'>
        {
          isAuthenticated ?
            <>
              Hello {user?.nickname}
              <img className='h-full rounded-full ml-2' src={user?.picture!} alt='Profile picture' />
              <AuthenticationButton onClick={() => logout({ returnTo: window.location.origin })} text='Log out' />
            </>
            :
            <AuthenticationButton onClick={loginWithRedirect} text='Log in' />
        }
      </div>
    </div>
  )
}

export default Menu
