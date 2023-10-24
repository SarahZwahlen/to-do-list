import { RouterProvider } from "react-router-dom";

import { Layout } from "./components/Layout/Layout";

import { useSelector } from 'react-redux'

import privateRoutes from "./router/privateRoutes";
import publicRoutes from "./router/publicRoutes";

import './app.scss'

function App() {
  const isLogged = useSelector(state => state.user.hasOwnProperty('current_user'))
  return (
    <div className="App">
      <RouterProvider router={isLogged ? privateRoutes : publicRoutes} >
        <Layout/>
      </RouterProvider>
    </div>
  );
}

export default App;
