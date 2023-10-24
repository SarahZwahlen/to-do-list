import './main.scss'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

export function Main () {
  const location = useLocation()
  return (
    <>
      { location.pathname === '/' &&   
        <section className="main">
          <h1>Start your To do</h1>
          <div className='login_container'>
            <Link to="/login" className='link card'>Login</Link>
            <Link to='/new_user' className='link card'>Create account</Link>
          </div>
        </section>}
    </>
  )
}
