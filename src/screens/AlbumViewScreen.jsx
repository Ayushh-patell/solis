import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MediaGrid from '../components/media/MediaGrid';
import useMedia from '../hooks/UseMedia';
import { colors, fontFamily, fontSize } from '../theme';

export default function AlbumViewScreen({ route }) {
  const { album } = route.params;
  const mediaOptions = useMemo(
    () => ({
      album:album.id,
      limit: 300,
      offset: 0,
    }),
    [],
  );

  const { items, loading, refreshing, refresh, error, loadMore, loadingMore } = useMedia(mediaOptions);

  console.log(album, error, items.length, mediaOptions, loading, refreshing, loadingMore, "Album View ");

  return (
     <View style={styles.container}>
       <Text style={styles.text}>Album Viewer</Text>
            <MediaGrid
              items={items}
              loading={loading}
              refreshing={refreshing}
              onRefresh={refresh}
              onEndReached={loadMore}
              loadingMore={loadingMore}
            />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 5,
    borderColor: colors.primary,
  },
  text: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.regular,
    fontWeight: 'bold',
  },
});
