import React from 'react'
import "./searchtype.css"
import {useDispatch } from 'react-redux'
import { onClickAlbums, onClickAll, onClickArtists, onClickPlaylists, onClickSongs } from '../../spotify/spotifySlice'
import { useNavigate } from 'react-router-dom'
const SearchType = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

  return (
    <div className='search-type-container'>
        <button className='search-type-button' onClick={()=>dispatch(onClickAll(), 
          navigate("/search"))}>All </button>
        <button className='search-type-button'  onClick={()=>dispatch(onClickPlaylists(),
           navigate("/search-playlists"))}>Playlists</button>
        <button className='search-type-button' onClick={()=>dispatch(onClickAlbums(),
            navigate("/search-albums"))}>Albums</button>
        <button className='search-type-button' onClick={()=>dispatch(onClickArtists(), 
          navigate("/search-artists"))}>Artists</button>
        <button className='search-type-button' onClick={()=>dispatch(onClickSongs(), 
          navigate("/search-songs"))}>Songs</button>
    </div>
  )
}

export default SearchType
