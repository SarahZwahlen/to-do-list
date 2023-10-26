
import { createBrowserRouter } from 'react-router-dom'

import { Layout } from '../components/Layout/Layout'
import { NotFound } from '../components/Layout/NotFound'
import {UserDashboard} from '../components/User/UserDashboard'
import { NewTodoList } from '../components/TodoList/NewTodoList'

const privateRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      { path: 'settings', element: <UserDashboard/> },
      { path: 'new_task_list', element: <NewTodoList/>},
      { path: '*', element: <NotFound/> }
    ]
  }
])

export default privateRoutes