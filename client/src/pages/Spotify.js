import React, { useState } from 'react';
import { SpotifyApiContext } from 'react-spotify-api'
import Cookies from 'js-cookie'
import { SpotifyAuth, Scopes } from 'react-spotify-auth'
import 'react-spotify-auth/dist/index.css'

import SearchTracks from './SearchTracks';

const Spotify = () => {

    const [token, setToken] = useState(Cookies.get("spotifyAuthToken"))
    return (
        <div className='app'>
            {token ? (
                <SpotifyApiContext.Provider value={token}>
                    {/* Your Spotify Code here */}
                    <p>You are authorized with token: {token}</p>
                    <SearchTracks spotiToken={token} />
                </SpotifyApiContext.Provider>
            ) : (
                // Display the login page
                <SpotifyAuth
                    redirectUri='http://localhost:3000/'
                    clientID='f384da78955e4419a9a3df59c19acab0'
                    scopes={[Scopes.userReadPrivate, 'user-read-email']} // either style will work
                    onAccessToken={(token) => setToken(token)}
                />
            )}
        </div>
    );
}

export default Spotify; 