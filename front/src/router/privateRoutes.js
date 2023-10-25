
import { createBrowserRouter } from 'react-router-dom'

import { Layout } from '../components/Layout/Layout'
import { NotFound } from '../components/Layout/NotFound'
import {UserDashboard} from '../components/User/UserDashboard'
import { Task } from '../components/Task/Task'
import { EditTask } from '../components/Task/EditTask'
import { NewTask } from '../components/Task/NewTask'

const privateRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      { path: 'settings', element: <UserDashboard/> },
      { path: 'new_task', element: <NewTask/> },
      { path: 'task', element: <Task/>, children: [
        { path: 'edit_task', element: <EditTask/> }
      ]},
      { path: '*', element: <NotFound/> }
    ]
  }
])

export default privateRoutes