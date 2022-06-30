import React, { useState } from 'react';
import { SpotifyApiContext } from 'react-spotify-api'
import Cookies from 'js-cookie'
import { SpotifyAuth, Scopes } from 'react-spotify-auth'
import 'react-spotify-auth/dist/index.css'

import SearchTracks from '../components/SearchTracks';

const Spotify = () => {

    const [token, setToken] = useState(Cookies.get("spotifyAuthToken"))
    return (
        <div className='app'>
            {token ? (
                <SpotifyApiContext.Provider value={token}>
                    <SearchTracks spotiToken={token} />
                </SpotifyApiContext.Provider>
            ) : (
                <SpotifyAuth
                    redirectUri='http://localhost:3000/'
                    clientID='d70a2585decd4d669c6434824b695fb4'
                    scopes={[Scopes.userReadPrivate, 'user-read-email']} // either style will work
                    onAccessToken={(token) => setToken(token)}
                />
            )}
        </div>
    );
}

export default Spotify; 