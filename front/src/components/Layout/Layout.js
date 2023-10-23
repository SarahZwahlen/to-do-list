
import { Outlet } from "react-router-dom"

import { Footer } from "./Footer"
import { Header } from "./Header"
import { Main } from "./Main"

export function Layout (options) {
  return(
    <>
      <Header/>
      <Main/>
      <Outlet />
      <Footer/>
    </>
  )
}