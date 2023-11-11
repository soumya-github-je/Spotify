import {createSlice} from "@reduxjs/toolkit"

export const spotifyClice = createSlice({
    name:"spotify",
    initialState:{
        isSearchActive: false,
    },
    reducers:{
        onClickSearch:(state)=>{
            state.isSearchActive = !state.isSearchActive
        },
        onClickHome:(state) => {
            state.isSearchActive = false
        }
    }
})

export const {onClickSearch, onClickHome} = spotifyClice.actions

export default spotifyClice.reducer