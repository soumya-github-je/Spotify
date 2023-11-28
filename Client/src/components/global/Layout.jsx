import Main from "../Main"
import Navbar from "./Navbar"
import Player from "./Player"
import "./Layout.css"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"

const Layout = () => {

    
  
    return(
        <div className="layout-wraper"> 
        <Navbar/>
        <Main/>
        <Player/>
        
    </div>
    )
}

export default Layout