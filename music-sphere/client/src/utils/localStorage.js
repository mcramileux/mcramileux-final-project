//MIGHT DELETE
// export const getFaveAlbumIds = () => {
//     const faveAlbumIds = localStorage.getItem('fave_albums')
//       ? JSON.parse(localStorage.getItem('fave_albums'))
//       : [];
  
//     return faveAlbumIds;
//   };
  
//   export const FavoriteAlbumIds = (albumIdArr) => {
//     if (albumIdArr.length) {
//       localStorage.setItem('fave_albums', JSON.stringify(albumIdArr));
//     } else {
//       localStorage.removeItem('fave_albums');
//     }
//   };
  
//   export const removeAlbumId = (albumId) => {
//     const faveAlbumIds = localStorage.getItem('fave_albums')
//       ? JSON.parse(localStorage.getItem('fave_albums'))
//       : null;
  
//     if (!faveAlbumIds) {
//       return false;
//     }
  
//     const updatedFaveAlbumIds = FaveAlbumIds?.filter((FaveAlbumId) => FaveAlbumIds !== albumId);
//     localStorage.setItem('fave_albums', JSON.stringify(updatedFaveAlbumIds));
  
//     return true;
//   };
  