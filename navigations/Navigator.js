import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View } from "react-native";

import HomeScreen from '../screens/HomeScreen'
import DiscoverScreen from '../screens/DiscoverScreen'
import LibraryScreen from '../screens/LibraryScreen'

const Stack = createNativeStackNavigator();

export const Navigator = () => {
  
  return (
    <NavigationContainer>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};