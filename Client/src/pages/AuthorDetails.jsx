import React from 'react'
import AuthorTopCard from '../components/songs/AuthorTopCard'
import ArtistAlbumCard  from "../components/home/ArtistAlbumCard"
import SongCard from "../components/home/SongCard"
import { useEffect, useState } from "react"
import { PlayCircleFilled,EllipsisOutlined} from "@ant-design/icons"
import { Tooltip } from 'react-tooltip'
import "./songDetails.css"
import "./artistalbum.css"
import "./authordetails.css"
import { useQuery } from '@apollo/client'
import { GET_ARTIST } from '../gql/queries'
import { useParams } from 'react-router-dom'
import { useFetchWebAPI } from '../hooks'

const AuthorDetails = () => {
    
    const {id} = useParams()
    const { data, loading, error } = useFetchWebAPI(`v1/artists/${id}`, "GET")
    
    
    
    const image_url = data?.images[0]?.url
    
  return (
    <div className='author-details-head-container' style={{ backgroundImage: `url(${image_url})`}}>
      
          <AuthorTopCard
               artistName= {data?.name} 
               listernersCount = {data?.followers.total}
          />
      <div className="author-details-bottom-container">
          <div className="playlist-icons-container author-artist-icons-container">
                    <div className="playlist-play-icon">
                        <PlayCircleFilled 
                        style={{
                            fontSize: 55,
                            color: "#1BD760"

                            }}/>
                        
                    </div>
                    <div>
                    <button className="follow-button">FOLLOW</button>  
                    </div>
                    <div>
                        <a className="my-anchor-element2"><EllipsisOutlined  className="elipises-outlined-icon"/></a>
                        <Tooltip anchorSelect=".my-anchor-element2" place="top" tipPointerPosition="middle">
                            More Options for Peaceful Piano
                        </Tooltip> 
                        
                    </div>
          </div>
          <div className="author-details-popular-songs-container">
            <p className='popular-text-head'>Popular</p>
            <div className="artist-album-cards-containers">
                <ArtistAlbumCard/>
                
                </div>
          </div>
         </div>
    </div>
  )
}

export default AuthorDetails
