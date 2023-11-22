import { PlayCircleFilled,HeartOutlined ,EllipsisOutlined, ClockCircleOutlined} from "@ant-design/icons"
import { Tooltip } from 'react-tooltip'
import { useEffect, useState } from "react"
import AlbumCard from "../components/home/AlbumCard"
import SongTopCard from "../components/songs/SongTopCard"
import "./songDetails.css"
import { useParams } from "react-router-dom"
import { useFetchWebAPI } from "../hooks"
import SongCard from "../components/home/SongCard"
import { useDispatch, useSelector } from "react-redux"
import {onClickSavePlaylist } from "../spotify/spotifySlice"
// import { useQuery } from "@apollo/client"
// import { GET_PLAYLIST } from "../gql/queries"

const SongDetails = () => {
    const [songHeadStyle, setSongHeadStyle] = useState({
        background: "transparent"
    })
    const state = useSelector((state)=> state.spotify)

    const dispatch = useDispatch()
    // 
    const {id} = useParams()
    const {data, error, loading} = useFetchWebAPI(`v1/playlists/${id}`, "GET")
    console.log("Playlist", data, loading, error)

    

    console.log("playlist-saved", state.addPlaylistsToLibrery)

    useEffect(()  => {
        const handleScroll = () =>{
            
            var songListTop = document.querySelector(".playlist-icons-container")
            var songHeading = document.querySelector('.playlist-songs-and-album-head-container');
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
                    if (top <= 68){
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

    if (loading) return "Loading..."

    
    

    return(
        <div className="play-list-container">
            <SongTopCard 
                type={data?.type}
                primaryColor={data?.primary_color}
                image={data?.images[0]?.url}
                // songs={data?.tracks}
                name={data?.name}
                description={data?.description}
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
                    <a className="my-anchor-element1"><HeartOutlined  className="heart-oulined-icon" onClick={()=>dispatch(onClickSavePlaylist(data))}/></a>
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
                !loading ? error ? "Something went wrong" : data.tracks.items?.map((playlistTrackItems) =>
                    <AlbumCard key={playlistTrackItems.id} playlistTrackItems={playlistTrackItems}
                    />
                ) : "loading.."
            }
                    </ol>
            </div>
        </div>
    )
}

export default SongDetails