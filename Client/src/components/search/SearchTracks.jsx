import React from 'react'
import "./searchtracks.css"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { onClickPlaySingleSong } from '../../spotify/spotifySlice'

const SearchTracks = (trackItem) => {
  const navigate = useNavigate()
  
  const dispatch = useDispatch()
  const ms = trackItem.trackItem.duration_ms
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    const secondsUpto9 =seconds < 9 ? `0${seconds} `: seconds
    const duration =  minutes + ':' + secondsUpto9;
    const trackId = trackItem?.trackItem?.id
    const artistsId = trackItem?.trackItem?.artists[0]?.id

  return (
    <div className='search-tracks-container'   onClick={()=> dispatch(onClickPlaySingleSong(trackItem?.trackItem))}>
        <div className='search-track-img-names-container'>
        <div className='search-track-song-image-container'>
            <img   className='search-track-song-image' src={trackItem.trackItem.album.images[2].url} alt="" />
        </div>
        <div>
            <p className='search-track-song-name' onClick={()=> navigate(`/artist-album/${trackId}`)}>{trackItem.trackItem.name}</p>
            <p className='search-track-artist-name'  onClick={()=> navigate(`/author-details/${artistsId}`)}>{trackItem.trackItem.artists[0].name}</p>
        </div>
        </div>
        
        <div>
            <p className='search-track-duration'>{duration}</p>
        </div>
    </div>
  )
}

export default SearchTracks