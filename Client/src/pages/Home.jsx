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
            
            {
                !loading ? error ? "Something went wrong" : data.categories.items?.map((cat) =>
                    <PlaylistWrapper key={cat.id} cat={cat} />
                ) : "loading.."
            }
        </main>
    )
}

export default Home