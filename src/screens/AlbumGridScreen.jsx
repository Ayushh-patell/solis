import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import FloatingIsland from '../components/navigations/FloatingIsland';
import { navigationItems } from '../constants/Navigations';
import useAlbums from '../hooks/UseAlbums';
import FastImage from 'react-native-fast-image';


export default function AlbumGridScreen() {
  const navigation = useNavigation();

  const {
    albums,
    loading,
    refreshing,
    refresh,
    error,
  } = useAlbums();

  console.log(error, "album grid")

  const handleAlbumNavigation = (album) => {
    navigation.navigate('AlbumView', {
      album: album,
    });
  }
  const renderItem = ({ item }) => (
    <Pressable style={styles.album} onPress={() =>handleAlbumNavigation(item)}
      android_ripple={{
        color: 'rgba(255,255,255,0.08)',
        borderless: true,
        radius: 300,
      }}>
      <Text style={styles.title}>{item.name}</Text>
      <FastImage
        key={item.id}
        source={{ uri: item.coverUri }}
        style={styles.image}
      />
      <Text style={styles.count}>{item.count} items</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={albums}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          refreshing={refreshing}
          onRefresh={refresh}
        />
      )}

      <FloatingIsland
        items={navigationItems}
        activeKey="Albums"
        onPress={item => navigation.navigate(item.key)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  image: {
    flex: 1,
    aspectRatio: 1,
  },

  list: {
    padding: 16,
    paddingBottom: 120,
  },

  album: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: '#f4f4f4',
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
  },

  count: {
    marginTop: 4,
    color: '#666',
  },
});