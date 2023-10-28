import mongoose from "mongoose";

const PlaylistSheema = mongoose.Schema({
    playListImage: String, 
    type: String, 
    heading: String, 
    description: String,
    songsCount:Number,
    likes:Number,
    songsDuration:Number,
    
    artist: [{type: mongoose.Types.ObjectId, ref:"artists"}],
    songs: [{type: mongoose.Schema.Types.ObjectId, ref:"Songs"}]
})

export default mongoose.model("playlist", PlaylistSheema )