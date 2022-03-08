import React, {ChangeEventHandler, useState, useContext} from 'react'
import {useRouter} from 'next/router'
import { FirebaseContext } from '@/features/firebase'

const SignUp = () => {
  const firebase = useContext(FirebaseContext)

  const router = useRouter()

  const [values, setValues] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  })
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const target = event.target as HTMLInputElement
    setValues({
      ...values,
      [target.name]: target.value
    })
  }
  const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!firebase) return

    firebase.signUp(values.email, values.password)
      .then(async (userCredentials) => {
        const user = userCredentials.user
        const newUser = {
          id: user.uid,
          username: values.username,
          name: values.name,
          email: values.email
        }
        await firebase.addData("users", user.uid, newUser)
        router.push("/today")
      })
      .catch(error => console.log(error.code, error.message))
  }
  return (
    <div>
      <h1>Sign Up</h1>
      <form
        onSubmit={handleSignUp}
      >
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" name="username" id="username" value={values.username} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" id="name" value={values.name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" id="email" value={values.email} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password" value={values.password} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default SignUp