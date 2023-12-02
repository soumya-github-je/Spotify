import Main from "../Main"
import Navbar from "./Navbar"
import Player from "./Player"
import PlaySong from "./PlaySong"
import "./Layout.css"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"

const Layout = () => {
    const state = useSelector((state) => state.spotify)
    console.log("playList-state", state.isplaylistActive)
    console.log("song-state", state.isSongActive)
  
    return(
        <div className="layout-wraper"> 
        <Navbar/>
        <Main/>
        {state.isplaylistActive ? <Player/> : <PlaySong/>}
        
    </div>
    )
}

export default Layout