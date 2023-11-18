import React from 'react'
import SearchArtistCard from "../components/search/SearchArtistCard"
import "./searchplaylist.css"
import { useSelector } from 'react-redux'
import { useFetchWebAPI } from '../hooks'
import SearchType from '../components/search/SearchType'
const SearchArtists = () => {
  const state = useSelector((state)=> state.spotify)
  const {data, error, loading} = 
  useFetchWebAPI(`v1/search?q=${state.searchInput}&&type=${state.searchType}`, "GET")
  console.log("playlist", data, loading, error)
  return (
    <>
    <SearchType/>
    <div className='search-playlist-container'>
    {
                !loading ? error ? "Something went wrong" : data?.artists?.items.map((artistItems) =>
                <SearchArtistCard key={artistItems} artistItems={artistItems}
                />
            ) : "loading.."
     }
    </div>
    </>
  )
}

export default SearchArtists