import { NavigationContainer, useNavigationContainerRef  } from '@react-navigation/native';
import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {firebase} from "../firestore/Connect"

import SplashScreen   from "../screens/SplashScreen";
import LoginScreen    from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

import HomeScreen     from '../screens/HomeScreen'
import DiscoverScreen from '../screens/DiscoverScreen'
import LibraryScreen  from '../screens/LibraryScreen'
import SettingScreen  from '../screens/SettingScreen'

import PlaylistScreen from '../screens/PlaylistScreen'
import MusicScreen    from '../screens/MusicScreen'

const Stack = createNativeStackNavigator();

export const Navigator = () => {
  const [showModal, setShowModal] = useState(false)
  const navigationRef = useNavigationContainerRef();

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{ headerShown: false, presentation: 'modal', animationTypeForReplace: 'push', animation:'none' }}>
          <Stack.Screen name="SplashScreen"   component={SplashScreen} />
          <Stack.Screen name="LoginScreen"    component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false, presentation: 'modal', animationTypeForReplace: 'push', animation:'none' }}>
        <Stack.Screen name="HomeScreen"     component={HomeScreen} />
        <Stack.Screen name="DiscoverScreen" component={DiscoverScreen} />
        <Stack.Screen name="LibraryScreen"  component={LibraryScreen} />
        <Stack.Screen name="SettingScreen"  component={SettingScreen} />

        <Stack.Screen name="MusicScreen"    component={MusicScreen} detachInactiveScreens={true}/>
        <Stack.Screen name="PlaylistScreen" component={PlaylistScreen} />
      </Stack.Navigator>

    </NavigationContainer>
  );

};