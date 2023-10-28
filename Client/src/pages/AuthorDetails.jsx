import React from 'react'
import AuthorTopCard from '../components/songs/AuthorTopCard'
import ArtistAlbumCard  from "../components/home/ArtistAlbumCard"
import SongCard from "../components/home/SongCard"

import { PlayCircleFilled,EllipsisOutlined} from "@ant-design/icons"
import { Tooltip } from 'react-tooltip'
import "./songDetails.css"
import "./artistalbum.css"
import "./authordetails.css"
import { useQuery } from '@apollo/client'
import { GET_ARTIST } from '../gql/queries'

const AuthorDetails = () => {

    const {data , loading , error} = useQuery(GET_ARTIST, {
        variables:{
            artistId:{
                in:["653252c90853e2f38abac143"]
            }
        }
    })

    console.log("from server" , data, loading, error)
    if (loading) "Loading..."
    if (error && !data) "Error occurred"

  return (
    <div className='author-details-head-container'>
      
          <AuthorTopCard
            artistName={data?.artist[0]?.name}
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
                    
                        {
                            data && data?.artist[0]?.songs.map((song) => <ArtistAlbumCard {...song} key= {song.artist}/>)
                        }
                    
                
                </div>
          </div>
          <div className="popular-releases-by-artist-container">
                    <p className="artist-specialized-heading">Popular Releases</p>
                    <div className="album-song-cards-container album-song">
                        {
                            [1, 23, 3, 4, 5,].map(ele => <SongCard key={ele} 
                                songImage='https://i.scdn.co/image/ab67616d00001e029b463f85df6ccaeb17407bcc'
                                songTitle="Glance Out Of A Casement Window"
                                songDescription="2023 • single"
                            />)
                        }
                    </div>
                    <p className="artist-specialized-heading">Albums</p>
                    <div className="album-song-cards-container album-song">
                        {
                            [1].map(ele => <SongCard 
                                key={ele} 
                                songImage='https://i.scdn.co/image/ab67616d00001e0206eac89920f156667cc3120e'
                                songTitle="Glance Out Of A Casement Window"
                                songDescription="2023 • single"
                            />)
                        }
                    </div>
                    <p className="artist-specialized-heading">Singles and EPs</p>
                    <div className="album-song-cards-container album-song">
                        {
                            [1,3,4,5,6].map(ele => <SongCard key={ele} 
                                songImage='https://i.scdn.co/image/ab67616d00001e0279a78cbb67c6a002d988a50f'
                                songTitle="Glance Out Of A Casement Window"
                                songDescription="2023 • single"
                            />)
                        }
                    </div>
                    <p className="artist-specialized-heading">Fans also like</p>
                    <div className="album-song-cards-container album-img">
                        {
                            [1,3,4,5,6].map(ele => <SongCard key={ele} 
                                songImage='https://i.scdn.co/image/ab67616d00001e02b86fb2dba75c11d91078c051'
                                songTitle="christian peterson -B"
                                songDescription="Artist"
                            />)
                        }
                    </div>
                    
                </div>
      </div>
      
    </div>
  )
}

export default AuthorDetails
