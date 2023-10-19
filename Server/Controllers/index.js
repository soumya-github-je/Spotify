import {register, login} from "../Services/authService.js"
import {createSong, deleteSong, updateSong} from "../Services/SongService.js"
import { createArtist, artist,deleteArtist, updateArtist } from "../Services/artistService.js"
import { createPlaylist, getPlaylist, deletePlaylist } from "../Services/playlistService.js"
import {getLibrary, createLibrary, deleteLibrary, updateLibrary} from "../Services/libraryService.js"

export const resolvers = {
    Query: {
        register,
        login,
        artist,
        playlist: getPlaylist,
        library: getLibrary
    },
    Mutation:{
        createSong,
        deleteSong,
        updateSong,
        createArtist,
        deleteArtist,
        updateArtist,
        createPlaylist,
        deletePlaylist,
        createLibrary,
        deleteLibrary,
        updateLibrary
    }
}