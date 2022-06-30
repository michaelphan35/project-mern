export const searchSpotify = (query, accessToken) => {
  fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&market=US&limit=10`, {
    method: 'GET', headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken
    }
  })
    .then((response) => {
      response.json().then(
        (data) => {
          console.log(data);
          return data;
        }
      );
    });

};