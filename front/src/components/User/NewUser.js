import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

import { useDispatch } from 'react-redux'
import { LOG_IN } from "../../store/reducer/userReducer"

import '../../assets/style.scss'

export function NewUser() {
  const [new_user, setNewUser] = useState({
    email: '',
    password: '',
    firstname: '',
    surname: ''
  })
  const [errors, setErrors] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = () => {
    fetch('http://localhost:3000/user/create', {
      method: 'POST',
      body: JSON.stringify(new_user),
      headers: { 'content-type': 'application/json'},
    })
      .then(response => {
        if( response.status === 204 ) {
          return null
        } else if (response.status === 400) {
          return response.json()
        } else {
          throw new Error('Bad Request')
        }
      })
      .then(data => {
        if (data) {
          if(data.message === 'An error occured') {
            setErrors("This email is already in use")
          } else {
            setErrors(data.message)
          }
        } else {
          const { password , ...current_user } = new_user 
          dispatch(LOG_IN(current_user))
          navigate('/login')
        }
      })
      .catch(error => console.log(error))
  }

  return(
    <section className="login_container">
      <div className="card new_user">
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
            <button className="button-89" onClick={handleSubmit}>Sign in</button>
          </div>
        </fieldset>
        <p>Already have an account? <Link to="/login" className="link">Log in</Link></p>
      </div>
    </section>
  )
}