import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import useMedia from '../hooks/UseMedia';
import MediaGrid from '../components/media/MediaGrid/'
import { colors, fontSize, fontFamily } from '../theme';
import { useMemo } from 'react';



export default function HomeScreen() {
  const mediaOptions = useMemo(
    () => ({
      limit: 300,
      offset: 0,
    }),
    []
  );
  
  const {
  items,
  loading,
  refreshing,
  refresh,
  error,
} = useMedia(mediaOptions);
const totalRows = items.reduce((total, item) => {
  if (item.type === "header") {
    return total + item.section.rows.length;
  }

  return total;
}, 0);

const totalMedia = items.reduce((total, item) => {
  if (item.type === "header") {
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
      <Text style={styles.text}>Home
      </Text>
          <MediaGrid
      items={items}
      loading={loading}
      refreshing={refreshing}
      onRefresh={refresh}
    />
    </View>
  );
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  borderWidth: 5, borderColor: colors.primary
},
  text: {
    fontSize: fontSize.xl ,
    fontFamily: fontFamily.regular,
    fontWeight: 'bold',
  },
});
