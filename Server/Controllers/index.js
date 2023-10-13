import {register, login} from "../Services/authService.js"
import {createSong, deleteSong, updateSong} from "../Services/SongService.js"
import { createArtist, artist,deleteArtist, updateArtist } from "../Services/artistService.js"
import { createPlaylist, getPlaylist } from "../Services/playlistService.js"

export const resolvers = {
    Query: {
        register,
        login,
        artist,
        playlist: getPlaylist,
    },
    Mutation:{
        createSong,
        deleteSong,
        updateSong,
        createArtist,
        deleteArtist,
        updateArtist,
        createPlaylist
    }
}