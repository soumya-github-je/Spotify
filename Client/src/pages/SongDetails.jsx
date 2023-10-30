import { PlayCircleFilled,HeartOutlined ,EllipsisOutlined, ClockCircleOutlined} from "@ant-design/icons"
import { Tooltip } from 'react-tooltip'
import { useEffect, useState } from "react"
import AlbumCard from "../components/home/AlbumCard"
import SongTopCard from "../components/songs/SongTopCard"
import "./songDetails.css"
import { useQuery } from "@apollo/client"
import { GET_PLAYLIST } from "../gql/queries"

const SongDetails = () => {
    const [songHeadStyle, setSongHeadStyle] = useState({
        background: "transparent"
    })

    const {data , loading , error} = useQuery(GET_PLAYLIST, {
        variables:{
            playlistId:{
                in:["653f8ed104741b5f92f58cda"]
            }
        }
    })

    console.log("from server" , data, loading, error)

    useEffect(()  => {
        const handleScroll = () =>{
            var songListTop = document.querySelector(".playlist-icons-container")
            var songHeading = document.querySelector('.playlist-songs-and-album-head-container');
            if (songHeading) {
                if (songHeading.getBoundingClientRect().top <= 90) {
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
                    if (top <= 75){
                        const event = new CustomEvent("reached_top", {
                            detail: "Glance Out A Casement Window",
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

    if (loading) "Loading..."
    if (error && !data) "Error occurred"
    return(
        <div className="play-list-container">
            <SongTopCard 
            playListImage = {data?.playlist[0]?.playListImage}
            type= {data?.playlist[0]?.type}
            heading = {data?.playlist[0]?.heading}
            description = {data?.playlist[0]?.description}
            likes = {data?.playlist[0]?.likes}
            
            songsCount= {data?.playlist[0]?.songsCount} 
            songsDuration= {data?.playlist[0]?.songsDuration/60}
            />  
            <div className="playlist-bottom-container">
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
                <div className="playlist-songs-and-album-head-container" style={songHeadStyle}>
                    <div className="hash-and-title-head">
                        <p className="hash-head">#</p>
                        <p className="title-head">Title</p>
                    </div>
                    <p className="album-head">Album</p>
                    <p className="date-added-head">Date added</p>
                    <ClockCircleOutlined className="clock-icon"/>
                </div>
               
                    <ol className="album-card-container">
                        {
                            data && data?.playlist[0]?.songs.map((song) => <AlbumCard {...song} key= {song.artist}/>)
                        }
                    </ol>
            </div>
        </div>
    )
}

export default SongDetails