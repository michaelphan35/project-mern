import React, { useState } from 'react';
import { SpotifyApiContext } from 'react-spotify-api'
import Cookies from 'js-cookie'
import { SpotifyAuth, Scopes } from 'react-spotify-auth'
import 'react-spotify-auth/dist/index.css'
import { Modal } from 'react-bootstrap';

import SearchTracks from '../components/SearchTracks';

const Spotify = () => {

    const [token, setToken] = useState(Cookies.get("spotifyAuthToken"));
    const [showModal, setShowModal] = useState(true);
    return (
        <div className='app'>
            {token ? (
                <SpotifyApiContext.Provider value={token}>
                    <SearchTracks />
                </SpotifyApiContext.Provider>
            ) : (
                <Modal
                    className='spotify-modal'
                    size='sm'
                    show={showModal}
                    onHide={() => setShowModal(true)}
                    aria-labelledby='spotify-login-modal'>
                    {/* tab container to do either signup or login component */}

                    <Modal.Body>
                        <SpotifyAuth
                            redirectUri='https://aqueous-bayou-14461.herokuapp.com/'
                            clientID='d70a2585decd4d669c6434824b695fb4'
                            scopes={[Scopes.userReadPrivate, 'user-read-email']} // either style will work
                            onAccessToken={(token) => setToken(token)}
                        />
                    </Modal.Body>
                </Modal>

            )}
        </div>
    );
}

export default Spotify; 