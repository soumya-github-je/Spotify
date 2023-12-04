import { useState} from "react"
import { useNavigate} from "react-router-dom"
import { Tooltip } from 'react-tooltip'
import {HeartOutlined, EllipsisOutlined, CaretRightOutlined} from "@ant-design/icons"
import "./albumcard.css"
import { useFetchWebAPI} from "../../hooks"

const AlbumCard = ({playlistTrackItems}) => {
    
    const isoDate = playlistTrackItems.added_at;
    const date = new Date(isoDate);
    const now = Math.floor(Date.now() / 1000);
    const isoTimestamp = Math.floor(date / 1000);
    const daysAgo = (now - isoTimestamp) / 86400;
   
    const ms = playlistTrackItems.track.duration_ms
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    const secondsUpto9 =seconds < 9 ? `0${seconds} `: seconds
    const duration =  minutes + ':' + secondsUpto9;
  
    const id = playlistTrackItems.track.id
    const artist_id = playlistTrackItems.track.artists[0].id
    const navigate = useNavigate()
    const [hover, setHover] = useState(false)
    
    const onClickHeading = () => {
        const id = playlistTrackItems.track.album.id
        navigate(`/album/${id}`)
    }

    
    const length = 50
    const numbers = [];

    for (let i = 1; i <= length; i++) {
        numbers.push(i);    
      }

     
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
                        : null
                }
                </span>
                <div className="album-image-and-title" 
            >
                <div  className="album-image">
                    <img src={playlistTrackItems.track.album.images[2].url} alt="" />
                </div>
                
                <div className="album-title-container">
                    <p className="album-title-desc"  onClick={()=> navigate(`/artist-album/${id}`)}>{playlistTrackItems.track.name}</p>
                    <p className="album-author" onClick={()=> navigate(`/author-details/${artist_id}`)}>{playlistTrackItems.track.artists[0].name || "yrttdfghvhjgh"}</p>
                </div>
            </div>
            <div className="album-name">
               
                <p onClick={onClickHeading}>{playlistTrackItems.track.album.name || "song"} </p>
            </div>
            
                <div className="album-date-added">
                    {daysAgo < 2 ? <p>{parseInt(daysAgo)} day ago</p>: <p>{parseInt(daysAgo)} days ago</p>}
                    <div className="hidden-icons">
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
                
                
                <p className="album-time">{duration}</p>
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

export default AlbumCard