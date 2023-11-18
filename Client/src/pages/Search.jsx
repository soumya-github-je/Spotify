import React from 'react'
import { useState } from 'react'
import SearchCard from "../components/search/SearchCard"
import "./search.css"
import Home from './Home'
import PlaylistWrapper from '../components/PlaylistWrapper'
import { useSelector, useDispatch } from 'react-redux'
import { useFetchWebAPI } from '../hooks'
import SearchTracks from '../components/search/SearchTracks'
import SearchArtistCard from '../components/search/SearchArtistCard'
import SearchPlaylistCard from '../components/search/SearchPlaylistCard'
import SearchType from '../components/search/SearchType'
import SearchAlbumCard from '../components/search/SearchAlbumCard'

// const searchTypes = [
//   {
//     id:1,
//     type: "All",
//     content: "track%2Calbum%2Cplaylist%2Cartist",
//   },
//   {
//     id: 2,
//     type: "PLaylsits",
//     content: "playlist",
//   },
//   {
//     id:3,
//     type:"Artists",
//     content: "artist",
//   },
//   {
//     id:4,
//     type:"Album",
//     content: "album",
//   },
//   {
//     id:5,
//     type:"Songs",
//     content: "track",
//   },
// ]




const Search = () => {
  
  
// const [searchType, setSearchType] = useState("")
  const state = useSelector((state)=> state.spotify)

//   const clickingSearchType = event => {
//     const id = event.target.id
//     setSearchType(searchTypes[id-1].content)
    
//   }
  
 
  

  const {data, error, loading} = 
  useFetchWebAPI(`v1/search?q=${state.searchInput}&&type=track%2Calbum%2Cplaylist%2Cartist`, "GET")

  console.log("search-items", data, error, loading)
 
  return (
    <div className='search-main-container'>
        {/* <div className='search-types-container'>
      {searchTypes.map((eachItem)=> 
       
          <button type='button' 
          className='button' 
          id = {eachItem.id}
          onClick={clickingSearchType} 
          value={searchType}>
            {eachItem.type}</button>
          
      )}
       </div> */}
       <SearchType/>
       <div className='searched-values-main-container'>
        <div className='searched-values-main-container-search-card'>
          <h1 className='search-main-headings songs'>Top Results</h1>
          {
                !loading ? error ? "Something went wrong" : data?.tracks?.items.slice(0,1).map((artistItem) =>
                <SearchCard key={artistItem} artistItem={artistItem}
                />
            ) : "loading.."
            }
        </div>
      <div className='searched-values-main-container-search-tracks'>
        <h1 className='search-main-headings songs'>Songs</h1>
        {
                !loading ? error ? "Something went wrong" : data?.tracks?.items.slice(0,4).map((trackItem) =>
                <SearchTracks key={trackItem} trackItem={trackItem}
                />
            ) : "loading.."
            }
        </div>
       
       </div>
     <div>
     <h1 className='search-main-headings'>Artists</h1>
     <div  className='searched-values-main-container'>
     {
                !loading ? error ? "Something went wrong" : data?.artists?.items.slice(0,5).map((artistItems) =>
                <SearchArtistCard key={artistItems} artistItems={artistItems}
                />
            ) : "loading.."
            }
     </div>
     <h1 className='search-main-headings'>Playlists</h1>
     <div  className='searched-values-main-container'>
      {
                !loading ? error ? "Something went wrong" : data?.playlists?.items.slice(0,5).map((playlistItems) =>
                <SearchPlaylistCard key={playlistItems} playlistItems={playlistItems}
                />
            ) : "loading.."
      }
     </div>
     <h1 className='search-main-headings'>Albums</h1>
     <div  className='searched-values-main-container'>
     {
                !loading ? error ? "Something went wrong" : data?.albums?.items.slice(0,5).map((albumItems) =>
                <SearchAlbumCard key={albumItems} albumItems={albumItems}
                />
            ) : "loading.."
      }
     </div>
      
     </div>
    </div>
  )
}

export default Search