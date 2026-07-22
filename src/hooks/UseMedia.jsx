import { useCallback, useEffect, useMemo, useState } from 'react';

import MediaService from '../services/media/MediaServices';
import {useMediaStore} from '../store/mediaStore'
import groupMediaByDate from '../utils/media/GroupMediabyDate';
import createGridRows from '../utils/media/CreateGridRow';
import flattenGridSections from '../utils/media/FlattenGridSections';

const DEFAULT_OPTIONS = Object.freeze({});

export default function useMedia(options = DEFAULT_OPTIONS) {
  const PAGE_SIZE = options.limit ?? 300;

  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const {
    createCollection,
    getCollection,
    replaceMedia,
    appendMedia,
  } = useMediaStore();

  const collectionId = useMemo(
    () => createCollection(options),
    [createCollection, options],
  );

  const collection = useMediaStore(state =>
    state.mediaCollections.get(collectionId),
  );

  const media = collection?.media ?? [];
  const offset = collection?.offset ?? 0;
  const hasMore = collection?.hasMore ?? true;

  const loadMedia = useCallback(async () => {
    try {
      setError(null);
      console.log("loading true")
      setLoading(true);

      const nativeStart = Date.now();

      const result = await MediaService.getMedia({
        ...options,
        offset: 0,
      });

      console.log(`Native: ${Date.now() - nativeStart}ms`);

      replaceMedia(
        collectionId,
        result,
        result.length === PAGE_SIZE,
      );
    } catch (err) {
      setError(err);
    } finally {
      console.log("loading false")
      setLoading(false);
      setRefreshing(false);
    }
  }, [
    options,
    collectionId,
    replaceMedia,
    PAGE_SIZE,
  ]);

  const loadMore = useCallback(async () => {
    if (loadingMore || hasMore === false) {
      return;
    }

    setLoadingMore(true);

    try {
      const result = await MediaService.getMedia({
        ...options,
        offset,
      });

      appendMedia(
        collectionId,
        result,
        result.length === PAGE_SIZE,
      );
    } catch (err) {
      setError(err);
    } finally {
      setLoadingMore(false);
    }
  }, [
    loadingMore,
    hasMore,
    offset,
    options,
    collectionId,
    appendMedia,
    PAGE_SIZE,
  ]);

  const refresh = useCallback(async () => {
    try {
      setRefreshing(true);
      setError(null);

      const result = await MediaService.getMedia({
        ...options,
        offset: 0,
      });

      replaceMedia(
        collectionId,
        result,
        result.length === PAGE_SIZE,
      );
    } catch (err) {
      setError(err);
    } finally {
      setRefreshing(false);
    }
  }, [
    options,
    collectionId,
    replaceMedia,
    PAGE_SIZE,
  ]);

  useEffect(() => {
    if (!collection || collection.media.length === 0) {
      loadMedia();
    }
  }, [collectionId]);

  const items = useMemo(() => {
    let start = Date.now();

    const sections = groupMediaByDate(media);
    console.log(`Grouping: ${Date.now() - start}ms`);

    start = Date.now();
    const sectionsWithRows = createGridRows(
      sections,
      options.columns ?? 3,
    );
    console.log(`Rows: ${Date.now() - start}ms`);

    start = Date.now();
    const flattened = flattenGridSections(sectionsWithRows);
    console.log(`Flatten: ${Date.now() - start}ms`);

    return flattened;
  }, [media, options.columns]);

  return {
    media,
    items,
    loading,
    loadingMore,
    refreshing,
    error,

    loadMore,
    refresh,

    collectionId,
  };
}