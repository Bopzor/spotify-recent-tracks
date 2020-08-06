import { Image } from '../Image';

export type Artist = {
  external_urls: object;
  followers: object;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: 'artist';
  uri: string;
};
