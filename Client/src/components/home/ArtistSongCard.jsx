
import "./artistalbumcard.css"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Tooltip } from 'react-tooltip'
import {HeartOutlined, EllipsisOutlined, CaretRightOutlined} from "@ant-design/icons"
import { useFetchWebAPI } from "../../hooks"
import SingleSongCard from "./SingleSongCard"
const ArtistSongCard = (albumData) => {

    const navigate = useNavigate()
    const [hover, setHover] = useState(false)
    console.log(albumData.albumData)
    
    const { data, loading, error } = useFetchWebAPI(`v1/artists/${albumData.albumData}/top-tracks?market=ES`, "GET")
    
  return (
    
    <ol className="album-card-container">
                    {
                !loading ? error ? "Something went wrong" : data?.tracks?.map((trackItems) =>
                    <SingleSongCard key={trackItems.id} trackItems={trackItems}
                    />
                ) : "loading.."
            }
                    </ol>
              
            )
    }
          

export default ArtistSongCard