import '../styles/globals.css'
import 'antd/dist/antd.css'
import {useState, useEffect} from 'react'
import type { AppProps } from 'next/app'
import {User, onAuthStateChanged} from 'firebase/auth'
import {Firebase} from '@/features/firebase'
import {SessionContext} from '@/features/session'
import {
  NotAuthenticatedLayout,
  AuthenticatedLayout
} from '@/features/ui'

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
      {authenticatedUser ? (
        <AuthenticatedLayout
          username={authenticatedUser.email!}
          firebase={firebase}
        >
          <Component {...pageProps} />
        </AuthenticatedLayout>
      ) : (
        <NotAuthenticatedLayout>
          <Component {...pageProps} />
        </NotAuthenticatedLayout>
      )}
    </SessionContext.Provider>
  )
}

export default MyApp
