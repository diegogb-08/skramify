import { useAuth0 } from '@auth0/auth0-react';
import AuthenticationButton from '../button/AuthenticationButton';

export type Menu = {
  isMobile: boolean
}

const Menu = ({ isMobile }: Menu) => {
  const {
    isAuthenticated,
    user,
    loginWithRedirect,
    logout,
  } = useAuth0();

  return (
    <div className='container w-full h-12'>
      <div className='bg-blue-400 w-full h-full flex justify-end items-center pr-4'>
        {
          isAuthenticated ?
            <div>
              Hello {user?.nickname}
              <AuthenticationButton onClick={() => logout({ returnTo: window.location.origin })} text='Log out' />
            </div>
            :
            <div>
              <AuthenticationButton onClick={loginWithRedirect} text='Log in' />
            </div>
        }
      </div>
    </div>
  )
}

export default Menu
