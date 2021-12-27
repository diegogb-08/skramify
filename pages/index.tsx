import { useAuth0 } from '@auth0/auth0-react';
import * as React from 'react';
import Menu from '../components/menu/Menu';

const Landing = () => {
  const { isAuthenticated, isLoading, user } = useAuth0();
  React.useEffect(() => {
    if (isAuthenticated && !isLoading) {
      window.location.href = `/${user?.nickname}`;
    }
  }, [isAuthenticated, isLoading]);
  return (
    <Menu>
      <div className="max-w-md p-4 m-8 block text-center right-0 ml-auto mr-auto">
        Login required!
      </div>
    </Menu>
  );
};

export default Landing;

