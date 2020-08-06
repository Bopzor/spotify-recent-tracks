import { useCallback, useEffect, useState } from "react";

import useAxios from "axios-hooks";

import { Track } from "../types/Track/Track";
import { formatDate } from "../utils/formatDate";

export type RecentlyPlayedQueries = {
  before?: number;
  after?: number;
  limit?: number;
};

type ParsedTracks = {
  [key: string]: Track[];
};

export const useGetRecentlyPlayed = (timeDirection: "before" | "after") => {
  const [tracks, setTracks] = useState<ParsedTracks | null>(null);
  const [{ data, loading, error }, get] = useAxios(
    {
      url: `${process.env.SPOTIFY_BASE_URL}/me/player/recently-played`,
    },
    { manual: true }
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
        image:
          played.track.album.images[played.track.album.images.length - 1].url,
      });
    }

    return parsed;
  }, []);

  useEffect(() => {
    setTracks(null);
  }, [timeDirection]);

  useEffect(() => {
    if (error) {
      console.log(error.response.status);
      return;
    }

    if (data && !loading) {
      if (data.items) {
        setTracks(parseRecentlyPlayed(data.items));
      }
    }
  }, [data, loading, error, parseRecentlyPlayed]);

  return {
    loading,
    tracks,
    getRecentlyPlayedTracks: (params: RecentlyPlayedQueries) => get({ params }),
  };
};
