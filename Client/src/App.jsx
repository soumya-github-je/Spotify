import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import { Suspense, lazy} from 'react'
import ProtectedRoute from './components/global/ProtectedRoute'
import Login from "./pages/Login"

const HomePage = lazy(() => import('./pages/Home'))
const SearchPage= lazy(() => import('./pages/Search'))
const PageLayout = lazy(() => import("./components/global/Layout"))
const SongDetailsPage = lazy(() => import("./pages/SongDetails"))
const ArtistAlbumPage = lazy(() => import("./pages/ArtistAlbum"))
const AuthorDetailsPage = lazy(() => import("./pages/AuthorDetails"))
const SearchCardDetailsPage = lazy(() => import("./pages/SearchCardDetails"))
const AlbumDetailsPage = lazy(() => import("./pages/AlbumDetails"))
const SearchPlaylistPage = lazy(()=> import("./pages/SearchPlaylist"))
const SearchArtistPage = lazy(()=> import("./pages/SearchArtists"))
const SearchAlbumPage = lazy(()=> import("./pages/SearchAlbum"))
const SearchSongPage = lazy(() => import("./pages/SearchSong"))

function App() {

const token = localStorage.removeItem("token")

setTimeout(token, 1000)

return(
    <Router>
      <Routes>
        <Route element={<ProtectedRoute />}>
        
          <Route path="/" element={<Suspense><PageLayout /></Suspense>}>
            <Route path='/' element={<Suspense><HomePage /></Suspense>} />
            <Route path='/song-details/:id' element={<Suspense><SongDetailsPage /></Suspense>} />
            <Route path='/artist-album/:id' element={<Suspense><ArtistAlbumPage /></Suspense>} />
            <Route path='/author-details/:id' element={<Suspense><AuthorDetailsPage /></Suspense>} />
            <Route path='/album/:id' element={<Suspense><AlbumDetailsPage/></Suspense>} />
            <Route path='/search' element={<Suspense><SearchPage /></Suspense>} />
            <Route path='/search-card-details' element={<Suspense><SearchCardDetailsPage /></Suspense>} />
            <Route path="/search-playlists" element={<Suspense><SearchPlaylistPage/></Suspense>}/>
            <Route path="/search-artists" element={<Suspense><SearchArtistPage/></Suspense>}/>
            <Route path="/search-albums" element={<Suspense><SearchAlbumPage/></Suspense>}/>
            <Route path="/search-songs" element={<Suspense><SearchSongPage/></Suspense>}/>
          </Route>
        </Route>
         <Route path='/login' element={<Login />} ></Route>
        
      </Routes>
    </Router>
  )
}

export default App