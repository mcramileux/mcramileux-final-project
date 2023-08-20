import React from 'react';
import { makeStyles } from '@mui/styles';
import { Grid, Link, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.info.contrastText,
    padding: theme.spacing(3),
    textAlign: 'center',
  },
  socialIcons: {
    marginTop: theme.spacing(2),
    '& a': {
      color: theme.palette.info.contrastText,
      margin: theme.spacing(1),
    },
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <div className={classes.socialIcons}>
            <Link href='https://github.com/mcramileux/' target='_blank' rel='noopener noreferrer'>
              <FontAwesomeIcon icon={faGithub} size="lg" />
            </Link>
            <Link href='https://www.linkedin.com/in/mcramileux/' target='_blank' rel='noopener noreferrer'>
              <FontAwesomeIcon icon={faLinkedin} size="lg" />
            </Link>
            <Link href='https://twitter.com/mcramileux' target='_blank' rel='noopener noreferrer'>
              <FontAwesomeIcon icon={faTwitter} size="lg" />
            </Link>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2">
            &copy; 2023 mcramileux - MusicSphere. All rights reserved.
          </Typography>
        </Grid>
      </Grid>
    </footer>
  );
}
