import '../styles/tailwind.css'
import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import {
  RecoilRoot,
} from 'recoil';

import Menu from '../components/menu/Menu';

import { Auth0Provider } from '@auth0/auth0-react';
import { auth0ClientId, auth0Domain } from '../config';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth0Provider
      domain={auth0Domain!}
      clientId={auth0ClientId!}
      redirectUri={
        typeof window !== 'undefined' ? window.location.origin : ''
      }
    >
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </Auth0Provider>
  )
}

export default MyApp
