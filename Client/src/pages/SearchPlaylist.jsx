import React from 'react'
import SearchPlaylistCard from '../components/search/SearchPlaylistCard'
import "./searchplaylist.css"
import { useSelector } from 'react-redux'
import { useFetchWebAPI } from '../hooks'
import SearchType from '../components/search/SearchType'

const SearchPlaylist = () => {

  const state = useSelector((state)=> state.spotify)
  const {data, error, loading} = 
  useFetchWebAPI(`v1/search?q=${state.searchInput}&&type=${state.searchType}`, "GET")
  console.log("playlist", data, loading, error)

  return (
    <>
    <SearchType/>
    <div className='search-playlist-container'>
      {
                !loading ? error ? "Something went wrong" : data?.playlists?.items.map((playlistItems) =>
                <SearchPlaylistCard key={playlistItems} playlistItems={playlistItems}
                />
            ) : "loading.."
      }
    </div>
    </>
    
  )
}

export default SearchPlaylist