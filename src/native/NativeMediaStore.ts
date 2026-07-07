import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export type Media = {
  id: string;
  uri: string;
  thumbnailUri: string;

  type: 'image' | 'video';

  album: string;
  albumId: string;

  name: string;
  mimeType: string;

  /** Unix timestamp (milliseconds) */
  dateTaken: number;

  /** Unix timestamp (seconds from MediaStore, see note below) */
  dateModified: number;

  width: number;
  height: number;
  size: number;

  /** Duration in milliseconds (videos only) */
  duration?: number;

  favorite: boolean;
};

export type Album = {
  id: string;
  name: string;
  count: number;
  cover?: string;
};

export type AffectedResponse = {
  success: boolean;
  affected: number;
};

export type GetMediaOptions = {
  album?: string | null;
  type?: 'all' | 'image' | 'video';
  sortBy?:
    | 'dateTaken'
    | 'dateModified'
    | 'name'
    | 'size'
    | 'width'
    | 'height';
  order?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
};

export interface Spec extends TurboModule {
  getMedia(options: GetMediaOptions): Promise<Media[]>;

  getAlbums(): Promise<Album[]>;

  getMediaByAlbum(album: string): Promise<Media[]>;

  deleteMedia(ids: string[]): Promise<AffectedResponse>;

  moveMedia(
    ids: string[],
    destinationAlbum: string,
  ): Promise<AffectedResponse>;

  copyMedia(
    ids: string[],
    destinationAlbum: string,
  ): Promise<AffectedResponse>;
}

export default TurboModuleRegistry.get<Spec>('NativeMediaStore');