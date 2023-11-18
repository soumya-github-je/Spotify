import {createAsyncThunk,createSlice} from "@reduxjs/toolkit"
import {useFetchWebAPI} from "../hooks/index"


export const spotifyClice = createSlice({
    name:"spotify",
    initialState:{
        isSearchActive: false,
        searchInput:"",
        searchType:""
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
    onClickSongs
} = spotifyClice.actions

export default spotifyClice.reducer