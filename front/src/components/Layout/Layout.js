
import { Outlet } from "react-router-dom"

import { Footer } from "./Footer"
import { Header } from "./Header"

export function Layout (options) {
  return(
    <>
      <Header/>
      <Outlet />
      <Footer/>
    </>
  )
}