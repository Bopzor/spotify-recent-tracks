import { ArtistPartial } from '../Artist/ArtistPartial';
import { Image } from '../Image';

export type Album = {
  album_type: 'alubm' | 'single' | 'compilation';
  artists: ArtistPartial[];
  available_markets: string[];
  external_urls: object;
  href: string;
  id: string;
  images: Image[];
  name: string;
  type: 'album;'
  uri: string;
};
