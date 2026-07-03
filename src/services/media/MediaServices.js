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

console.log(NativeMediaStore);

const delay = (ms = 400) => new Promise(resolve => setTimeout(resolve, ms));

const MediaService = {
  async getMedia({
    album = null,
    type = 'all',
    sortBy = 'dateTaken',
    order = 'desc',
    limit = 100,
    offset = 0,
  } = {}) {
    await delay();
    const mediaMock = await NativeMediaStore.getMedia({});


    let media = [...mediaMock];

    // Filter by album
    if (album) {
      media = media.filter(item => item.album === album);
    }

    // Filter by media type
    if (type !== 'all') {
      media = media.filter(item => item.type === type);
    }

    // Sort
    media.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;

        case 'size':
          comparison = a.size - b.size;
          break;

        case 'width':
          comparison = a.width - b.width;
          break;

        case 'height':
          comparison = a.height - b.height;
          break;

        case 'dateModified':
          comparison =
            new Date(a.dateModified).getTime() -
            new Date(b.dateModified).getTime();
          break;

        case 'dateTaken':
        default:
          comparison =
            new Date(a.dateTaken).getTime() -
            new Date(b.dateTaken).getTime();
          break;
      }

      return order === 'asc' ? comparison : -comparison;
    });

    // Pagination
    return media.slice(offset, offset + limit);
  },

  async getAlbums() {
    await delay();

    const albums = [...new Set(mockMedia.map(item => item.album))];

    return albums.map(name => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      count: mockMedia.filter(item => item.album === name).length,
      cover: mockMedia.find(item => item.album === name)?.thumbnailUri,
    }));
  },

  async getMediaByAlbum(album) {
    return this.getMedia({ album });
  },

  async deleteMedia(ids) {
    await delay();

    console.log('Mock delete:', ids);

    return {
      success: true,
      affected: ids.length,
    };
  },

  async moveMedia(ids, destinationAlbum) {
    await delay();

    console.log('Mock move:', ids, destinationAlbum);

    return {
      success: true,
      affected: ids.length,
    };
  },

  async copyMedia(ids, destinationAlbum) {
    await delay();

    console.log('Mock copy:', ids, destinationAlbum);

    return {
      success: true,
      affected: ids.length,
    };
  },
};

export default MediaService;