import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import Auth from '../utils/auth';

// import Apollo hook and mutation
import { useMutation } from '@apollo/client';
import { SAVE_ALBUM } from '../utils/mutations';
import { saveAlbumIds, getSavedAlbumIds } from '../utils/localStorage';

const SearchAlbums = () => {
  // create state for holding returned google api data
  const [searchedAlbums, setSearchedAlbums] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold favorite albumId values
  const [savedAlbumIds, setSavedAlbumIds] = useState(getSavedAlbumIds())
  // set up useEffect hook to save `favoriteAlbumIds` list to localStorage on component unmount
  const [saveAlbum] = useMutation(SAVE_ALBUM);

  // useEffect(() => {
  //   return () => saveAlbumIds(savedAlbumIds);
  // }, []);

  // use the FAVORITE_ALBUM mutation
  // const [favoriteAlbum] = useMutation(FAVORITE_ALBUM);

  // create method to search for albums and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await fetch(
        `https://spotify23.p.rapidapi.com/search/?q=${searchInput}`
        // `https://www.googleapis.com/books/v1/volumes?q=${searchInput}`
      );

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { items } = await response.json();

      const albumData = items.map((album) => ({
        albumId: album.id,
        artists: album.volumeInfo.authors || ['No artist to display'],
        title: album.volumeInfo.title,
        description: album.volumeInfo.description,
        image: album.volumeInfo.imageLinks?.thumbnail || '',
      }));

      setSearchedAlbums(albumData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a album to our database
  const handleSaveAlbum = async (albumId) => {
    // find the album in `searchedAlbums` state by the matching id
    const albumToSave = searchedAlbums.find((album) => album.albumId === albumId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await saveAlbum({
        variables: {
          albumData: albumToSave
        }
      });

      // if album successfully saves to user's account, save album id to state
      setSavedAlbumIds([...savedAlbumIds, albumToSave.albumId]);
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <>
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          Search for Albums!
        </Typography>
        <form onSubmit={handleFormSubmit}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                name="searchInput"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                label="Search for an album"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Button fullWidth type="submit" variant="contained" color="success">
                Submit Search
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>

      <Container>
        <Typography variant="h5" align="center" gutterBottom>
          {searchedAlbums.length
            ? `Viewing ${searchedAlbums.length} results:`
            : 'Search for an album to begin'}
        </Typography>
        <Grid container spacing={3}>
          {searchedAlbums.map((album) => (
            <Grid item xs={12} sm={6} md={4} key={album.albumId}>
              <Card sx={{ display: 'flex' }}>
                {album.image && (
                  <CardMedia
                    component="img"
                    alt={`The cover for ${album.title}`}
                    height="140"
                    image={album.image}
                  />
                )}
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6">{album.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Artists: {album.artists}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {album.description}
                  </Typography>
                  {Auth.loggedIn() && (
                    <Button
                      fullWidth
                      variant="contained"
                      color="info"
                      disabled={savedAlbumIds?.includes(album.albumId)}
                      onClick={() => handleSaveAlbum(album.albumId)}
                    >
                      {savedAlbumIds?.includes(album.albumId)
                        ? 'This album has already been chosen!'
                        : 'Favorite this Album!'}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default SearchAlbums;
