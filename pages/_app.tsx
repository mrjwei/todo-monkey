import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {Firebase, FirebaseContext} from '@/features/firebase'

function MyApp({ Component, pageProps }: AppProps) {
  const firebase = new Firebase()

  return (
    <FirebaseContext.Provider value={firebase}>
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  )
}

export default MyApp
