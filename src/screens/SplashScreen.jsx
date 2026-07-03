import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { PERMISSION_STATUS } from '../services/permissions';
import { usePermission } from '../hooks/UsePermission';

export default function SplashScreen() {
  const navigation = useNavigation();

  const { checkMediaPermission } = usePermission();

  useEffect(() => {
    const initialize = async () => {
      const status = await checkMediaPermission();
      // const status = "blocked";

      if (status === PERMISSION_STATUS.GRANTED) {
        navigation.replace('Home');
      } else {
        navigation.replace('Permission');
      }
    };

    initialize();
  }, [checkMediaPermission, navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});