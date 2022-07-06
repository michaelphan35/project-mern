import React from 'react';
import { Redirect } from 'react-router-dom';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { AiOutlineDelete } from 'react-icons/ai';

import Auth from '../utils/auth';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries'
import { REMOVE_TRACK } from '../utils/mutations';
import { removeTrackId } from '../utils/localStorage';

const Favorites = () => {

    const { loading, data } = useQuery(GET_ME)
    const userData = data?.me || [];
    const [deleteTrack] = useMutation(REMOVE_TRACK);
    // use this to determine if `useEffect()` hook needs to run again
    // const userDataLength = Object.keys(userData).length;
    // create function that accepts the track's mongo _id value as param and deletes the track from the database
    const handleDeleteTrack = async (trackId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            await deleteTrack({ variables: { trackId } });

            removeTrackId(trackId);
        } catch (err) {
            console.error(err);
        }
    };

    // if data isn't here yet, say so
    if (loading) {
        return <h2>LOADING...</h2>;
    }

    if (!Auth.loggedIn()) {
        // not logged in so redirect to login page with the return url
        return <Redirect to={{ pathname: '/' }} />
    }

    return (
        <>
            <Jumbotron fluid className='text-dark bg-light'>
                <Container>
                    <h1>Viewing your favorite tracks</h1>
                </Container>
            </Jumbotron>
            <Container>
                <h2>
                    {userData.savedTracks.length
                        ? `Viewing ${userData.savedTracks.length} saved ${userData.savedTracks.length === 1 ? 'track' : 'tracks'}:`
                        : 'No favorite tracks found'}
                </h2>
                <CardColumns>
                    {userData.savedTracks.map((track) => {

                        return (
                            <Card key={track.trackId} border='dark'>
                                {track.image ? <Card.Img src={track.image} alt={`The cover for ${track.title}`} variant='top' /> : null}
                                <Card.Body>
                                    <Card.Title>{track.title}</Card.Title>
                                    <p className='small'>Artists: {track.artists}</p>
                                    {/* <Card.Text>{track.description}</Card.Text> */}
                                    <Button className='btn-block btn-danger' onClick={() => handleDeleteTrack(track.trackId)}>
                                        <AiOutlineDelete className='btn-icon' /> Remove from favorite tracks
                                    </Button>
                                </Card.Body>
                            </Card>
                        );
                    })}
                </CardColumns>
            </Container>
        </>
    );
};

export default Favorites;