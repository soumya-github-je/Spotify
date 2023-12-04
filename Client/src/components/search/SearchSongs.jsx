import { CaretRightOutlined, EllipsisOutlined, HeartOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import { Tooltip } from 'react-tooltip'
import "./searchsongs.css"
import { useNavigate } from 'react-router-dom'
const SearchSongs = (songItem) => {
    
    const [hover, setHover] = useState(false)
    const navigate = useNavigate()
    const ms = songItem?.songItem?.duration_ms
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    const secondsUpto9 =seconds < 9 ? `0${seconds} `: seconds
    const duration =  minutes + ':' + secondsUpto9;
    
const id = songItem?.songItem?.id
const artist_id = songItem?.songItem?.artists[0]?.id    
  return (
    <div className="search-album-list-container"
            onMouseEnter={()=> setHover(true)}
            onMouseLeave={() => setHover(false)}
           >
            
                <span className="search-serial-no">
                {
                    hover ? <CaretRightOutlined style={{
                        fontSize: 20,
                    }} />
                        : "1"
                }
                </span>
                <div className="search-album-image-and-title" 
            >
                <div  className="search-album-image">
                    <img src={songItem?.songItem?.album?.images[0]?.url} alt="" />
                </div>
                
                <div className="search-album-title-container">
                    <p className="search-album-title-desc" onClick={()=> navigate(`/artist-album/${id}`)} >{songItem?.songItem?.name}</p>
                    <p className="search-album-author" onClick={()=> navigate(`/author-details/${artist_id}`)}>{songItem?.songItem?.artists[0]?.name}</p>
                </div>
            </div>
            <div className="search-album-name">
               
                <p onClick={()=> navigate(`/author-details/${artist_id}`)}>{songItem?.songItem?.album?.name}</p>
            </div>
            
                
                    
                    <div className="search-hidden-icons">
                        {hover ? <div>
                    <a className="search-my-anchor-element-heart"><HeartOutlined style={{
                            fontSize: 17
                        }} className="search-album-heart-icon"/> </a>
                    <Tooltip anchorSelect=".search-my-anchor-element-heart" place="top" tipPointerPosition="middle">
                        Save to Your Library
                    </Tooltip>   
                    </div>
                        
                        : null}  
                   
                </div>
                
            
            <div className="search-album-time-container">
                
                
                <p className="search-album-time">{duration}</p>
                <div className="search-hidden-ellipsis-icon">
                    {hover ? 
                    <div>
                    <a className="search-my-anchor-element-ellipsis"><EllipsisOutlined style={{
                            fontSize: 15
                        }} className="search-album-ellipsis-icon"/> </a>
                            <Tooltip anchorSelect=".search-my-anchor-element-ellipsis" place="top" tipPointerPosition="middle">
                            More Options for Peaceful Piano
                            </Tooltip>   
                    </div>
                        
                    : null}
                    
                </div>
                
            </div>
            
        </div>
  )
}

export default SearchSongs