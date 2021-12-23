import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';

function useCheckAuthentication() {
  const { isAuthenticated, isLoading } = useAuth0();
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      window.location.href = '/';
    }
  }, [isAuthenticated, isLoading]);
}

export default useCheckAuthentication
