import { useEffect, useState } from 'react';

import { AxiosPromise } from 'axios';
import useAxios from 'axios-hooks';
import qs from 'qs';

export const SPOTIFY_AUTH_URL =
  'https://accounts.spotify.com/authorize' +
  '?response_type=code' +
  '&client_id=' +
  process.env.SPOTIFY_CLIENT_ID +
  '&redirect_uri=' +
  encodeURIComponent(process.env.REDIRECT_URI) +
  '&scope=' +
  encodeURIComponent('user-read-recently-played');

type useSpotifyConnectionType = () => {
  loading: boolean;
  accessToken: undefined | string;
  refresh: () => AxiosPromise<any>;
  open: boolean;
  close: () => void;
};

export const useSpotifyConnection: useSpotifyConnectionType = () => {
  const [code, setCode] = useState(null);
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('spotify-refresh-token'));
  const [accessToken, setAccessToken] = useState(localStorage.getItem('spotify-access-token'));
  const [expiresAt, setExpiresAt] = useState(localStorage.getItem('spotify-expires-at'));
  const [open, setOpen] = useState(!refreshToken);

  const [{ data, loading, error }, getToken] = useAxios(
    {
      url: 'https://accounts.spotify.com/api/token',
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET)}`,
      },
    },
    { manual: true },
  );

  const refresh = () => {
    const params = qs.stringify({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    });

    return getToken({ data: params });
  };

  useEffect(() => {
    if (window.location.search.includes('code')) {
      const params = new URLSearchParams(window.location.search);
      setCode(params.get('code'));
    }
  }, []);

  useEffect(() => {
    if (code && !accessToken) {
      const params = qs.stringify({
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.REDIRECT_URI,
      });

      getToken({ data: params });
    }
  }, [code, getToken]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (data && !loading) {
      if (data.refresh_token) {
        localStorage.setItem('spotify-refresh-token', data.refresh_token);
        setRefreshToken(data.refresh_token);
      }

      const expires = new Date(Date.now() + data.expires_in * 1000).getTime().toString();

      localStorage.setItem('spotify-access-token', data.access_token);
      localStorage.setItem('spotify-expires-at', expires);
      setAccessToken(data.access_token);
      setExpiresAt(expires);
      setOpen(false);
    }
  }, [data, loading]);

  useEffect(() => {
    if (!expiresAt) {
      return;
    }

    if (parseInt(expiresAt) < Date.now()) {
      // refresh();
    }
  }, [expiresAt]);

  return {
    loading,
    accessToken,
    refresh,
    open,
    close: () => setOpen(false),
  };
};
