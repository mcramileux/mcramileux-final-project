import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const SAVE_ALBUM = gql`
  mutation saveAlbum($albumData: AlbumInput!) {
    saveAlbum(albumData: $albumData) {
      _id
      username
      email
      savedAlbums {
        albumId
        authors
        image
        description
        title
        link
      }
    }
  }
`;

export const REMOVE_ALBUM = gql`
  mutation removeAlbum($albumId: String!) {
    removeAlbum(albumId: $albumId) {
      _id
      username
      email
      albumCount
      savedAlbum {
        albumId
        authors
        description
        title
        image
        link
      }
    }
  }
`;
export const ADD_COMMENT = gql`
  mutation addComment($thoughtId: ID!, $commentText: String!) {
    addComment(commentText: $commentText) {
      _id
      comments {
        _id
        commentText
      }
    }
  }
`;
export const UPDATE_COMMENT = gql `
mutation UPDATE_COMMENT($updateCommentId: ID!, $title: String, $description: String, $cost: Float, $location: String, $date: String) {
  updateComment(id: $updateCommentId, title: $title) {
    id
    user {
      id
      username
    }
  }
}`;

export const DELETE_COMMENT = gql`
  mutation DELETE_COMMENT($deleteCommentId: ID!) {
    deleteComment(id: $deleteCommentId)
  }
`;