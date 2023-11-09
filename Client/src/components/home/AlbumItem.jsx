import { useState} from "react"
import { useNavigate} from "react-router-dom"
import { Tooltip } from 'react-tooltip'
import {HeartOutlined, EllipsisOutlined, CaretRightOutlined} from "@ant-design/icons"
import "./albumcard.css"
import "./albumitem.css"
// import { useFetchWebAPI} from "../../hooks"

const AlbumItem = (albumTrackItems) => {
    console.log("AlbumItem", albumTrackItems)
    
   
    const ms = albumTrackItems.albumTrackItems.duration_ms
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    const secondsUpto9 =seconds < 9 ? `0${seconds} `: seconds
    const duration =  minutes + ':' + secondsUpto9;
  
    
    const navigate = useNavigate()
    const [hover, setHover] = useState(false)
    const trackId = albumTrackItems.albumTrackItems.id
    const artistId = albumTrackItems.albumTrackItems.artists[0].id
    
    
    return(
        <div className="album-list-container"
            onMouseEnter={()=> setHover(true)}
            onMouseLeave={() => setHover(false)}
           >
            
                <span className="serial-no">
                {
                    hover ? <CaretRightOutlined style={{
                        fontSize: 20,
                    }} />
                        : "1"
                }
                </span>
                <div className="album-image-and-title">
               
                
                <div className="album-title-container">
                    <p className="album-title-desc album-title"  onClick={()=> navigate(`/artist-album/${trackId}`)}>
                        {albumTrackItems.albumTrackItems.name}</p>
                    <p className="album-author artist-title" onClick={()=> navigate(`/author-details/${artistId}`)}>
                    {albumTrackItems.albumTrackItems.artists[0].name}</p>
                </div>
            </div>
            
            
                <div className="album-date-added">
                    
                    <div className="hidden-icons  main-album-heart-icon">
                        {hover ? <div>
                    <a className="my-anchor-element-heart"><HeartOutlined style={{
                            fontSize: 17
                        }} className="album-heart-icon"/> </a>
                    <Tooltip anchorSelect=".my-anchor-element-heart" place="top" tipPointerPosition="middle">
                        Save to Your Library
                    </Tooltip>   
                    </div>
                        
                        : null}  
                    </div>
                </div>
                
            
            <div className="album-time-container">
                
                
                <p className="album-time album-duration">{duration}</p>
                <div className="hidden-ellipsis-icon">
                    {hover ? 
                    <div>
                    <a className="my-anchor-element-ellipsis"><EllipsisOutlined style={{
                            fontSize: 15
                        }} className="album-ellipsis-icon"/> </a>
                            <Tooltip anchorSelect=".my-anchor-element-ellipsis" place="top" tipPointerPosition="middle">
                            More Options for Peaceful Piano
                            </Tooltip>   
                    </div>
                        
                    : null}
                    
                </div>
                
            </div>
            
        </div>
    )
}

export default AlbumItem