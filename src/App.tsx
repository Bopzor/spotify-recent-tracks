import React from 'react';

import { CssBaseline, Dialog, DialogContent, DialogTitle, Link, ThemeProvider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useConfigureAxios } from './hooks/use-configure-axios';
import { SPOTIFY_AUTH_URL } from './hooks/use-spotify-connection';
import { useSpotifyConnection } from './hooks/use-spotify-connection';
import Loader from './Loader';
import RecentlyPlayedPage from './RecentlyPlayed/RecentlyPlayedPage';
import { darkTheme } from './theme';

const useStyles = makeStyles(({ breakpoints }) => ({
  container: {
    [breakpoints.up('sm')]: {
      maxWidth: 600,
      margin: 'auto',
    },
  },
}));

const App: React.FC = () => {
  const { accessToken, refresh, open, close, loading } = useSpotifyConnection();
  useConfigureAxios(accessToken);

  const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        <CssBaseline />
        <Dialog onClose={close} open={open}>
          <DialogTitle>Connect to Spotify</DialogTitle>
          <DialogContent>
            Click <Link href={SPOTIFY_AUTH_URL}>here</Link> to connect.
          </DialogContent>
        </Dialog>

        <RecentlyPlayedPage refreshToken={refresh} />

        <Loader loading={loading} />
      </div>
    </ThemeProvider>
  );
};

export default App;
