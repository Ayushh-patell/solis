import React from 'react';
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { usePermission } from '../hooks/UsePermission';
import { PERMISSION_STATUS } from '../services/permissions';

export default function PermissionScreen() {
  const navigation = useNavigation();

  const {
    status,
    loading,
    requestMediaPermission,
    openSettings,
  } = usePermission();

  const handleContinue = async () => {
    const permission = await requestMediaPermission();

    if (permission === PERMISSION_STATUS.GRANTED) {
      navigation.replace('Home');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Allow Media Access</Text>

      <Text style={styles.description}>
        SOLIS needs access to your photos and videos to display your gallery.
      </Text>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : status === PERMISSION_STATUS.BLOCKED ? (
        <Button
          title="Open Settings"
          onPress={openSettings}
        />
      ) : (
        <Button
          title="Continue"
          onPress={handleContinue}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
  },

  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 32,
    lineHeight: 24,
  },
});