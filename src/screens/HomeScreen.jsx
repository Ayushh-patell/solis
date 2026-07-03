import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import useMedia from '../hooks/UseMedia';
import MediaGrid from '../components/media/MediaGrid/'
import { colors, fontSize, fontFamily } from '../theme';



export default function HomeScreen() {

  const {
  items,
  loading,
  refreshing,
  refresh,
} = useMedia();

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
