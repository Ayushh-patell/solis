import React from 'react';
import { StyleSheet, View } from 'react-native';

import FloatingIslandButton from './FloatingIslandButton';
import { colors } from '../../theme';


export default function FloatingIsland({
  items = [],
  activeKey,
  onPress,
}) {
  
  return (
    <View pointerEvents="box-none" style={styles.wrapper}>
      <View style={styles.container}>
        {items.map(item => (
          <FloatingIslandButton
            key={item.key}
            icon={item.icon}
            label={item.label}
            active={activeKey === item.key}
            onPress={() => onPress?.(item)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',

    left: 0,
    right: 0,
    bottom: 24,

    alignItems: 'center',
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 8,
    paddingVertical: 8,

    borderRadius: 999,

    backgroundColor: colors.background,

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',

    elevation: 12,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
  },
});