export const typeDefs = `#graphql
    type LoginOutput {
        token: String
    }

    type Status{
        status: Boolean,
        message: String
    }
    type Songs{
        type: String
        heading:String!
        songPostedYear: Int
        artist:String
        songDuration:Int
        songImage: String
    }
    type ArtistOutput {
        name:String
        profilePicture:String
        songs:[Songs]
    }
    input FilterIn{
        in:[String]
    }
    type PlaylistOutput{
        playListImage: String, 
        type: String, 
        heading: String, 
        description: String,
        songsCount:Int,
        likes:Int,
        songsDuration:Int,
        artist: [ArtistOutput]
        songs:[Songs]
        
    }

    type Library{
        _id:String
        name:String,
        songs:[Songs]
    }

    type Query {
        login(email: String!, password: String!): LoginOutput
        register(userName: String!, password: String!,email: String!): LoginOutput
        artist(id:FilterIn):[ArtistOutput]
        playlist(id: FilterIn!): [PlaylistOutput]
        library:[Library]!
    }

    type Mutation {
        updateSong(id: String!, type: String, heading: String, artist: String, songDuration: Int, songPostedYear: Int, songImage: String): Status
        createSong(type: String,heading: String, songPostedYear: Int, artist:String,songDuration:Int, songImage: String): Status
        deleteSong(id: String!): Status
        createArtist(name: String, profilePicture: String, songs: [String]): Status
        deleteArtist(id: String!): Status
        updateArtist(id: String!,name: String,profilePicture: String,songs:[String]): Status
        deletePlaylist (id: FilterIn): Status
        createPlaylist(
            playListImage: String, 
            type: String, 
            heading: String, 
            description: String,
            songsCount:Int,
            likes: Int,
            songsDuration: Int,
            artist: [String]!,
            songs: [String]!
            ): Status
        createLibrary (name: String, songs:[String]): Status
        updateLibrary (id: String!, name: String, songs:[String]): Status
        deleteLibrary (id: FilterIn): Status
    }

`
