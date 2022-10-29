import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';

export default function DiscoverScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* CONTENT */}
      <View style={styles.content}>
        <Text>Content</Text>
      </View>
    </SafeAreaView>
  );
}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
  },
  content: {
    flex: 10,
    width: '100%',
    height: '100%',
    backgroundColor: 'lightgray',
  },
});