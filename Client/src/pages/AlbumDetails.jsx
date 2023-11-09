import React from 'react'
import { useParams } from 'react-router-dom'
import SongTopCard from '../components/songs/SongTopCard'
import { useFetchWebAPI } from '../hooks'
import AlbumItem from '../components/home/AlbumItem'
import { ClockCircleOutlined, EllipsisOutlined, HeartOutlined, PlayCircleFilled } from '@ant-design/icons'
import "./songDetails.css"
import "./albumdetails.css"
import { Tooltip } from 'react-tooltip'

const AlbumDetails = () => {
    const {id} = useParams()
    const {data, error, loading} = useFetchWebAPI(`v1/albums/${id}`, "GET")
    console.log("album", data, loading, error)


  return (
    <div>
        <SongTopCard 
                type="Album"
                primaryColor={data?.primary_color}
                image={data?.images[0]?.url}
                // songs={data?.tracks}
                name={data?.name}
                description={data?.description}
            />  
            <div className="playlist-icons-container">
                    <div className="playlist-play-icon">
                        <PlayCircleFilled 
                        style={{
                            fontSize: 55,
                            color: "#1BD760"

                            }}/>
                        
                    </div>
                    <div>
                    <a className="my-anchor-element1"><HeartOutlined  className="heart-oulined-icon"/></a>
                    <Tooltip anchorSelect=".my-anchor-element1" place="top" tipPointerPosition="middle">
                        Save to Your Library
                    </Tooltip>   
                    </div>
                    <div>
                        <a className="my-anchor-element2"><EllipsisOutlined  className="elipises-outlined-icon"/></a>
                        <Tooltip anchorSelect=".my-anchor-element2" place="top" tipPointerPosition="middle">
                            More Options for Peaceful Piano
                        </Tooltip> 
                        
                    </div>
                </div>
            <div className="album-songs-and-album-head-container">
                    <div className="hash-and-title-head">
                        <p className="hash-head">#</p>
                        <p className="title-head">Title</p>
                    </div>
                    
                    <ClockCircleOutlined className="clock-icon"/>
                </div>

                            
                <ol className="album-card-container">
                    {
                !loading ? error ? "Something went wrong" : data?.tracks.items.map((albumTrackItems) =>
                    <AlbumItem key={albumTrackItems.id} albumTrackItems={albumTrackItems}
                    />
                ) : "loading.."
            }
                    </ol>
    </div>
  )
}

export default AlbumDetails