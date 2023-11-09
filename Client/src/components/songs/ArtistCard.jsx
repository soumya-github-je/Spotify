import { useFetchWebAPI } from "../../hooks"
import "./artistcard.css"

const ArtistCard = (artistId) => {
    console.log("artistid", artistId.artistId)
    const id = artistId.artistId

    const { data, loading, error } = useFetchWebAPI(`v1/artists/${id}`, "GET")
    console.log("artistData",data, loading, error)
    const image = data?.images[0].url

  return (
    <div className="album-artist-image-and-info">
                    <div className="album-artist-img">
                        <img src= {image} alt="" />
                    </div>
                    
                    <div className="album-artist-info">
                        <p>Artist</p>
                        <p className="artist-name">{data?.name}</p>
                    </div>
    </div>
  )
}

export default ArtistCard