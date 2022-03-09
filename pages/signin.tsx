import React, {ChangeEventHandler, useState, useContext} from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'
import { SessionContext } from '@/features/session'

const SignIn = () => {
  const {firebase, authenticatedUser, isLoading} = useContext(SessionContext)

  const router = useRouter()

  const [values, setValues] = useState({
    email: "",
    password: "",
  })

  if (isLoading) {
    return <div>loading...</div>
  }

  if (authenticatedUser) {
    router.push("/today")
    return null
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const target = event.target as HTMLInputElement
    setValues({
      ...values,
      [target.id]: target.value
    })
  }
  const handleSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!firebase) return

    firebase.signIn(values.email, values.password)
      .then(() => {
        router.push("/today")
      })
      .catch(error => console.log(error.code, error.message))
  }
  return (
    <div>
      <h1>Sign In</h1>
      <form
        onSubmit={handleSignIn}
      >
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={values.email} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={values.password} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
        <p>Not have an account? <Link href="/signup">Sign Up</Link></p>
      </form>
    </div>
  )
}

export default SignIn