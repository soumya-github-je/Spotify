import "./Navbar.css"
import { useNavigate } from "react-router-dom"
import {HomeFilled, SearchOutlined,AppstoreAddOutlined,PlusOutlined,GlobalOutlined} from "@ant-design/icons"
import {IconButton} from "@mui/material"
import { useSelector, useDispatch} from "react-redux"
import {onClickHome, onClickSearch } from "../../spotify/spotifySlice"
import LibreryTracks from "./LibreryTracks"
import LibreryPlaylists from "./LibreryPlaylists"
import LibreryAlbums from "./LibreryAlbums"

const Navbar = () => {
    const navigate = useNavigate()
    const state = useSelector((state) => state.spotify)
    const dispatch = useDispatch()
    
    const dataTracks= state.addTracksToLibrery
    const dataPlalists= state.addPlaylistsToLibrery
    const dataalbums= state.addAlbumsToLibrery
    
    return(
        <div className="navbar">
            <div className="navigation">
                <ul className="nav-list">
                   
                        <li className="nav-items" 
                            onClick={() => navigate("/")}
                        ><div onClick={()=> dispatch(onClickHome())}>
                            <HomeFilled />
                            <span>Home</span>
                        </div>
                            
                        </li>
                   
                        <li className="nav-items search"
                            
                            onClick={()=> dispatch(onClickSearch())}
                            
                        >
                           
                            <SearchOutlined />
                            <span   onClick={() => navigate("/search")}>Search</span>
                        </li>
                   </ul>
            </div>
            <div className="your-library-container">
                <div className="library-top-section ">
                    
                        <AppstoreAddOutlined style={
                            {fontSize:"20"}
                        }/>
                    <span>your library</span>
                    
                    
                        <IconButton style={{
                            marginLeft: "auto"
                        }}>
                            <PlusOutlined style={{ color: "#fff" }} title="Create Playlist or Floder" />
                        </IconButton>
                    
                    
                </div>
                {/* <div className="library-middle-setion">
                    <div className="create-playlist-container">
                        <p className="playlist-head-text">Create your first playlist</p>
                        <p className="playlist-desc">It's easy, we'll help you</p>
                        <button>Create playlist</button>
                    </div>
                    <div className="create-podcast-container">
                        <p className="podcast-head">Let's find some podcasts to follow</p>
                        <p className="podcast-desc">We'll keep you updated on new episodes</p>
                        <button>Browse podcasts</button>
                    </div>
                </div> */}
                <div className="library-middle-setion">
                    {
                        dataTracks.map((eachItem)=><LibreryTracks eachItem={eachItem} key = {eachItem.id}/>)
                    }
                    {
                        dataPlalists.map((eachItem)=><LibreryPlaylists eachItem={eachItem} key = {eachItem.id}/>)
                    }
                    {
                        dataalbums.map((eachItem)=><LibreryAlbums eachItem={eachItem} key = {eachItem.id}/>)
                    }
                </div>
                <div className="navbar-footer-setion">
                <div className="nav-footer-links">
                    <p className="nav-link">legal</p>
                    <p className="nav-link">privacy center</p>
                    <p className="nav-link">privacy policy</p>
                    <p className="nav-link">cookies</p>
                    <p className="nav-link">about ads</p>
                    <p className="nav-link">accessibility</p>
                </div>
                
                <button>
                    <GlobalOutlined/>
                    english
                    </button>
            </div>
            </div>
            
            
        </div>
    )
}

export default Navbar