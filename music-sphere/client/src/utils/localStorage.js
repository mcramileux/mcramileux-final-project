export const getFavoriteAlbumIds = () => {
    const favoriteAlbumIds = localStorage.getItem('favorite_albums')
      ? JSON.parse(localStorage.getItem('favorite_albums'))
      : [];
  
    return favoriteAlbumIds;
  };
  
  export const FavoriteAlbumIds = (albumIdArr) => {
    if (albumIdArr.length) {
      localStorage.setItem('favorite_albums', JSON.stringify(albumIdArr));
    } else {
      localStorage.removeItem('favorite_albums');
    }
  };
  
  export const removeAlbumId = (albumId) => {
    const favoriteAlbumIds = localStorage.getItem('favorite_albums')
      ? JSON.parse(localStorage.getItem('favorite_albums'))
      : null;
  
    if (!favoriteAlbumIds) {
      return false;
    }
  
    const updatedFavoriteAlbumIds = FavoriteAlbumIds?.filter((FavoriteAlbumId) => FavoriteAlbumIds !== albumId);
    localStorage.setItem('favorite_albums', JSON.stringify(updatedFavoriteAlbumIds));
  
    return true;
  };
  