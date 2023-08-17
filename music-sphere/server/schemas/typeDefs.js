// const { gql } = require('apollo-server-express');

// const typeDefs = gql`
// type Query {
//     me: User
//   }

// type Mutation {
//     login(email: String!, password: String!): Auth
//     addUser(username: String!, email: String!, password: String!): Auth
//     faveAlbum(albumData: AlbumInput!): User
//     removeAlbum(albumId: String!): User
// }

// input AlbumInput{
//     albumId: String!
//     authors: [String]
//     description: String
//     title: String
//     image: String
//     link: String
// }
// type User {
//     _id: ID!
//     username: String!
//     email: String!
//     albumCount: Int
//     savedAlbums: [Album]
// }

// type Album {
//     albumId: String!
//     authors: [String]
//     description: String
//     title: String!
//     image: String
//     link: String
// }

// type Auth {
//     token: ID!
//     user: User
// }
// `;

// module.exports = typeDefs;