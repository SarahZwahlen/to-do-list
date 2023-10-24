import { useState } from 'react'
import { json, Link } from 'react-router-dom'

import '../Layout/main.scss'

export function Login () {
  const [user_data, setUserData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = () => {
    fetch('http://localhost:3000/user/login', {
      method: 'POST',
      body: JSON.stringify(user_data)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
  }

  return (
    <section className='login_container'>
      <div className='card'>
        <h2>Welcome</h2>
        <fieldset >
          <div className='login'>
            <label>Email address</label>
            <input type='text' placeholder='test@mail.com' value={user_data.email} onChange={(e) => setUserData({...user_data, email: e.target.value})}></input>
          </div>
          <div className='login'>
            <label>Password</label>
            <input type='password' placeholder='your secret password' value={user_data.password} onChange={(e) => setUserData({...user_data, password: e.target.value})}></input>
          </div>
          <div className='button'>
            <button onClick={handleSubmit}>Log in</button>
          </div>
        </fieldset>
        <p>Don't have an account ? <Link to='/new_user' className='link'>Sign in</Link></p>
      </div>
    </section>
  )
}