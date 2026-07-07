import { useCallback, useEffect, useMemo, useState } from 'react';

import MediaService from '../services/media/MediaServices';

import groupMediaByDate from '../utils/media/GroupMediabyDate';
import createGridRows from '../utils/media/CreateGridRow';
import flattenGridSections from '../utils/media/FlattenGridSections';
const DEFAULT_OPTIONS = Object.freeze({});

export default function useMedia(options = DEFAULT_OPTIONS) {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const loadMedia = useCallback(async () => {
    try {
      setError(null);
const nativeStart = Date.now();
      console.log(options)
      const result = await MediaService.getMedia(options);
    console.log(`Native: ${Date.now() - nativeStart}ms`);

      setMedia(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [options]);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    await loadMedia();
  }, [loadMedia]);

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
    error,
    refresh,
  };
}