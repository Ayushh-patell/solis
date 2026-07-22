import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Video from 'react-native-video';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function ViewerScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const { media } = route.params;

  const isVideo =
    media.type?.startsWith('video') ||
    media.mimeType?.startsWith('video');

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <TouchableOpacity
        style={styles.container}
        activeOpacity={1}
        // onPress={() => navigation.goBack()}
      >
        {isVideo ? (
          <Video
            source={{ uri: media.uri }}
            style={styles.media}
            controls
            resizeMode="contain"
            paused={false}
          />
        ) : (
          <FastImage
            source={{ uri: media.uri }}
            style={styles.media}
            resizeMode={FastImage.resizeMode.contain}
          />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  media: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});