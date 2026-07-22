import { create } from 'zustand';

// set((state) => ({ mediaCollections: state.bears + 1 }))
export const useMediaStore = create((set, get) => ({
  mediaCollections: new Map(),

  createCollection: source => {
    const collectionId = createCollectionId(source);
    set(state => {
      if (state.mediaCollections.has(collectionId)) {
        return state;
      }
      const next = new Map(state.mediaCollections);
      next.set(collectionId, {
        id: collectionId,
        source,
        media: [],
        offset: 0,
        hasMore: null,
        loading: false,
        error: null,
        lastAccessed: Date.now(),
      });

      return { mediaCollections: next };
    });
    return collectionId;
  },

  replaceMedia: (id, media, hasMore) => {
    set(state => {
      if (!state.mediaCollections.has(id)) {
        return state;
      }

      const next = new Map(state.mediaCollections);
      next.set(id, {
        ...next.get(id),
        media,
        hasMore,
        offset: media.length,
        lastAccessed: Date.now(),
      });

      return {
        mediaCollections: next,
      };
    });
  },

  appendMedia: (id, moreMedia, hasMore) => {
    set(state => {
      if (!state.mediaCollections.has(id)) {
        return state;
      }

      const next = new Map(state.mediaCollections);
      const currentCollection = next.get(id);
      next.set(id, {
        ...currentCollection,
        media: [...currentCollection.media, ...moreMedia],
        hasMore,
        offset: currentCollection.media.length + moreMedia.length,
        lastAccessed: Date.now(),
      });

      return {
        mediaCollections: next,
      };
    });
  },

  getCollectionMedia: id => get().mediaCollections.get(id)?.media ?? [],

  updateCollection: (id, updates) => {
    set(state => {
      if (!state.mediaCollections.has(id)) {
        return state;
      }

      const next = new Map(state.mediaCollections);
      const currentCollection = next.get(id);
      next.set(id, {
        ...currentCollection,
        ...updates,
        lastAccessed: Date.now(),
      });

      return {
        mediaCollections: next,
      };
    });
  },

  removeCollection: id => {
    set(state => {
      if (!state.mediaCollections.has(id)) {
        return state;
      }

      const next = new Map(state.mediaCollections);
      next.delete(id);

      return {
        mediaCollections: next,
      };
    });
  },

  clearCollections: () => {
    set({
      mediaCollections: new Map(),
    });
  },

  touchCollection: id => {
    set(state => {
      if (!state.mediaCollections.has(id)) {
        return state;
      }

      const next = new Map(state.mediaCollections);
      const currentCollection = next.get(id);
      next.set(id, {
        ...currentCollection,
        lastAccessed: Date.now(),
      });

      return {
        mediaCollections: next,
      };
    });
  },

  hasCollection: id => get().mediaCollections.has(id),

  getCollection: id => {
    const { mediaCollections } = get();
    return mediaCollections.get(id);
  },
}));

const createCollectionId = source =>
  [
    source.album ?? 'all',
    source.type ?? 'all',
    source.sortBy ?? 'dateTaken',
    source.order ?? 'desc',
    source.query?.trim() ?? '',
  ].join(':');
