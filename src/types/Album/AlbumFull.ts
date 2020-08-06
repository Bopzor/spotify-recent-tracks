import { ArtistPartial } from '../Artist/ArtistPartial';
import { TrackPartial } from '../Track/TrackPartial';
import { Image } from '../Image';

export type AlbumFull = {
  album_type: 'alubm' | 'single' | 'compilation';
  artists: ArtistPartial[];
  available_markets: string[];
  copyrights: object[];
  external_ids: object;
  external_urls: object;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  label: string;
  name: string;
  popularity: number;
  release_date: string;
  release_date_precision: string;
  restrictions: object;
  tracks: TrackPartial[];
  type: 'album';
  uri: string;
};
