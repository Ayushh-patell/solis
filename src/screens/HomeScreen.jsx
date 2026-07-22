import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import useMedia from '../hooks/UseMedia';
import MediaGrid from '../components/media/MediaGrid/';
import { colors, fontSize, fontFamily } from '../theme';
import { useMemo } from 'react';
import FloatingIsland from '../components/navigations/FloatingIsland'
import { navigationItems } from '../constants/Navigations';
import {useNavigation} from '@react-navigation/native'

export default function HomeScreen() {
  const navigation = useNavigation();
  const mediaOptions = useMemo(
    () => ({
      limit: 300,
      offset: 0,
    }),
    [],
  );

  const { items, loading, refreshing, refresh, error, loadMore, loadingMore } = useMedia(mediaOptions);
  const totalRows = items.reduce((total, item) => {
    if (item.type === 'header') {
      return total + item.section.rows.length;
    }

    return total;
  }, 0);

  const totalMedia = items.reduce((total, item) => {
    if (item.type === 'header') {
      return total + item.section.items.length;
    }

    return total;
  }, 0);

  console.log({
    flatItems: items.length,
    rows: totalRows,
    media: totalMedia,
    error,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>
      <MediaGrid
        items={items}
        loading={loading}
        refreshing={refreshing}
        onRefresh={refresh}
        onEndReached={loadMore}
        loadingMore={loadingMore}
      />

      

    <FloatingIsland
      items={navigationItems}
      activeKey="Home"
      onPress={(item) => {
        navigation.navigate(item.key)
      }}
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
