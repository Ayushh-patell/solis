import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import FloatingIsland from '../components/navigations/FloatingIsland';
import { navigationItems } from '../constants/Navigations';
import useAlbums from '../hooks/UseAlbums';

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

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.album}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.count}>{item.count} items</Text>
    </TouchableOpacity>
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