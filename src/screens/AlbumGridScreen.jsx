import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FloatingIsland from '../components/navigations/FloatingIsland';
import { navigationItems } from '../constants/Navigations';

export default function AlbumGridScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Album Grid</Text>

      
          <FloatingIsland
            items={navigationItems}
            activeKey="Alboms"
            onPress={(item) => {
              navigation.navigate(item.key)
            }}
          />
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
