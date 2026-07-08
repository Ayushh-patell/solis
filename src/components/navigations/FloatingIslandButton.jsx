import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors, fontSize, fontFamily } from '../../theme';

export default function FloatingIslandButton({
  icon,
  label,
  active = false,
  onPress,
}) {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{
        color: 'rgba(255,255,255,0.08)',
        borderless: true,
        radius: 28,
      }}
      style={({ pressed }) => [
        styles.button,
        active && styles.activeButton,
        pressed && styles.pressed,
      ]}
    >
      <Icon
        name={icon}
        size={22}
        color={active ? colors.primary : 'rgba(255,255,255,0.65)'}
      />

      {active && (
        <Text
          numberOfLines={1}
          style={styles.label}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 44,
    paddingHorizontal: 12,
    marginHorizontal: 4,

    borderRadius: 999,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  activeButton: {
    backgroundColor: 'rgba(238,162,67,0.15)',
  },

  pressed: {
    opacity: 0.8,
  },

  label: {
    marginLeft: 8,

    color: colors.primary,

    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
  },
});