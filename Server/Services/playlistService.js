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
            name: 1,
            artist: true,
            like: "0",
            imageURL: 1,
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
        const {name,likes, songs, artist, songsDuration, songsCount, imageURL} = args
        const newPlaylist= new Playlist({
            name, likes,songs, artist, songsCount, songsDuration, imageURL
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
        const {id, name, profilePicture,songs} = args
        await ArtistModel.updateOne({_id: id},
            {
                name,
                profilePicture,
                songs
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

