import { Link } from "react-router-dom"
import { useState } from "react"

import '../Layout/main.scss'

export function NewUser() {
  const [new_user, setNewUser] = useState({
    email: '',
    password: '',
    firstname: '',
    surname: ''
  })
  const [errors, setErrors] = useState('')
  const handleSubmit = () => {
    fetch('http://localhost:3000/user/create', {
      method: 'POST',
      body: JSON.stringify(new_user),
      headers: { 'content-type': 'application/json'}
    })
      .then(response => response.json())
      .then(res => {
        if(res.message !== 'User is created') {
          setErrors(res.message)
        }
      })
      .catch(error => console.log(error))
  }

  return(
    <section className="login_container">
      <div className="card">
        <h2>Sign Up</h2>
        <fieldset>
          <div className="login">
            <label>Name :</label>
            <input type="text" value={new_user.surname} onChange={(e) => setNewUser({...new_user, surname: e.target.value})}></input>
          </div>
          <div className="login">
            <label>Last name :</label>
            <input type='text' value={new_user.firstname} onChange={(e) => setNewUser({...new_user, firstname: e.target.value})}></input>
          </div>
          <div className="login">
            <label>Enter your email address :</label>
            <input type='text' value={new_user.email} onChange={(e) => setNewUser({...new_user, email: e.target.value})}></input>
          </div>
          <div className="login">
            <label>Password :</label>
            <input type="password" value={new_user.password} onChange={(e) => setNewUser({...new_user, password: e.target.value})}></input>
          </div>
          <p className="p-error">{errors}</p>
          <div>
            <button onClick={handleSubmit}>Sign in</button>
          </div>
        </fieldset>
        <p>Already have an account? <Link to="/login" className="link">Log in</Link></p>
      </div>
    </section>
  )
}