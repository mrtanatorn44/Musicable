import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';

export default function MainScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* User Playlist */}
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
    backgroundColor: 'black',
  },
  content: {
    flex: 10,
    width: '100%',
    height: '100%',
  },
});