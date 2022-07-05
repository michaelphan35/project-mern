/*export const searchSpotify = async (query, accessToken) => {
  try {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&market=US`, {
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
};*/

export const searchSpotify = async (query) => {
  const response = await fetch(`https://spotify23.p.rapidapi.com/search/?q=${query}&type=tracks&offset=0&limit=10&numberOfTopResults=5`, {
	  method: 'GET',
	  headers: {
		  'X-RapidAPI-Key': '4f0d91789amshc2b344d8971cadbp19fd34jsn5ebdc8770c89',
		  'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
	  }
  });
  const data = await response.json();
  console.log(data);
  return data;
}
