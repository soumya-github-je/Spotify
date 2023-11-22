import React from 'react'
import "./librerytracks.css"
import { useNavigate } from 'react-router-dom'
const LibreryPlaylists = (eachItem) => {
    const navigate = useNavigate()
    
  return (
    <div className='librery-track-main-container' onClick={()=> navigate(`/song-details/${eachItem?.eachItem?.id}`)}>
        <div>
            <img src={eachItem?.eachItem?.images[0]?.url} alt="" className='librery-img'/>
        </div>
        <div className='librery-track-name-and-type'>
            <p className='librery-track-name'>{eachItem?.eachItem?.name}</p>
            <p className='librery-track-type'>Playlist • Spotify</p>
        </div>
    </div>
    
  )
}

export default LibreryPlaylists