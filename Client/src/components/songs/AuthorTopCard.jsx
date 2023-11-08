import React from 'react'
import {CheckOutlined} from "@ant-design/icons"
import "./authortopcard.css"
import { useParams } from 'react-router-dom'
import { useFetchWebAPI } from '../../hooks'
const AuthorTopCard = ({artistName, listernersCount}) => {
  
  return (
    <div className='author-top-card-container'>
      <div className='verified-container'>
      <CheckOutlined className='check-icon'/>
        <p className='verified-text'>Verified Artist</p>
      </div>
      <p className="author-top-card-artist-name">{artistName || "janet redger"}</p>
      <p className="author-top-card-listerners-count">{listernersCount || ""} monthly listeners</p>
    </div>
  )
}

export default AuthorTopCard
