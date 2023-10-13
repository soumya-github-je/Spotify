import mongoose from "mongoose";

const SongSheema = mongoose.Schema({
    title: String, 
    artist: String, 
    songDuration:Number, 
    songPostedYear: Number
})

export default mongoose.model("Songs", SongSheema )