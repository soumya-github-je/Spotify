import mongoose from "mongoose";

const SongSheema = mongoose.Schema({
    type: String,
    heading: String, 
    artist: String, 
    songImage: String,
    songDuration:Number, 
    songPostedYear: Number
})

export default mongoose.model("Songs", SongSheema )