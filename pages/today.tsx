import {useContext} from 'react'
import {useRouter} from 'next/router'
import {SessionContext} from '@/features/session'

const Today = () => {
  const {authenticatedUser, isLoading} = useContext(SessionContext)

  const router = useRouter()

  if (isLoading) {
    return <div>loading...</div>
  }

  if (!authenticatedUser) {
    router.push("/signin")
    return null
  }

  return (
    <p>today</p>
  )
}

export default Today