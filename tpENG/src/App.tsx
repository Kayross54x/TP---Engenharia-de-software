import Home from './pages/Home/Home'
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

function App() {
  const publicRoutes = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    }
  ])

  return (
      <RouterProvider router={publicRoutes} />
  )
}

export default App
