import React from 'react'
import { Link } from "react-router-dom"
import "./songtopcard.css"

const SongTopCard = ({ 
    playListImage, 
    type, 
    heading, 
    description, 
    songsCount, 
    likes,
    songsDuration, 
    authorImage, 
    authorName,
    songDuration,
    songPostedYear
}) => {
  return (
    <div className="playlist-head-container">
                <div className="song-details-container">
            <div className="playlist-image">
                <img src={playListImage || "https://i.scdn.co/image/ab67706f00000002ca5a7517156021292e5663a6" }alt="" />    
            </div>
            <div className="play-list-info">
                <p className="playlist-text">{type || null}</p>
                <h1 className="playlist-head">{heading || "Peaceful Piano"}</h1>
                <p className="palylist-desc">{ description || null}</p>
                
                <div className="likes-and-songs-container">
                    <div className="spotify-logo">
                        <img src={authorImage || "https://i.scdn.co/image/ab67757000003b8255c25988a6ac314394d3fbf5"} alt="" />
                        <Link to={"/"} className="playlist-spotyfy-text">{authorName || "Spotify"} <span className="span-dot">
                                •</span></Link>
                    </div>
                    
                    <p className="playlist-likes">{ songPostedYear|| null}</p>  
                    <p className="playlist-likes">{ songDuration|| null} </p>          
                    <p className="playlist-no-of-songs">{songsCount || null}</p>
                    <p className="playlist-no-of-hours">{songsDuration|| null}</p>
                    <p className="playlist-likes">{ likes|| null}</p>

                </div>
            </div>  
                </div>
            </div>
  )
}

export default SongTopCard