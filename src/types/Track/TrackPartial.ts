import { ArtistPartial } from '../Artist/ArtistPartial';

export type TrackPartial = {
  artists: ArtistPartial[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: object;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: object;
  restrictions: object;
  name: string;
  preview_url: string;
  track_number: number;
  type: 'track';
  uri: string;
  is_local: boolean;
};
