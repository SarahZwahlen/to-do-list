import { Link, useNavigate } from "react-router-dom"

import { useSelector, useDispatch } from 'react-redux'
import { LOG_OUT } from "../../store/reducer/userReducer"



export function Header () {
  const isLogged = useSelector(state => state.user.hasOwnProperty('current_user'))
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogOut = () => {
    dispatch(LOG_OUT())
    navigate('/')
  }
  return(
    <header>
      <div className="nav_container">
        <Link to="/" className="link"><h1>TODO APP</h1></Link>
        { isLogged && <div className="logged_icons">
          <i className="fa-solid fa-door-closed" onClick={handleLogOut}></i>
          <i className="fa-solid fa-gear" onClick={() => navigate('/settings')}></i>
        </div>}
      </div>
    </header>
  )
}