import { createBrowserRouter } from 'react-router-dom'

import { Layout } from '../components/Layout/Layout'

const publicRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
  }
])

export default publicRoutes