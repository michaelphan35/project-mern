export const searchSpotify = (artist_name, token) => {
  console.log(artist_name);
  return fetch(
    `https://api.spotify.com/v1/search`, {
    method: "GET",
    query: artist_name,
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
  );
};