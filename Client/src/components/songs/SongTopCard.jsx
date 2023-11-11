import React from 'react'
import { Link } from "react-router-dom"
import "./songtopcard.css"

const SongTopCard = ({ image, type, name, description, authorImage, primaryColor, authorName ,songPostedYear, songDuration, songsDuration, songsCount,likes}) => {
    console.log(primaryColor)
    const styles = primaryColor?.toLowerCase() !== '#FFFFFF'.toLowerCase() ? {
        background: primaryColor
    } : {
        background: `url(${image || "https://i.scdn.co/image/ab67706f00000002ca5a7517156021292e5663a6"})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "soft-light"
    }
  return (
    <div className="playlist-head-container"
    style={styles}>
                <div className="song-details-container">
            <div className="playlist-image">
                <img src={image || null} alt="" />    
            </div>
            <div className="play-list-info">
                <p className="playlist-text">{type || null}</p>
                <h1 className="playlist-head">{name || "Peaceful Piano"}</h1>
                <p className="palylist-desc">{ description || null}</p>
                
                <div className="likes-and-songs-container">
                    <div className="spotify-logo">
                        <img src={authorImage || "https://i.scdn.co/image/ab67757000003b8255c25988a6ac314394d3fbf5"} alt="" />
                        <Link to={"/"} className="playlist-spotyfy-text">{ authorName || "Spotify"} <span className="span-dot">
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