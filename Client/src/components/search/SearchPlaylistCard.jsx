import React from 'react'
import "./searchartistcard.css"
import { PlayCircleFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const SearchPlaylistCard = (playlistItems) => {
  const navigate = useNavigate()
  const id = playlistItems?.playlistItems?.id
  return (
    <div className='search-artist-card-container' onClick={()=> navigate(`/song-details/${id}`)}>
        <div className="play-button">
                <PlayCircleFilled style={{
                    fontSize: 40,
                    color: "#1BD760"

                }}/>
        </div>
        <img style={{
            width: 160,
            borderRadius: 10
        } }src={playlistItems?.playlistItems?.images[0]?.url} alt="" />
        <p className='search-artist-name'>{playlistItems?.playlistItems?.name}</p>
        <p className='search-artist-type'>Playlist</p>
    </div>
  )
}

export default SearchPlaylistCard