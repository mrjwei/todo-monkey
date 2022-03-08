import {ChangeEventHandler, useState, useContext} from 'react'
import {useRouter} from 'next/router'
import { FirebaseContext } from '@/features/firebase'

const SignIn = () => {
  const firebase = useContext(FirebaseContext)

  const router = useRouter()

  const [values, setValues] = useState({
    email: "",
    password: "",
  })
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const target = event.target as HTMLInputElement
    setValues({
      ...values,
      [target.id]: target.value
    })
  }
  const handleSignIn = () => {
    if (!firebase) return
    firebase.signIn(values.email, values.password)
      .then((userCredentials) => {
        const user = userCredentials.user
        router.push("/today")
      })
      .catch(error => console.log(error.code, error.message))
  }
  return (
    <div>
      <h1>Sign Up</h1>
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
      </form>
    </div>
  )
}

export default SignIn