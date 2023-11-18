import React from 'react'
import "./searchartistcard.css"
import { PlayCircleFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const SearchArtistCard = (artistItems) => {
  const navigate = useNavigate()
  console.log(artistItems)
 const imageUrl= artistItems?.artistItems?.images
 const id =  artistItems?.artistItems?.id
  return (
    <div className='search-artist-card-container' onClick={()=> navigate(`/author-details/${id}`)}>
        <div className="play-button">
                <PlayCircleFilled style={{
                    fontSize: 40,
                    color: "#1BD760"

                }}/>
        </div>
        <img className='search-artist-img' src={imageUrl[0]?.url} alt="image.png" />
        <p className='search-artist-name'>{artistItems.artistItems.name}</p>
        <p className='search-artist-type'>{artistItems.artistItems.type}</p>
    </div>
  )
}

export default SearchArtistCard