import '../styles/globals.css'
import {useState, useEffect} from 'react'
import type { AppProps } from 'next/app'
import {User, onAuthStateChanged} from 'firebase/auth'
import {Firebase, FirebaseContext} from '@/features/firebase'
import {SessionContext} from '@/features/session'

function MyApp({ Component, pageProps }: AppProps) {
  const firebase = new Firebase()

  const [authenticatedUser, setAuthenticatedUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    onAuthStateChanged(firebase.auth, (user) => {
      if (user) {
        setAuthenticatedUser(user)
      } else {
        setAuthenticatedUser(null)
      }
      setIsLoading(false)
    })
  }, [firebase.auth])

  return (
    <SessionContext.Provider value={{firebase, authenticatedUser, isLoading}}>
      <Component {...pageProps} />
    </SessionContext.Provider>
  )
}

export default MyApp
