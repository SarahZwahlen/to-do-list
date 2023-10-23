import { RouterProvider } from "react-router-dom";

import { Layout } from "./components/Layout/Layout";

import privateRoutes from "./router/privateRoutes";
import publicRoutes from "./router/publicRoutes";

function App() {

  return (
    <div className="App">
      <RouterProvider router={privateRoutes} >
        <Layout/>
      </RouterProvider>
    </div>
  );
}

export default App;
