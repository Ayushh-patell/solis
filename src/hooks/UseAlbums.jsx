import { useCallback, useEffect, useState } from "react";
import MediaService from "../services/media/MediaServices";

export default function useAlbums() {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);

    const loadAlbums = useCallback(async () => {
        try {
            setError(null);
            setLoading(true);

            const result = await MediaService.getAlbums();
            setAlbums(result);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    const refresh = useCallback(async () => {
        setRefreshing(true);
        await loadAlbums();
    }, [loadAlbums]);

    useEffect(() => {
        loadAlbums();
    }, [loadAlbums]);

    return {
        albums,
        loading,
        refreshing,
        error,
        refresh,
    };
}