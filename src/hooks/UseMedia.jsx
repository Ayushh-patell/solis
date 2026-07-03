import { useCallback, useEffect, useMemo, useState } from 'react';

import MediaService from '../services/media/MediaServices';

import groupMediaByDate from '../utils/media/GroupMediabyDate';
import createGridRows from '../utils/media/CreateGridRow';
import flattenGridSections from '../utils/media/FlattenGridSections';

export default function useMedia(options = {}) {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const loadMedia = useCallback(async () => {
    try {
      setError(null);

      const result = await MediaService.getMedia(options);

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
    const sections = groupMediaByDate(media);
    const sections_with_rows = createGridRows(sections, options.columns ?? 3);

    return flattenGridSections(sections_with_rows);
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