import mongoose from "mongoose";
import Playlist from "../Models/playlistModel.js";

export const getPlaylist = async (_, args) => {
    try {
      const playlist = await Playlist.aggregate([
        {
          $match: {
            _id: {
              $in: args.id.in.map((ids) => new mongoose.Types.ObjectId(ids)),
            },
          },
        },
        {
          $lookup: {
            from: "songs",
            localField: "songs",
            foreignField: "_id",
            as: "songs",
          },
        },
        {
          $lookup: {
            from: "artists",
            localField: "artist",
            foreignField: "_id",
            as: "artist",
          },
        },
        {
          $project: {
            _id: true,
            songs: true,
            heading: 1,
            artist: true,
            likes: 1,
            type: 1,
            description: 1,
            playListImage: 1,
            songsCount: { $size: "$songs" },
            songsDuration: { $sum: "$songs.songDuration" },
          },
        },
      ]);
      
    
    return playlist;
  } catch (error) {
    console.log(error);
    return {
      name: "",
      likes:"",
      songsCount:"",
      songsDuration:"",
      artist:[],
      songs: [],
    };
  }
};


export const createPlaylist = async (_, args)=> {
    try {
        const {
          playListImage, 
          type, 
          heading, 
          description, 
          songsCount, 
          likes,
          songsDuration, 
          songs,
          artist
      } = args
        const newPlaylist= new Playlist({
           likes,songs, artist, songsCount, songsDuration,playListImage,type,heading,description
        });
        await newPlaylist.save()
       return{
            status: true,
            message: "Playlist created"
       }

        
    } catch (error) {
        return{
            status: false,
            message: error
        }
    }
}

export const deletePlaylist = async(_, args)=> {
  try {
      const {id} = args
      await Playlist.deleteMany({
          _id: {
              $in: id.in.map((id) => new mongoose.Types.ObjectId(id)),
            },
      })
      return {
          status: true,
          message: "Playlist deleted"
      }
  } catch (error) {
      return{
          status: false,
          message: error
      }
  }
}

export const updateArtist = async(_, args)=> {
    try {
        const {id, 
          playListImage, 
          type, 
          heading, 
          description, 
          songsCount, 
          likes,
          songsDuration, 
          songs,
          artist} = args
        await ArtistModel.updateOne({_id: id},
            {
              likes,songs, artist, songsCount, songsDuration,playListImage,type,heading,description
            })
        return {
            status: true,
            message: "Artist Updated"
        }
    } catch (error) {
        return{
            status: false,
            message: error
        }
    }
}

