import { useCallback, useEffect, useMemo, useState } from 'react';

import MediaService from '../services/media/MediaServices';

import groupMediaByDate from '../utils/media/GroupMediabyDate';
import createGridRows from '../utils/media/CreateGridRow';
import flattenGridSections from '../utils/media/FlattenGridSections';
const DEFAULT_OPTIONS = Object.freeze({});

export default function useMedia(options = DEFAULT_OPTIONS) {
  const PAGE_SIZE = options.limit ?? 300;

  const [offset, setOffset] = useState(options.offset ?? 0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const loadMedia = useCallback(async () => {
    try {
      setError(null);
      const nativeStart = Date.now();
      setLoading(true);

      const result = await MediaService.getMedia({
        ...options,
        offset: 0,
      });
      console.log(`Native: ${Date.now() - nativeStart}ms`);

      setMedia(result);
      setOffset(result.length);
      setHasMore(result.length === PAGE_SIZE);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [options]);

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);

    try {
      const result = await MediaService.getMedia({
        ...options,
        offset,
      });

      setMedia(prev => [...prev, ...result]);

      setOffset(prev => prev + result.length);

      if (result.length < PAGE_SIZE) {
        setHasMore(false);
      }
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, hasMore, offset, options]);

  const refresh = async () => {
    setRefreshing(true);

    const result = await MediaService.getMedia({
        ...options,
        offset: 0,
    });

    setMedia(result);
    setOffset(result.length);
    setHasMore(result.length === PAGE_SIZE);

    setRefreshing(false);
};

  useEffect(() => {
    loadMedia();
  }, [loadMedia]);

  const items = useMemo(() => {
    let start = Date.now();
    const sections = groupMediaByDate(media);
    console.log(`Grouping: ${Date.now() - start}ms`);

    start = Date.now();
    const sectionsWithRows = createGridRows(sections, options.columns ?? 3);
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
    refreshing,
    loadingMore,
    loadMore,
    refresh,
  };
}
