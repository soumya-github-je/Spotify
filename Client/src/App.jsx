import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { Suspense, lazy, useEffect } from 'react'
// import ProtectedRoute from './components/global/ProtectedRoute'

// import Login from './pages/Login'
// import Register from './pages/Register'
import { getToken } from './config'
const HomePage = lazy(() => import('./pages/Home'))
const SearchPage= lazy(() => import('./pages/Search'))
const PageLayout = lazy(() => import("./components/global/Layout"))
const SongListingPage = lazy(() => import("./pages/SongListing"))
const SongDetailsPage = lazy(() => import("./pages/SongDetails"))
const ArtistAlbumPage = lazy(() => import("./pages/ArtistAlbum"))
const AuthorDetailsPage = lazy(() => import("./pages/AuthorDetails"))
const SearchCardDetailsPage = lazy(() => import("./pages/SearchCardDetails"))

function App() {

  useEffect(()=> {
    const token = localStorage.getItem("token")
    if(!token) getToken()
  },[])

  return (
    <Router>
      <Routes>
        {/* <Route element={<ProtectedRoute />}> */}
          <Route path="/" element={<Suspense><PageLayout /></Suspense>}>
            <Route path='/' element={<Suspense><HomePage /></Suspense>} />
            <Route path='/song-listing' element={<Suspense><SongListingPage /></Suspense>} />
            <Route path='/song-details/:id' element={<Suspense><SongDetailsPage /></Suspense>} />
            <Route path='/artist-album/:id' element={<Suspense><ArtistAlbumPage /></Suspense>} />
            <Route path='/author-details/:id' element={<Suspense><AuthorDetailsPage /></Suspense>} />
            <Route path='/search' element={<Suspense><SearchPage /></Suspense>} />
            <Route path='/search-card-details' element={<Suspense><SearchCardDetailsPage /></Suspense>} />
          </Route>
        {/* </Route> */}
        {/* <Route path='/login' element={<Login />} ></Route>
        <Route path='/register' element={<Register />} ></Route> */}
      </Routes>
    </Router>
  )
}

export default App