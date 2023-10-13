import mongoose from "mongoose";
import ArtistModel from "../Models/artistModel.js";

export const artist = async (_, args) => {
    try {
      const artist = await ArtistModel.aggregate([
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
        
      ]);
      
    console.log(JSON.stringify(artist));
    return artist;
  } catch (error) {
    console.log(error);
    return {
      name: "",
      profilePicture: "",
      songs: [],
    };
  }
};


export const createArtist = async (_, args)=> {
    try {
        const {name, profilePicture, songs} = args
        const newArtist= new ArtistModel({
            name, profilePicture,songs
        });
        await newArtist.save()
       return{
            status: true,
            message: "Artist created"
       }

        
    } catch (error) {
        return{
            status: false,
            message: error
        }
    }
}

export const deleteArtist = async(_, args)=> {
    try {
        const {id} = args
        await ArtistModel.deleteOne({_id: id})
        return {
            status: true,
            message: "Artist deleted"
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

