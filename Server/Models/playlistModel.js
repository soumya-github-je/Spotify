import mongoose from "mongoose";

const PlaylistSheema = mongoose.Schema({
    name: String,
    likes: Number,
    songsCount: Number,
    songsDuration: Number,
    artist: [{type: mongoose.Types.ObjectId, ref:"artists"}],
    songs: [{type: mongoose.Schema.Types.ObjectId, ref:"Songs"}]
})

export default mongoose.model("playlist", PlaylistSheema )