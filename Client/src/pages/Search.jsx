import React from 'react'
import SearchCard from "../components/search/SearchCard"
import "./search.css"
import Home from './Home'
import PlaylistWrapper from '../components/PlaylistWrapper'
const Search = () => {

 
  return (
    <div className='search-main-container'>
        
        {/* <div className="search-cards-container">
              {
                  [1,2,3,4,5,6,7,8,9,10,1,2,3,4,2,3,4,5,6,7,8,9,1].map(ele => <SearchCard key={ele} />)
              }
        </div> */}
       <Home/>
    </div>
  )
}

export default Search