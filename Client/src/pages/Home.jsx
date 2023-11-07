import { Link } from "react-router-dom"
import SongCard from "../components/home/SongCard"
import "./home.css"
import { useFetchWebAPI } from "../hooks"
import PlaylistWrapper from "../components/PlaylistWrapper"

const Home = ()=> {
    
    const { data, loading, error } = useFetchWebAPI("v1/browse/categories", "GET")
    console.log(data, loading, error)
    return(

        <main className="home">
            {/* <section className="first-section">
                <div className="section-top">
                    <p className="section-head">Focus</p>
                    <Link to="/song-listing" className="show-all">Show all</Link>
                </div>
                <div className="song-card-container">
                    {
                        [1, 23, 3, 4, 5].map(ele => <SongCard key={ele} />)
                    }
                </div>
            </section>
            <section className="first-section">
                <div className="section-top">
                    <p className="section-head">Spotify playlist</p>
                    <Link to="song-listing" className="show-all">Show all</Link>
                </div>
                <div className="song-card-container">
                    {
                        [1, 23, 3, 4, 5].map(ele => <SongCard key={ele} />)
                    }
                </div>
            </section>
            <section className="first-section">
                <div className="section-top">
                    <p className="section-head">Sound of India</p>
                    <Link to="/song-listing" className="show-all">Show all</Link>
                </div>
                <div className="song-card-container">
                    {
                        [1, 23, 3, 4, 5].map(ele => <SongCard key={ele} />)
                    }
                </div>
            </section> */}
            {
                !loading ? error ? "Something went wrong" : data.categories.items?.map((cat) =>
                    <PlaylistWrapper key={cat.id} cat={cat} />
                ) : "loading.."
            }
        </main>
    )
}

export default Home