import {createAsyncThunk,createSlice} from "@reduxjs/toolkit"
import {useFetchWebAPI} from "../hooks/index"


export const spotifyClice = createSlice({
    name:"spotify",
    initialState:{
        isSearchActive: false,
        searchInput:"",
        searchType:"",
        addTracksToLibrery: [],
        addAlbumsToLibrery:[],
        addPlaylistsToLibrery:[],
        isSaveActive: false,
        playSongArray: []
    },
    reducers:{
        onClickSearch:(state)=>{
            state.isSearchActive = !state.isSearchActive
        },
        onClickHome:(state) => {
            state.isSearchActive = false
        },
        onChangeSearchInput:(state, action)=>{
            state.searchInput = action.payload
        },
        onClickAll:(state)=>{
            state.searchType="track%2Calbum%2Cplaylist%2Cartist"
        },
        onClickPlaylists:(state)=>{
            state.searchType="playlist"
        },
        onClickArtists:(state)=>{
            state.searchType="artist"
        },
        onClickAlbums:(state)=>{
            state.searchType="album"
        },
        onClickSongs:(state)=>{
            state.searchType="track"
        },
        onClickSaveTrack:(state, action)=>{
            state.addTracksToLibrery.push(action.payload)
            state.isSaveActive = !state.isSaveActive
        },
        onClickSaveAlbum:(state, action)=>{
            state.addAlbumsToLibrery.push(action.payload)
            state.isSaveActive = !state.isSaveActive
        },
        onClickSavePlaylist:(state, action)=>{
            state.addPlaylistsToLibrery.push(action.payload)
            state.isSaveActive = !state.isSaveActive
        },
        onClickUnSaveTrack:(state, action)=>{
            state.addTracksToLibrery.splice(action.payload)
            state.isSaveActive = !state.isSaveActive
        },
        onClickUnSaveAlbum:(state, action)=>{
            state.addAlbumsToLibrery.splice(action.payload)
            state.isSaveActive = !state.isSaveActive
        },
        onClickUnSavePlaylist:(state, action)=>{
            state.addPlaylistsToLibrery.splice(action.payload)
            state.isSaveActive = !state.isSaveActive
        },
        onClickPlaySongButton: (state, action)=> {
            state.playSongArray.splice(0,1,action.payload)
        }
        
    }
})

export const {
    onClickSearch, 
    onClickHome, 
    onChangeSearchInput,
    onClickAll,
    onClickAlbums,
    onClickArtists,
    onClickPlaylists,
    onClickSongs,
    onClickSaveTrack,
    onClickSavePlaylist,
    onClickSaveAlbum,
    onClickUnSavePlaylist,
    onClickPlaySongButton
    
} = spotifyClice.actions

export default spotifyClice.reducer