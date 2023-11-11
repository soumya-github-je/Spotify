import React from 'react'
import { useParams } from 'react-router-dom'
import SongTopCard from '../components/songs/SongTopCard'
import { useFetchWebAPI } from '../hooks'
import AlbumItem from '../components/home/AlbumItem'
import { ClockCircleOutlined, EllipsisOutlined, HeartOutlined, PlayCircleFilled } from '@ant-design/icons'
import "./songDetails.css"
import "./albumdetails.css"
import { useEffect,useState } from 'react'
import { Tooltip } from 'react-tooltip'

const AlbumDetails = () => {
    const [songHeadStyle, setSongHeadStyle] = useState({
        background: "transparent"
    })
    const {id} = useParams()
    const {data, error, loading} = useFetchWebAPI(`v1/albums/${id}`, "GET")
    console.log("album", data, loading, error)

    useEffect(()  => {
        const handleScroll = () =>{
            
            var songListTop = document.querySelector(".playlist-icons-container")
            var songHeading = document.querySelector('.album-songs-and-album-head-container');
            if (songHeading) {
                if (songHeading.getBoundingClientRect().top <=90) {
                    setSongHeadStyle({
                        background: "#000"
                    })
                } else {
                    setSongHeadStyle({
                        background: "transparent"
                    })
                }
            }
                if (songListTop){
                    var top = songListTop.getBoundingClientRect().top
                    if (top <= 65){
                        const event = new CustomEvent("reached_top", {
                            detail: data?.name,
                        })
                        dispatchEvent(event)
                        
                    }else{
                        dispatchEvent(new CustomEvent("removed_top"))
                    }
                }
            }
                const main = document.querySelector(".main")
                if (main){
                    main.addEventListener("scroll", handleScroll)
                }
                return () => main&& main.removeEventListener("scroll", handleScroll)

               
    }, [])

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
            <div className="album-songs-and-album-head-container"  style={songHeadStyle}>
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