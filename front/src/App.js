import { RouterProvider } from "react-router-dom";

import { Layout } from "./components/Layout/Layout";

import privateRoutes from "./router/privateRoutes";
import publicRoutes from "./router/publicRoutes";

import './app.scss'

function App() {

  return (
    <div className="App">
      <RouterProvider router={publicRoutes} >
        <Layout/>
      </RouterProvider>
    </div>
  );
}

export default App;
