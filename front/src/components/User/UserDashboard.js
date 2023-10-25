import { useSelector } from 'react-redux'

import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import '../../assets/style.scss'

export function UserDashboard() {
  const current_user = useSelector(state => state.user.current_user)
  const [editUser, setEditUser] = useState(current_user)
  const navigate = useNavigate()

  const handleEdit = ( ) => {
    fetch('http://localhost:3000/user/edit', {
      method: 'PATCH',
      body: JSON.stringify(editUser),
      headers: { 'content-type': 'application/json'}
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(error => console.log(error))
  }

  return (
    <div>
      <h2>Change your account details</h2>
      <section>
        <div className='settings_input_container'>
          <label>First Name : </label>
          <input value={editUser.firstname} onChange={(e) => setEditUser({...editUser, firstname: e.target.value})}></input>
        </div>
        <div className='settings_input_container'>
          <label>Last Name : </label>
          <input value={editUser.surname} onChange={(e) => setEditUser({...editUser, surname: e.target.value})}></input>
        </div>
        <div className='settings_input_container'>
          <label>Email : </label>
          <input type="email" value={editUser.email} onChange={(e) => setEditUser({...editUser, email: e.target.value})}></input>
        </div>
        <div className='settings_input_container'>
          <label>Password : </label>
          <input type="password" value={editUser.password} onChange={(e) => setEditUser({...editUser, password: e.target.value})}></input>
        </div>
        <button onClick={handleEdit}>Submit</button>
      </section>
      <p onClick={() => navigate('/')}>Go back home</p>
    </div>
  )
}