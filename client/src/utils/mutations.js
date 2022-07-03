import gql from 'graphql-tag';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
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

export const SAVE_TRACK = gql`
mutation saveTrack($trackData: TrackInput!) {
    saveTrack(trackData: $trackData)
        {
            _id
            username
            email
            trackCount
            savedTracks {
                trackId
                artists
                description
                image
                link
                title
            }
        }
    }
`;

export const REMOVE_TRACK = gql`
    mutation remove($trackId: ID!) {
        remove(trackId:$trackId) {
            _id
            username
            email
            trackCount
            savedTracks {
                # _id
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