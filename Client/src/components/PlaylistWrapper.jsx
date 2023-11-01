import { Link } from "react-router-dom"
import SongCard from "./home/SongCard"
import { useFetchWebAPI, useLazyFetchWebAPI } from "../hooks"
import { useEffect } from "react"


const PlaylistWrapper = ({ cat }) => {
    const { data: categoryData, loading } = useFetchWebAPI(`${cat.href.replace("https://api.spotify.com/", "")}`, "GET")
    const [getPlaylist, { data, error }] = useLazyFetchWebAPI()
    useEffect(() => {
        if (!loading) {
            getPlaylist(`v1/browse/categories/${categoryData.id}/playlists?limit=5`, "GET")
        }
    }, [categoryData, getPlaylist, loading])
    return (
        <section className="first-section">
            <div className="section-top">
                <p className="section-head">{cat.name}</p>
                <Link to="/song-listing" className="show-all">Show all</Link>
            </div>
            <div className="song-card-container">
                {
                    !loading && !error ? data?.playlists?.items?.map(items => <SongCard key={items?.id}
                        id={items?.id}
                        songDescription={items?.description}
                        songTitle={items?.name}
                        songImage={items?.images[0].url}
                    />) : "something went wrong"
                }
            </div>
            </section>
    )
}

export default PlaylistWrapper