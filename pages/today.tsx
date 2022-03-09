import {useContext, useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import {SessionContext} from '@/features/session'

const Today = () => {
  const {firebase, authenticatedUser, isLoading} = useContext(SessionContext)

  const router = useRouter()

  if (isLoading) {
    return <div>loading...</div>
  }

  if (!authenticatedUser) {
    router.push("/signin")
    return null
  }

  const handleSignOut = () => {
    if (!firebase) return

    firebase.signOut()
      .then(() => {
        router.push("/signin")
      })
  }

  return (
    <button onClick={handleSignOut}>Sign Out</button>
  )
}

export default Today