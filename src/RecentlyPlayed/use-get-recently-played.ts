import { useCallback, useEffect, useState } from 'react';

import { AxiosPromise } from 'axios';
import useAxios from 'axios-hooks';

import { Track } from '../types/Track/Track';
import { formatDate } from '../utils/formatDate';

export type RecentlyPlayedQueries = {
  before?: number;
  after?: number;
  limit?: number;
};

type ParsedTracks = {
  [key: string]: Track[];
};

export const useGetRecentlyPlayed = (timeDirection: 'before' | 'after', refreshToken: () => AxiosPromise<any>) => {
  const [date, setDate] = useState(formatDate(new Date(Date.now())));
  const [tracks, setTracks] = useState<ParsedTracks | null>(null);
  const [{ data, loading, error }, get] = useAxios(
    {
      url: `${process.env.SPOTIFY_BASE_URL}/me/player/recently-played`,
    },
    { manual: true },
  );

  const parseRecentlyPlayed = useCallback((data: any) => {
    if (!data) {
      return {};
    }

    const parsed: ParsedTracks = { ...tracks };

    for (const played of data) {
      const date = formatDate(new Date(played.played_at));

      if (!parsed[date]) {
        parsed[date] = [];
      }

      parsed[date].push({
        id: played.track.id,
        uri: played.track.uri,
        name: played.track.name,
        isPlayable: played.track.is_playable,
        artist: played.track.album.artists[0].name,
        image: played.track.album.images[played.track.album.images.length - 1].url,
      });
    }

    return parsed;
  }, []);

  const getRecentlyPlayedTracks = () => {
    const params: RecentlyPlayedQueries = { limit: 50 };

    if (timeDirection === 'after') {
      params.after = new Date(date).getTime();
    } else {
      params.before = new Date(date).getTime();
    }

    get({ params });
  };

  useEffect(() => {
    setTracks(null);
  }, [timeDirection]);

  useEffect(() => {
    if (error) {
      if (error?.response.status === 401) {
        refreshToken().then(getRecentlyPlayedTracks);
      }
    }

    if (data && !loading) {
      if (data.items) {
        setTracks(parseRecentlyPlayed(data.items));
      }
    }
  }, [data, loading, parseRecentlyPlayed]);

  return {
    loading,
    tracks,
    date,
    setDate,
    getRecentlyPlayedTracks,
  };
};
