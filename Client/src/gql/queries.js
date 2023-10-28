import { gql } from "@apollo/client";

export const LOGIN = gql`
  query Query($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const REGISTER = gql`
  query Query($userName: String!, $password: String!, $email: String!) {
    register(userName: $userName, password: $password, email: $email) {
      token
  }
}
`;

export const GET_PLAYLIST = gql`
  query Query($playlistId: FilterIn!) {
    playlist(id: $playlistId) {
      songsDuration
      songsCount
      songs {
        
        type
        songPostedYear
        songDuration
        heading
        artist
        songImage
      }
      likes
      artist {
        profilePicture
        name
      }
      type
      playListImage
      heading
      description
    }
}
`;

export const GET_ARTIST = gql`
    query Query($artistId: FilterIn) {
    artist(id: $artistId) {
      songs {
        title
        songPostedYear
        songDuration
        artist
      }
      profilePicture
      name
    }
  }
`;