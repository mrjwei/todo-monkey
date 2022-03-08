import {useContext} from 'react'
import {useRouter} from 'next/router'
import {FirebaseContext} from '@/features/firebase'

const Today = () => {
  const firebase = useContext(FirebaseContext)

  const router = useRouter()

  const handleSignOut = () => {
    if (!firebase) return

    firebase.signOut()
      .then(() => {
        router.push("/")
      })
  }

  return (
    <button onClick={handleSignOut}>Sign Out</button>
  )
}

export default Today