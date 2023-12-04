import { ClockCircleOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import "./searchsong.css"
import "./songDetails.css"
import AlbumCard from '../components/home/AlbumCard'
import SearchType from '../components/search/SearchType'
import SearchSongs from '../components/search/SearchSongs'
import { useSelector } from 'react-redux'
import { useFetchWebAPI } from '../hooks'
import "./searchsong.css"
const SearchSong = () => {
 
  const state = useSelector((state)=> state.spotify)
  const {data, error, loading} = 
  useFetchWebAPI(`v1/search?q=${state.searchInput}&&type=${state.searchType}`, "GET")
  
  useEffect(()  => {
    
    const handleScroll = () =>{
        
        var songListTop = document.querySelector(".search-playlist-songs-and-album-head-container")
        
            if (songListTop){
                var top = songListTop.getBoundingClientRect().top
                if (top <= 100){
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
    <>
    <SearchType/>
    <div className='search-song-main-container'>
        <div className="search-playlist-songs-and-album-head-container">
                    <div className="hash-and-title-head">
                        <p className="hash-head">#</p>
                        <p className="title-head">Title</p>
                    </div>
                    <p className="album-head">Album</p>
                    
                    <ClockCircleOutlined className="clock-icon"/>
        </div>
        {
                !loading ? error ? "Something went wrong" : data?.tracks?.items.map((songItem) =>
                <SearchSongs key={songItem} songItem={songItem}
                />
            ) : "loading.."
            }
        
    </div>
    </>
    
  )
}

export default SearchSong