export const getSavedTrackIds = () => {
  const savedTrackIds = localStorage.getItem('saved_tracks')
    ? JSON.parse(localStorage.getItem('saved_tracks'))
    : [];

  return savedTrackIds;
};

export const saveTrackIds = (trackIdArr) => {
  if (trackIdArr.length) {
    localStorage.setItem('saved_tracks', JSON.stringify(trackIdArr));
  } else {
    localStorage.removeItem('saved_tracks');
  }
};

export const removeTrackId = (songId) => {
  const savedTrackIds = localStorage.getItem('saved_tracks')
    ? JSON.parse(localStorage.getItem('saved_tracks'))
    : null;

  if (!savedTrackIds) {
    return false;
  }

  const updatedTrackIds = savedTrackIds?.filter((savedTrackId) => savedTrackId !== songId);
  localStorage.setItem('saved_tracks', JSON.stringify(updatedTrackIds));

  return true;
};