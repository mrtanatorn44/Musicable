import { NavigationContainer, useNavigationContainerRef  } from '@react-navigation/native';
import React, { useState } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import HomeScreen from '../screens/HomeScreen'
import DiscoverScreen from '../screens/DiscoverScreen'
import LibraryScreen from '../screens/LibraryScreen'
import SettingScreen from '../screens/SettingScreen'

const Stack = createNativeStackNavigator();

export const Navigator = () => {
  const [showModal, setShowModal] = useState(false)
  const navigationRef = useNavigationContainerRef();

  return (
    <NavigationContainer ref={navigationRef}>
      <Modal
        transparent={true}
        visible={showModal}
      > 
        <View style={{position: 'absolute', width: '80%', height: '80%', start: '10%', top: '10%'}}>
          <TouchableOpacity style={{width: '100%', height: '10%', backgroundColor: 'white', marginBottom: 1}}
            onPress={() => navigationRef.navigate('HomeScreen')}>
            <Text style={{fontSize: 32, alignSelf: 'center'}}>HomeScreen</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{width: '100%', height: '10%', backgroundColor: 'white', marginBottom: 1}}
            onPress={() => navigationRef.navigate('DiscoverScreen')}>
            <Text style={{fontSize: 32, alignSelf: 'center'}}>DiscoverScreen</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{width: '100%', height: '10%', backgroundColor: 'white', marginBottom: 1}}
            onPress={() => navigationRef.navigate('LibraryScreen')}>
            <Text style={{fontSize: 32, alignSelf: 'center'}}>LibraryScreen</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{width: '100%', height: '10%', backgroundColor: 'white', marginBottom: 1}}
            onPress={() => navigationRef.navigate('SettingScreen')}>
            <Text style={{fontSize: 32, alignSelf: 'center'}}>SettingScreen</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{width: '100%', height: '10%', backgroundColor: 'red'}} onPress={() => setShowModal(false)}>
            <Text style={{fontSize: 50, alignSelf: 'center'}}>close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <TouchableOpacity 
        style={{position: 'absolute', justifyContent: 'center', zIndex: 1,backgroundColor: 'red', width: 50, height: 50, top: '80%', end: 0, borderRadius: 100}}
        onPress={() => setShowModal(true)}>
        <Text style={{textAlign: 'center', color: 'white'}}>admin</Text>
      </TouchableOpacity>
      
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          presentation: 'modal',
          animationTypeForReplace: 'push',
          animation:'none'
        }}
      >
        <Stack.Screen 
          name="HomeScreen" 
          component={HomeScreen}
        />
        <Stack.Screen 
          name="DiscoverScreen" 
          component={DiscoverScreen} 
        />
        <Stack.Screen 
          name="LibraryScreen" 
          component={LibraryScreen}
        />

        <Stack.Screen 
          name="SettingScreen" 
          component={SettingScreen}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};