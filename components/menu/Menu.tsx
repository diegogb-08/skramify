import { useAuth0 } from '@auth0/auth0-react';

export type Menu = {
  isMobile: boolean
}

const Menu = ({ isMobile }: Menu) => {
  const {
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
    logout,
  } = useAuth0();

  console.log(user)

  if (isAuthenticated) {
    return (
      <div>
        Hello {user?.name}{' '}
        <button onClick={() => logout({ returnTo: window.location.origin })}>
          Log out
        </button>
      </div>
    );
  } else {

    return (
      <div>
        <button onClick={loginWithRedirect}>Log in</button>
      </div>
    )
  }
}

export default Menu
