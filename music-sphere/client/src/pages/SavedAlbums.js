import React from 'react';
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
} from '@mui/material';
import Auth from '../utils/auth';

import { GET_ME } from '../utils/queries';
import { REMOVE_ALBUM } from '../utils/mutations';

import { removeAlbumId } from '../utils/localStorage';
import { useQuery, useMutation } from '@apollo/client';

const SavedAlbums = () => {
  const { loading, data } = useQuery(GET_ME);
  let userData = data?.me || {};
  console.log(userData);
  const [removeAlbum] = useMutation(REMOVE_ALBUM);

  // function that accepts the album's mongo _id value as param and deletes the album from the database
  const handleDeleteAlbum = async (albumId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { user } = await removeAlbum({
        variables: {
          albumId: albumId,
        },
      });

      userData = user;
      removeAlbumId(albumId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <Typography variant="h2">LOADING...</Typography>;
  }

  return (
    <>
      <Container>
        <Typography variant="h2" align="center">
          Your Favorite Albums!
        </Typography>
      </Container>
      <Container>
        <Typography variant="h3" align="center" gutterBottom>
          {userData.savedAlbums?.length
            ? `Viewing ${userData.savedAlbums.length} saved ${
                userData.savedAlbums.length === 1 ? 'album' : 'albums'
              }:`
            : 'You have no saved albums!'}
        </Typography>
        <Grid container spacing={3}>
          {userData.savedAlbums?.map((album) => (
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
                    Authors: {album.authors}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {album.description}
                  </Typography>
                  <Button
                    fullWidth
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteAlbum(album.albumId)}
                  >
                    Delete this Album!
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default SavedAlbums;
