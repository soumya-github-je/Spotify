import { gql } from "@apollo/client";

export const GET_PLAYLIST = gql`
    query Query($playlistId: FilterIn!) {
        playlist(id: $playlistId) {
        songsDuration
        songsCount
        songs {
            title
            songPostedYear
            songDuration
            artist
        }
        name
        likes
        imageURL
        artist {
            profilePicture
            name
        }
        }
    }
`;