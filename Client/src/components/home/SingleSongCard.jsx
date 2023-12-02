
import "./artistalbumcard.css"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Tooltip } from 'react-tooltip'
import {HeartOutlined, EllipsisOutlined, CaretRightOutlined} from "@ant-design/icons"
import { onClickPlaySingleSong } from "../../spotify/spotifySlice"
import { useDispatch } from "react-redux"

const SingleSongCard = (trackItems) => {

  
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [hover, setHover] = useState(false)
   
    var date = new Date(trackItems?.trackItems?.album.release_date)
    var year = date.getFullYear(); 

    const ms = trackItems?.trackItems?.duration_ms
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    const secondsUpto9 =seconds < 9 ? `0${seconds} `: seconds
    const duration =  minutes + ':' + secondsUpto9;

    
  return (
    
    <div className="artist-album-card-container"
    onMouseEnter={()=> setHover(true)}
    onMouseLeave={() => setHover(false)}
    onClick={()=> navigate(`/artist-album/${trackItems?.trackItems?.id}`)}>
    <span className="artist-album-serial-no">
        {
            hover ? <CaretRightOutlined
            onClick={()=> dispatch(onClickPlaySingleSong(trackItems?.trackItems))}
             style={{
                fontSize: 20,
            }} />
                : null
        }
        </span>
<div className="image-and-album-name-card-container">
  <div className="artist-album-image-card-container">
    <img src={trackItems?.trackItems?.album.images[2].url} 
    className="artist-album-card-image" alt="" />
  </div>
  <div  className='artist-album-card-name'>
    <p className="artist-album-card-name1">{trackItems?.trackItems?.name}</p>
    
    
  </div>
  
</div>
<div className="count-no">
  <p>{year}</p>
      <div className="artist-album-hidden-icons">
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
<div className="artist-album-song-length">
  <p>{duration}</p>
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
          

export default SingleSongCard