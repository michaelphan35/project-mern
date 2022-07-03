const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    trackCount: Int
    savedTracks: [Track]
  }
  type Track {
    trackId: ID!
    artists: [String]
    description: String
    image: String
    link: String
    title: String!
  }
  type Auth {
    token: ID!
    user: User
  }
  input TrackInput {
    artists: [String]
    description: String!
    trackId: String!
    image: String
    link: String
    title: String!
  }
  type Query {
    me: User
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveTrack(trackData: TrackInput!): User
    removeTrack(trackId: ID!): User
  }
`;

module.exports = typeDefs;