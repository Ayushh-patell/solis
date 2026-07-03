// SectionHeader.js
import { StyleSheet, Text } from 'react-native';

export default function SectionHeader({ section }) {
  return <Text style={styles.text}>{section.title}</Text>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 10,
    fontWeight: 'bold',
  },
});