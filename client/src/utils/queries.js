import gql from 'graphql-tag';

export const GET_ME = gql`
{
    me {
      _id
      username
      email
      trackCount
      savedTracks {
        trackId
        artists
        image
        link
        title
        description
      }
    }
  }
`;