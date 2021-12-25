import { useAuth0 } from '@auth0/auth0-react';
import AuthenticationButton from '../button/AuthenticationButton';


const Menu = () => {
  const {
    isAuthenticated,
    user,
    loginWithRedirect,
    logout,
  } = useAuth0();

  const handleClick = () => {

  }

  return (
    <div className='container bg-sky-700 max-w-full flex justify-between h-16 overflow-hidden'>
      <div className='h-full w-1/5 flex justify-between items-center p-2 text-white font-bold'>
        <button className='bg-sky-900 hover:bg-sky-800 px-4 py-2 rounded' onClick={handleClick} children={'Create'} />
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
            <AuthenticationButton onClick={loginWithRedirect} text='Log in' />
        }
      </div>
    </div>
  )
}

export default Menu
