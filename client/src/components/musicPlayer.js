import React, { useState } from 'react';
import Cookies from 'js-cookie'
import SpotifyPlayer from 'react-spotify-web-playback';

// this feature will function for spotify premium users only
const MusicPlayer = () => {
    const token = useState(Cookies.get("spotifyAuthToken"));
    return <SpotifyPlayer
        token={token}
        uris={['spotify:artist:6HQYnRM4OzToCYPpVBInuU']}
    />;
};

export default MusicPlayer