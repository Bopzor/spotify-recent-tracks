import { ArtistPartial } from '../Artist/ArtistPartial';
import { Image } from '../Image';

export type AlbumPartial = {
  album_group?: string;
  album_type: 'alubm' | 'single' | 'compilation';
  artists: ArtistPartial[];
  available_markets: string[];
  external_urls: object;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: object;
  type: 'album';
  uri: string;
};
