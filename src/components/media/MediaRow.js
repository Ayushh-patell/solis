import { View, Image, StyleSheet } from 'react-native';

export default function MediaRow({ items }) {
  return (
    <View style={styles.row}>
      {items.map(item => (
        <Image
          key={item.id}
          source={{ uri: item.thumbnailUri }}
          style={styles.image}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },

  image: {
    flex: 1,
    aspectRatio: 1,
  },
});