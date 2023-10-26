import '../../assets/style.scss'

import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import { useSelector, useDispatch} from 'react-redux'
import { LOG_IN } from '../../store/reducer/userReducer'

import { useEffect, useState } from 'react'


export  function Main () {
  const store = useSelector(state => state.user)
  const [isLoggedIn, SetLoggedIn] = useState(false)
  
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    if (!store.hasOwnProperty('current_user')) {
      fetch('http://localhost:3000/user/is-logged', {
      credentials: 'include'
      })
      .then(res => res.json())
      .then(data => {
        if (data.data.isLogged) {
          SetLoggedIn(true)
          dispatch(LOG_IN(data.data.user))
        }
      })
      .catch(err => console.error(err))
    }
  }, [store, dispatch])

  const isLogged = store.hasOwnProperty('current_user') || isLoggedIn
  
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
        <section className='todo_home'>
          <h1>Start your To do</h1>
          <Link to='new_task' className='link card card_home'>Create a new To do</Link>
        </section>
      }
    </>
  )
}
