import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie'
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

import Auth from '../utils/auth';
import { searchSpotify } from '../utils/API';
import { useMutation } from '@apollo/client';
import { SAVE_TRACK } from '../utils/mutations'
import { saveTrackIds, getSavedTrackIds } from '../utils/localStorage';

const SearchTracks = () => {
  const token = useState(Cookies.get("spotifyAuthToken"));
  // create state for holding returned api data
  const [searchedTracks, setSearchedTracks] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');
  const [saveTrack] = useMutation(SAVE_TRACK)
  // create state to hold saved savedTrackIdId values
  const [savedTrackIds, setSavedTrackIds] = useState(getSavedTrackIds());

  // set up useEffect hook to save `savedTrackIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveTrackIds(savedTrackIds);
  });

  // create method to search for savedTrackIds and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {

      const data = await searchSpotify(searchInput, token);

      // if (!response.ok) {
      //   throw new Error('something went wrong!');
      // }

      const trackData = data.tracks.items.map((track) => ({
        trackId: track.id,
        artists: track.artists[0].name || ['No artist to display'],
        title: track.name,
        description: track.href,
        image: track.album.images[0].url || '',
      }));
      console.log(trackData);

      setSearchedTracks(trackData);
      //setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a song to our database
  const handleSaveTrack = async (trackId) => {
    // find the song in `searchedTracks` state by the matching id
    const trackToSave = searchedTracks.find((track) => track.trackId === trackId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await saveTrack({ variables: { trackData: trackToSave } });

      // if (!response.ok) {
      //   throw new Error('something went wrong!');
      // }

      // if song successfully saves to user's account, save song id to state
      setSavedTrackIds([...savedTrackIds, trackToSave.trackId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (

    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Search for Music</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a track'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchedTracks.length
            ? `Displaying ${searchedTracks.length} results:`
            : ''}
        </h2>
        <CardColumns>
          {searchedTracks.map((track) => {
            return (
              <Card key={track.trackId} border='dark'>
                {track.image ? (
                  <Card.Img src={track.image} alt={`The cover for ${track.title}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{track.title}</Card.Title>
                  <p className='small'>artists: {track.artists}</p>
                  <Card.Text>{track.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedTrackIds?.some((savedTrackId) => savedTrackId === track.trackId)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveTrack(track.trackId)}>
                      {savedTrackIds?.some((savedTrackId) => savedTrackId === track.trackId)
                        ? 'This track has already been saved!'
                        : 'Save this track!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SearchTracks;