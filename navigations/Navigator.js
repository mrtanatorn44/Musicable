import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View } from "react-native";

import MainScreen from '../screens/MainScreen'
import DiscoverScreen from '../screens/DiscoverScreen'
import LibraryScreen from '../screens/LibraryScreen'

const Stack = createNativeStackNavigator();

export const Navigator = () => {
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen 
          name="MainScreen" 
          component={MainScreen} 
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