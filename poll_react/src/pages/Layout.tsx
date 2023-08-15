import { FC } from "react"
import {Outlet} from "react-router-dom"

const Layout: FC = () => {
  return (
    <div className="">
  <div className="container"> 
  <Outlet/>
  </div>    
 </div>
  )
}

export default Layout