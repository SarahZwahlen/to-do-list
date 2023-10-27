
import { createBrowserRouter } from 'react-router-dom'

import { Layout } from '../components/Layout/Layout'
import { NotFound } from '../components/Layout/NotFound'
import {UserDashboard} from '../components/User/UserDashboard'
import { NewTodoList } from '../components/TodoList/NewTodoList'
import { EditTodoList } from '../components/TodoList/EditTodoList'
import { Login } from '../components/User/Login'

const privateRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      { path: 'settings', element: <UserDashboard/> },
      { path: 'login', element: <Login/>},
      { path: 'new_task_list', element: <NewTodoList/>},
      { path: 'edit_todo_list/:list_id', element: <EditTodoList/>},
      { path: '*', element: <NotFound/>}
    ]
  }
])

export default privateRoutes