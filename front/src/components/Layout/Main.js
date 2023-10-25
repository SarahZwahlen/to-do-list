import '../../assets/style.scss'

import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import { useSelector } from 'react-redux'

export function Main () {
  const isLogged = useSelector(state => state.user.hasOwnProperty('current_user'))
  const location = useLocation()
  return (
    <>
      { (location.pathname === '/' && !isLogged) &&   
        <section className="main">
          <h1>Welcome</h1>
          <div className='login_container'>
            <Link to="/login" className='link card'>Login</Link>
            <Link to='/new_user' className='link card'>Create account</Link>
          </div>
        </section>}
      { (location.pathname ==='/' && isLogged) && 
        <section>
          <h1>Start your To do</h1>
          <div className='app_container'>
            <Link to='new_task' className='link card'>Create a new To do</Link>

          </div>
        </section>
      }
    </>
  )
}
