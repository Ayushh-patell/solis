// Mock media data

import NativeMediaStore from "../../native/NativeMediaStore";

const mockMedia = [
  {
    id: '1',
    uri: 'https://picsum.photos/id/1015/800/1200',
    thumbnailUri: 'https://picsum.photos/id/1015/400/600',
    type: 'image',
    album: 'Camera',
    albumId: 'camera',
    name: 'IMG_20260628_103000.jpg',
    mimeType: 'image/jpeg',
    dateTaken: '2026-06-28T10:30:00',
    dateModified: '2026-06-28T10:31:12',
    width: 800,
    height: 1200,
    size: 2456789,
    duration: null,
    favorite: false,
  },
  {
    id: '2',
    uri: 'https://picsum.photos/id/1025/1200/800',
    thumbnailUri: 'https://picsum.photos/id/1025/600/400',
    type: 'image',
    album: 'Camera',
    albumId: 'camera',
    name: 'IMG_20260627_151000.jpg',
    mimeType: 'image/jpeg',
    dateTaken: '2026-06-27T15:10:00',
    dateModified: '2026-06-27T15:11:20',
    width: 1200,
    height: 800,
    size: 3214567,
    duration: null,
    favorite: true,
  },
  {
    id: '3',
    uri: 'https://picsum.photos/id/1035/900/900',
    thumbnailUri: 'https://picsum.photos/id/1035/450/450',
    type: 'image',
    album: 'Downloads',
    albumId: 'downloads',
    name: 'Wallpaper.jpg',
    mimeType: 'image/jpeg',
    dateTaken: '2026-06-26T09:00:00',
    dateModified: '2026-06-26T09:01:15',
    width: 900,
    height: 900,
    size: 1987654,
    duration: null,
    favorite: false,
  },
  {
    id: '4',
    uri: 'https://picsum.photos/id/1045/1920/1080',
    thumbnailUri: 'https://picsum.photos/id/1045/640/360',
    type: 'image',
    album: 'WhatsApp Images',
    albumId: 'whatsapp-images',
    name: 'IMG-20260624-WA0001.jpg',
    mimeType: 'image/jpeg',
    dateTaken: '2026-06-24T20:15:00',
    dateModified: '2026-06-24T20:16:02',
    width: 1920,
    height: 1080,
    size: 4123456,
    duration: null,
    favorite: false,
  },
  {
    id: '5',
    uri: 'https://picsum.photos/id/1055/1080/1920',
    thumbnailUri: 'https://picsum.photos/id/1055/360/640',
    type: 'video',
    album: 'Camera',
    albumId: 'camera',
    name: 'VID_20260622_184500.mp4',
    mimeType: 'video/mp4',
    dateTaken: '2026-06-22T18:45:00',
    dateModified: '2026-06-22T18:46:10',
    width: 1080,
    height: 1920,
    size: 15423678,
    duration: 42,
    favorite: false,
  },
];



const MediaService = {
  async getMedia(options = {}) {
    return NativeMediaStore.getMedia(options);
  },

  async getAlbums() {
    return NativeMediaStore.getAlbums();
  },

  async getMediaByAlbum(album) {
    return NativeMediaStore.getMedia({ album });
  },

  async deleteMedia(ids) {
    return NativeMediaStore.deleteMedia(ids);
  },

  async moveMedia(ids, destinationAlbum) {
    return NativeMediaStore.moveMedia(ids, destinationAlbum);
  },

  async copyMedia(ids, destinationAlbum) {
    return NativeMediaStore.copyMedia(ids, destinationAlbum);
  },
};

export default MediaService;