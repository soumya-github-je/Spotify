import SongModel from "../Models/songModel.js";

export const createSong = async (_, args)=> {
    try {
        const {type,heading, artist, songDuration, songPostedYear, songImage
        } = args
        const newSong = new SongModel({
            type,
            heading,
            artist,
            songDuration,
            songPostedYear,
            songImage
        });
        await newSong.save()
       return{
            status: true,
            message: "New song created"
       }

        
    } catch (error) {
        return{
            status: false,
            message: error
        }
    }
}

export const deleteSong = async(_, args)=> {
    try {
        const {id} = args
        await SongModel.deleteOne({_id: id})
        return {
            status: true,
            message: "Song deleted"
        }
    } catch (error) {
        return{
            status: false,
            message: error
        }
    }
}

export const updateSong = async(_, args)=> {
    try {
        const {id,type,heading, artist, songDuration, songPostedYear, songImage} = args
        await SongModel.updateOne({_id: id},
            {
                type,
                heading,
                artist,
                songDuration,
                songPostedYear,
                songImage
            })
        return {
            status: true,
            message: "Song Updated"
        }
    } catch (error) {
        return{
            status: false,
            message: error
        }
    }
}

