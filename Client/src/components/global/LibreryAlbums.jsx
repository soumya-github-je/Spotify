import React from 'react'
import "./librerytracks.css"
import { useNavigate } from 'react-router-dom'
const LibreryAlbums = (eachItem) => {
    const navigate = useNavigate()
    
  return (
    <div className='librery-track-main-container' onClick={()=> navigate(`/album/${eachItem?.eachItem?.id}`)}>
        <div>
            <img src={eachItem?.eachItem?.images[2]?.url} alt="" className='librery-img'/>
        </div>
        <div className='librery-track-name-and-type'>
            <p className='librery-track-name'>{eachItem?.eachItem?.name}</p>
            <p className='librery-track-type'>Album</p>
        </div>
    </div>
    
  )
}

export default LibreryAlbums