import { PlayCircleFilled,HeartOutlined ,EllipsisOutlined} from "@ant-design/icons"
import { useEffect } from "react"
import { Tooltip } from 'react-tooltip'
import ArtistSongCard  from "../components/home/ArtistSongCard"
import SongTopCard from "../components/songs/SongTopCard"

import "./artistalbum.css"
import SongCard from "../components/home/SongCard"
import { useQuery } from "@apollo/client"
import {GET_PLAYLIST } from "../gql/queries"
import { useNavigate, useParams } from "react-router-dom"
import { useFetchWebAPI } from "../hooks"
import { useDispatch, useSelector } from "react-redux"
import {onClickPlaySongButton, onClickSaveTrack } from "../spotify/spotifySlice"

const ArtistAlbum = () => {
    const navigate = useNavigate()
    const state = useSelector((state)=> state.spotify)
    const dispatch = useDispatch()
    const {id} = useParams()
    const { data, loading, error } = useFetchWebAPI(`v1/tracks/${id}`, "GET")
    console.log("album",data, loading, error)

    console.log("song-saved", state.addTracksToLibrery)
   
    useEffect(()  => {
        const handleScroll = () =>{
            var songListTop = document.querySelector(".playlist-icons-container")
                if (songListTop){
                    var top = songListTop.getBoundingClientRect().top
                    if (top <= 70){
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

    if (loading) "Loading..."
    
    var date = new Date(data?.album.release_date)
    var year = date.getFullYear(); 

    const ms = data?.duration_ms
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    const secondsUpto9 =seconds < 9 ? `0${seconds} `: seconds
    const duration =  minutes + ':' + secondsUpto9;
   
  return (
        <div className="artist-album-container song">
            <div className="song-top-card-container song-top-card" >
                <SongTopCard 
                    type="Song"
                    // primaryColor={data?.primary_color}
                    image={data?.album.images[0]?.url}
                    // // songs={data?.tracks}
                    name={data?.name}
                    authorName={data?.artists[0]?.name}
                    songPostedYear={year}
                    songDuration={duration}
                    authorImage={data?.album.images[2]?.url}
                    // description={data?.description}
                />
            </div>
            
            <div className="playlist-bottom-container1">
                <div className="playlist-icons-container">
                    <div className="playlist-play-icon">
                        <PlayCircleFilled 
                        
                        style={{
                            fontSize: 55,
                            color: "#1BD760"

                            }}/>
                        
                    </div>
                    <div>
                    <a className="my-anchor-element1"><HeartOutlined  className="heart-oulined-icon"  onClick={()=>dispatch(onClickSaveTrack(data))}/></a>
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
              
                <div className="album-artist-image-and-info">
                    <div className="album-artist-img">
                        <img src= {data?.album.images[1]?.url} alt="" />
                    </div>
                    
                    <div className="album-artist-info">
                        <p>Artist</p>
                        
                            <p className="artist-name" onClick={()=> navigate(`/author-details/${data?.artists[0].id}`)}>{data?.artists[0].name}</p>
                       
                        
                    </div>
    </div>
                <div className="popular-tracks-of-artist">
                    <p>Popular Tracks by</p>
                    <h1>{data?.artists[0].name}</h1>
                </div>
                <div className="artist-album-cards-containers">
                    <ArtistSongCard
                   albumData= {data?.album.artists[0].id}
                    />
                </div>
                <div className="popular-releases-by-artist-container">
                    
                    
                    
                    
                    <div className="from-the-single-container">
                        <div className="from-the-single-img-container">
                            <img src={data?.album.images[1]?.url} alt=""  className="from-the-single-img"/>
                        </div>
                        <div className="from-the-single-info-container">
                            <p>From the single</p>
                            <p className="from-the-single-desc">{data?.name}</p>
                        </div>
                    </div>
                    <div className="artist-album-cards-containers from-the-single-below-card">
                        {/* {
                            [1].map(ele => <ArtistAlbumCard key={ele} 
                                image={null}
                                title="Janet Redger"
                                
                            />)
                        } */}
                    
                    </div>
                    <div className="©-and-℗-container">
                        <p>©{data?.artists[0].name} </p>
                        <p>℗{data?.artists[0].name} </p>
                    </div>
                </div>

            </div>
        </div>
  )
}

export default ArtistAlbum
