import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function PermissionScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Permission</Text>
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
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
