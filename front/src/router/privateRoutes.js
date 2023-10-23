import { createBrowserRouter } from 'react-router-dom'

import { Layout } from '../components/Layout/Layout'

const privateRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
  }
])

export default privateRoutes