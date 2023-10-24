
import { createBrowserRouter } from 'react-router-dom'

import { Layout } from '../components/Layout/Layout'
import { NotFound } from '../components/Layout/NotFound'
import {UserDashboard} from '../components/User/UserDashboard'

const privateRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      { path: 'settings', element: <UserDashboard/>},
      { path: '*', element: <NotFound/>}
    ]
  }
])

export default privateRoutes