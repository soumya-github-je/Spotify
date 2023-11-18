import React from 'react'
import "./searchcard.css"
import { useNavigate } from 'react-router-dom'

const SearchCard = (artistItem) => {
  const navigate = useNavigate()
  console.log(artistItem)
  const id = artistItem?.artistItem?.artists[0]?.id
  return (
    <div className='search-card-container' onClick={()=> navigate(`/author-details/${id}`)}>
      <img className='search-card-artist-img' src={artistItem.artistItem.album.images[0].url} alt="" />
      <h1 className='searched-value'>{artistItem?.artistItem?.name}</h1>
      <p className='search-card-artist'>{artistItem?.artistItem?.artists[0]?.name}</p>
    </div>
  )
}

export default SearchCard
