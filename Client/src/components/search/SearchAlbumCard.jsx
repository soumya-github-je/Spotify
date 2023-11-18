import React from 'react'
import "./searchartistcard.css"
import { PlayCircleFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const SearchAlbumCard = (albumItems) => {
    const navigate = useNavigate()

    const id = albumItems?.albumItems?.id
    console.log(id)
  return (
    <div className='search-artist-card-container' onClick={()=> navigate(`/author-details/${id}`)}>
        <div className="play-button">
                <PlayCircleFilled style={{
                    fontSize: 40,
                    color: "#1BD760"

                }}/>
        </div>
        <img style={{
            width: 160,
            borderRadius: 10
        } }src={albumItems?.albumItems?.images[0]?.url} alt="" />
        <p className='search-artist-name'>{albumItems?.albumItems?.name}</p>
        <p className='search-artist-type'>{albumItems?.albumItems?.type}</p>
    </div>
  )
}

export default SearchAlbumCard