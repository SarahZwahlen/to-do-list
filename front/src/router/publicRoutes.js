import { createBrowserRouter } from 'react-router-dom'

import { Layout } from '../components/Layout/Layout'
import { Login } from '../components/User/Login'
import { NewUser } from '../components/User/NewUser'
import { NotFound } from '../components/Layout/NotFound'

const publicRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      { path: 'login', element: <Login/>},
      { path: 'new_user', element: <NewUser/>},
      { path: "*", element: <NotFound/>}
    ]
  }
])

export default publicRoutes