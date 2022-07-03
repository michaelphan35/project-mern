export const searchSpotify = async (query, accessToken) => {
  try {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&market=US&limit=10`, {
      method: 'GET', headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};