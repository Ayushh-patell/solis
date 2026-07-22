import { View, StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';

export default function MediaRow({ items }) {
  const navigation = useNavigation();

  return (
    <View style={styles.row}>
      {items.map(item => (
        <TouchableOpacity
          key={item.id}
          style={styles.item}
          onPress={() => navigation.navigate('Viewer', { media: item })}
        >
          <FastImage
            source={{ uri: item.thumbnailUri }}
            style={styles.image}
            resizeMode={FastImage.resizeMode.cover}
            onError={e => console.log(item.thumbnailUri, e.nativeEvent)}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  item: {
    flex: 1,
    aspectRatio: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});