import { Link } from "react-router-dom"
import { useState } from "react"

import '../Layout/main.scss'

export function NewUser() {
  const [new_user, setNewUser] = useState({})
  return(
    <section className="login_container">
      <div className="card">
        <h2>Sign Up</h2>
        <fieldset>
          <div className="login">
            <label>Name :</label>
            <input></input>
          </div>
          <div className="login">
            <label>Last name :</label>
            <input></input>
          </div>
          <div className="login">
            <label>Enter your email address :</label>
            <input type='text'></input>
          </div>
          <div className="login">
            <label>Password :</label>
            <input type="password"></input>
          </div>
          <div>
            <button>Sign in</button>
          </div>
        </fieldset>
        <p>Already have an account? <Link to="/login" className="link">Log in</Link></p>
      </div>
    </section>
  )
}