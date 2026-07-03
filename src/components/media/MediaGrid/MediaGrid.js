import React, { useCallback } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';

import SectionHeader from '../SectionHeader';
import MediaRow from '../MediaRow';

export default function MediaGrid({
  items = [],

  columns = 3,

  loading = false,
  refreshing = false,

  selectionActive = false,
  selectedIds = new Set(),

  onPress,
  onLongPress,

  onRefresh,
  onEndReached,

  ListHeaderComponent,
  ListFooterComponent,
  ListEmptyComponent,
}) {



  const renderItem = useCallback(
    ({ item }) => {
      switch (item.type) {
        case 'header':
          return <SectionHeader section={item.section} />;

        case 'row':
          return (
            <MediaRow
              items={item.items}
              columns={columns}
              section={item.section}
              selectedIds={selectedIds}
              selectionActive={selectionActive}
              onPress={onPress}
              onLongPress={onLongPress}
            />
          );

        default:
          return null;
      }
    },
    [
      columns,
      onLongPress,
      onPress,
      selectedIds,
      selectionActive,
    ]
  );

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <FlashList
      data={items}
      renderItem={renderItem}
      estimatedItemSize={140}
      keyExtractor={item => item.id}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
      ListEmptyComponent={ListEmptyComponent}
    />
  );
}