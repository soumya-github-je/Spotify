import mongoose from "mongoose";

const LibrarySheema = mongoose.Schema({
    name: String,
    userId: [{type: mongoose.Types.ObjectId, ref:"users"}],
    songs: [{type: mongoose.Schema.Types.ObjectId, ref:"Songs"}]
})

export default mongoose.model("library", LibrarySheema )