import { useState } from 'react'
import { Link } from 'react-router-dom'

import '../Layout/main.scss'

export function Login () {
  const [user_data, setUserData] = useState({})

  return (
    <section className='login_container'>
      <div className='card'>
        <h2>Welcome</h2>
        <fieldset >
          <div className='login'>
            <label>Email address</label>
            <input type='text'></input>
          </div>
          <div className='login'>
            <label>Password</label>
            <input type='password'></input>
          </div>
        </fieldset>
        <p>Don't have an account ? <Link to='new_user' className='link'>Click Here</Link></p>
      </div>
    </section>
  )
}