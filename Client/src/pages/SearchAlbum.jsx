import React from 'react'
import SearchAlbumCard from "../components/search/SearchAlbumCard"
import "./searchplaylist.css"
import { useSelector } from 'react-redux'
import { useFetchWebAPI } from '../hooks'
import SearchType from '../components/search/SearchType'
const SearchAlbum = () => {
  const state = useSelector((state)=> state.spotify)
  const {data, error, loading} = 
  useFetchWebAPI(`v1/search?q=${state.searchInput}&&type=${state.searchType}`, "GET")
 
  return (
    <>
    <SearchType/>
    <div className='search-playlist-container'>
    {
                !loading ? error ? "Something went wrong" : data?.albums?.items.map((albumItems) =>
                <SearchAlbumCard key={albumItems} albumItems={albumItems}
                />
            ) : "loading.."
      }
    </div>
    </>
  )
}

export default SearchAlbum