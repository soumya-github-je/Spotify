import mongoose from "mongoose";
import LibraryModel from "../Models/libraryModel.js";
import jwt  from "jsonwebtoken";
import { GraphQLError } from "graphql";
import UserModel from "../Models/userModels.js";

export const getLibrary = async (_, args, context) => {
    const {token} = context
    try {
        const isVerified = jwt.verify(token.split(" ")[1], process.env.JWT_TOKEN);
        if (!isVerified) throw GraphQLError("User is not authenticated");
        const decodeUser = jwt.decode(token.split(" ")[1], process.env.JWT_TOKEN);
        const user = await UserModel.findOne({ email: decodeUser.email });
        const library = await LibraryModel.find({
      userId: user._id,
    }).populate("songs");
    console.log(JSON.stringify(library))
    return library;
    } catch (error) {
        console.log(error);
        return {
        name: "",
        artist: [],
        songs: [],
        };
    }
}

export const createLibrary = async (_, args, context)=> {
    const { token } = context;
    try {
        const {name, songs} = args
        const isVerified = jwt.verify(token.split(" ")[1], process.env.JWT_TOKEN);
        if (!isVerified) throw GraphQLError("User is not authenticated");
        const decodeUser = jwt.decode(token.split(" ")[1], process.env.JWT_TOKEN);
        const user = await UserModel.findOne({ email: decodeUser.email });
        const newLibrary= new LibraryModel({
            name,
            songs,
            userId: user._id
        });
        await newLibrary.save()
       return{
            status: true,
            message: "Library created"
       }

        
    } catch (error) {
        return{
            status: false,
            message: error
        }
    }
}

export const deleteLibrary = async(_, args)=> {
    try {
        const {id} = args
        await LibraryModel.deleteMany({
            _id: {
                $in: id.in.map((id) => new mongoose.Types.ObjectId(id)),
              },
        })
        return {
            status: true,
            message: "Library deleted"
        }
    } catch (error) {
        return{
            status: false,
            message: error
        }
    }
}

export const updateLibrary = async(_, args, context)=> {
    const {token} = context
    try {
        const {id, name,songs} = args
        const isVerified = jwt.verify(token.split(" ")[1], process.env.JWT_TOKEN);
        if (!isVerified) throw GraphQLError("User is not authenticated");
        await LibraryModel.updateOne({_id: id},
            {
                name,
                $push: { songs },
            })
        return {
            status: true,
            message: "Library Updated"
        }
    } catch (error) {
        return{
            status: false,
            message: error
        }
    }
}

